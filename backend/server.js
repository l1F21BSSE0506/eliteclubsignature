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
app.use(cors({
    origin: [
        'https://eliteclubsignature.com', 
        'https://www.eliteclubsignature.com', 
        'https://admin.eliteclubsignature.com',
        'https://eliteclubsignature.vercel.app',
        'http://localhost:5173',
        'http://localhost:5174'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true
}))

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/review', reviewRouter);
app.get('/', (req, res) => {
    res.send("API working")
})

// Vercel Serverless entry point
connectCloudinary();

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => console.log('🚀 Server started on port: ' + port));
}

// Export the app for Vercel Serverless Functions
export default app;