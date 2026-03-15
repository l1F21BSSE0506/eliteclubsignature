import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectCloudinary from './config/cloudinary.js'
import supabase from './config/supabase.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import reviewRouter from './routes/reviewRoute.js'

//App config
const app = express()
const port = process.env.PORT || 4000

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/review', reviewRouter);
app.get('/', (req, res) => {
    res.send("API working")
})

const startServer = async () => {
    try {
        await connectCloudinary();
        if (!supabase) {
            console.error("❌ Backend started but SUPABASE is NOT connected. API calls will fail.");
        }
        if (process.env.NODE_ENV !== 'production') {
            app.listen(port, () => console.log('🚀 Server started on port: ' + port));
        }
    } catch (error) {
        console.error("❌ Failed to start server:", error);
    }
}

startServer();

// Export the app for Vercel Serverless Functions
export default app;