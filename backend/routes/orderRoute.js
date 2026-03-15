import express from 'express'
import { placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, allOrders, userOrders, verifyStripe, verifyRazorpay } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment features
// Auth middleware removed/made optional for placing orders
orderRouter.post('/place', placeOrder)
orderRouter.post('/stripe', placeOrderStripe)
orderRouter.post('/razorpay', placeOrderRazorpay)

// Verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)

// User features
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter;