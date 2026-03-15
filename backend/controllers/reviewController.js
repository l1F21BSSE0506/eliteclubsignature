import supabase from "../config/supabase.js";

// Add a review
const addReview = async (req, res) => {
    try {
        const { userId, productId, rating, comment } = req.body;

        const { data: user, error: userError } = await supabase
            .from('users')
            .select('name')
            .eq('id', userId)
            .single();

        if (userError || !user) {
            return res.json({ success: false, message: "User not found" });
        }

        const reviewData = {
            userId,
            userName: user.name,
            productId,
            rating,
            comment,
            date: new Date().toISOString()
        }

        const { error: reviewError } = await supabase
            .from('reviews')
            .insert([reviewData]);

        if (reviewError) throw reviewError;

        res.json({ success: true, message: "Review Added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Get reviews for a product
const getReviews = async (req, res) => {
    try {
        const { productId } = req.body;
        const { data: reviews, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('productId', productId);

        if (error) throw error;
        res.json({ success: true, reviews });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addReview, getReviews };