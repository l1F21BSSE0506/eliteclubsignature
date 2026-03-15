import supabase from "../config/supabase.js";


// add products to user cart
const addToCart = async (req, res) => {
    try{
        const { userId, itemId, size } = req.body;
        const { data: userData, error: fetchError } = await supabase
            .from('users')
            .select('cartData')
            .eq('id', userId)
            .single();

        if (fetchError) throw fetchError;

        let cartData = userData.cartData || {};
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        const { error: updateError } = await supabase
            .from('users')
            .update({ cartData })
            .eq('id', userId);

        if (updateError) throw updateError;

        res.json({success: true, message: "Product added to cart successfully"});
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message});
    }
}


// update user cart
const updateCart = async (req, res) => {
    try{
        const { userId, itemId, size, quantity } = req.body
        const { data: userData, error: fetchError } = await supabase
            .from('users')
            .select('cartData')
            .eq('id', userId)
            .single();

        if (fetchError) throw fetchError;

        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        cartData[itemId][size] = quantity

        const { error: updateError } = await supabase
            .from('users')
            .update({ cartData })
            .eq('id', userId);

        if (updateError) throw updateError;

        res.json({success: true, message: "Cart updated successfully"});
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message});
    }
}

// get user cart
const getUserCart = async (req, res) => {
    try{
        const { userId } = req.body;
        const { data: userData, error } = await supabase
            .from('users')
            .select('cartData')
            .eq('id', userId)
            .single();

        if (error) throw error;
        let cartData = userData.cartData || {};
        res.json({success: true, cartData});
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { addToCart, updateCart, getUserCart }