import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const ReviewSection = ({ productId }) => {
    const { backendUrl, token } = useContext(ShopContext);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchReviews = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/review/list', { productId });
            if (response.data.success) {
                setReviews(response.data.reviews);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const submitReview = async (e) => {
        e.preventDefault();
        if (!token) {
            toast.error("Please login to submit a review");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(backendUrl + '/api/review/add', {
                productId,
                rating,
                comment
            }, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message);
                setComment('');
                setRating(5);
                fetchReviews();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (productId) {
            fetchReviews();
        }
    }, [productId]);

    return (
        <div className="mt-20">
            <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
                <p className='text-3xl font-medium mb-4'>Customer Reviews</p>
                
                {/* Review Form */}
                <form onSubmit={submitReview} className="flex flex-col gap-4 mb-8 border-b pb-8">
                    <p className='font-medium text-lg'>Write a Review</p>
                    <div className="flex gap-2 items-center">
                        <p>Rating:</p>
                        <select 
                            value={rating} 
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="border px-2 py-1 rounded"
                        >
                            <option value="5">5 - Excellent</option>
                            <option value="4">4 - Good</option>
                            <option value="3">3 - Average</option>
                            <option value="2">2 - Poor</option>
                            <option value="1">1 - Terrible</option>
                        </select>
                    </div>
                    <textarea 
                        className="w-full border px-3 py-2 rounded" 
                        rows="4" 
                        placeholder="Share your thoughts about this product..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    ></textarea>
                    <button 
                        type="submit" 
                        className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 w-fit"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>

                {/* Reviews List */}
                <div className="flex flex-col gap-4">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="border-b pb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-semibold text-black">{review.userName}</p>
                                    <p className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</p>
                                </div>
                                <div className="flex gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <img 
                                            key={i} 
                                            src={i < review.rating ? assets.star_icon : assets.star_dull_icon} 
                                            alt="" 
                                            className="w-3.5" 
                                        />
                                    ))}
                                </div>
                                <p>{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet. Be the first to review!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewSection;