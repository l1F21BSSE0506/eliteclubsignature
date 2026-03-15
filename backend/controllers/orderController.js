import supabase from "../config/supabase.js"
import Stripe from 'stripe'
import razorpay from 'razorpay'

// global variables
const currency = 'inr'
const deliveryCharge = 10

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET,
})

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address} = req.body
        const orderData = {
            userId: userId || "guest", // Use "guest" if no userId
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: new Date().toISOString()
        }
        
        const { data: newOrder, error: orderError } = await supabase
            .from('orders')
            .insert([orderData])
            .select()
            .single();

        if (orderError) throw orderError;

        // Only clear cart if it's a registered user
        if (userId && userId !== "guest") {
             const { error: cartError } = await supabase
                .from('users')
                .update({ cartData: {} })
                .eq('id', userId);
             if (cartError) throw cartError;
        }

        res.json({success: true, message: "Order Placed"})
    }
    catch (error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Placing orders using stripe method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const { origin } = req.headers;

        const orderData = {
            userId: userId || "guest", // Use "guest" if no userId
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: new Date().toISOString()
        }

        const { data: newOrder, error: orderError } = await supabase
            .from('orders')
            .insert([orderData])
            .select()
            .single();

        if (orderError) throw orderError;

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder.id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder.id}`,
            line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Verify Stripe
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body
    try {
        if (success === "true") {
            const { error: orderUpdateError } = await supabase
                .from('orders')
                .update({ payment: true })
                .eq('id', orderId);
            if (orderUpdateError) throw orderUpdateError;

            const { error: cartUpdateError } = await supabase
                .from('users')
                .update({ cartData: {} })
                .eq('id', userId);
            if (cartUpdateError) throw cartUpdateError;

            res.json({ success: true });
        } else {
            const { error: orderDeleteError } = await supabase
                .from('orders')
                .delete()
                .eq('id', orderId);
            if (orderDeleteError) throw orderDeleteError;

            res.json({ success: false });
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Placing orders using Razorpay method
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            date: new Date().toISOString()
        }

        const { data: newOrder, error: orderError } = await supabase
            .from('orders')
            .insert([orderData])
            .select()
            .single();

        if (orderError) throw orderError;

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder.id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error)
                return res.json({ success: false, message: error })
            }
            res.json({ success: true, order })
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            const { error: orderUpdateError } = await supabase
                .from('orders')
                .update({ payment: true })
                .eq('id', orderInfo.receipt);
            if (orderUpdateError) throw orderUpdateError;

            const { error: cartUpdateError } = await supabase
                .from('users')
                .update({ cartData: {} })
                .eq('id', userId);
            if (cartUpdateError) throw cartUpdateError;

            res.json({ success: true, message: "Payment Successful" })
        } else {
            res.json({ success: false, message: "Payment Failed" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// All orders data for admin panel
const allOrders = async (req, res) => {
    try{
        const { data: orders, error } = await supabase
            .from('orders')
            .select('*');
        if (error) throw error;
        res.json({success: true, orders})
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// User order data for frontend
const userOrders = async (req, res) => {
    try{
        const {userId} = req.body
        const { data: orders, error } = await supabase
            .from('orders')
            .select('*')
            .eq('userId', userId);
        if (error) throw error;
        res.json({success: true, orders})
    }
    catch (error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Update order status
const updateStatus = async (req, res) => {
    try{
        const {orderId, status} = req.body
        const { error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', orderId);
        if (error) throw error;
        res.json({success: true, message: "Order Status Updated"})
    }
    catch (error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export {placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, updateStatus, userOrders, verifyStripe, verifyRazorpay}