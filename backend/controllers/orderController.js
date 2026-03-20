import supabase from "../config/supabase.js"

// global variables
const currency = 'inr'
const deliveryCharge = 10

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

export {placeOrder, allOrders, updateStatus, userOrders}