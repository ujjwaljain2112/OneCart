// import express from 'express'
// import isAuth from '../middleware/isAuth.js'
// import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, userOrders, verifyRazorpay } from '../controller/orderController.js'
// import adminAuth from '../middleware/adminAuth.js'

// const orderRoutes = express.Router()

// //for User
// orderRoutes.post("/placeorder",isAuth,placeOrder)
// orderRoutes.post("/razorpay",isAuth,placeOrderRazorpay)
// orderRoutes.post("/userorder",isAuth,userOrders)
// orderRoutes.post("/verifyrazorpay",isAuth,verifyRazorpay)
 
// //for Admin
// orderRoutes.post("/list",adminAuth,allOrders)
// orderRoutes.post("/status",adminAuth,updateStatus)

// export default orderRoutes

import express from 'express';
import isAuth from '../middleware/isAuth.js';
import adminAuth from '../middleware/adminAuth.js';
import { 
    allOrders, 
    placeOrder, 
    placeOrderStripe,  // updated for Stripe
    updateStatus, 
    userOrders, 
    verifyStripePayment // updated for Stripe
} from '../controller/orderController.js';

const orderRoutes = express.Router();

// For User
orderRoutes.post("/placeorder", isAuth, placeOrder); // COD
orderRoutes.post("/stripe", isAuth, placeOrderStripe); // Stripe payment
orderRoutes.post("/userorder", isAuth, userOrders);
orderRoutes.post("/verifystripe", isAuth, verifyStripePayment); // Stripe verification

// For Admin
orderRoutes.post("/list", adminAuth, allOrders);
orderRoutes.post("/status", adminAuth, updateStatus);

export default orderRoutes;
