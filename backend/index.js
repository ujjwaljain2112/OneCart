// import express from 'express'
// import dotenv from 'dotenv'
// import connectDb from './config/db.js'
// import cookieParser from 'cookie-parser'
// import authRoutes from './routes/authRoutes.js'
// dotenv.config()
// import cors from "cors"
// import userRoutes from './routes/userRoutes.js'
// import productRoutes from './routes/productRoutes.js'
// import cartRoutes from './routes/cartRoutes.js'
// import orderRoutes from './routes/orderRoutes.js'

// let port = process.env.PORT || 6000

// let app = express()

// app.use(express.json())
// app.use(cookieParser())
// app.use(cors({
//  origin:["https://onecart-frontend-33ex.onrender.com" , "https://onecart-admin-zohb.onrender.com"],
//  credentials:true
// }))

// app.use("/api/auth",authRoutes)
// app.use("/api/user",userRoutes)
// app.use("/api/product",productRoutes)
// app.use("/api/cart",cartRoutes)
// app.use("/api/order",orderRoutes)




// app.listen(port,()=>{
//     console.log("Hello From Server")
//     connectDb()
// })

import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import cors from "cors"
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()
let port = process.env.PORT || 6000

let app = express()

// ✅ CORS must be before other middlewares
app.use(cors({
  origin: [
    "https://onecart-frontend-33ex.onrender.com",
    "https://onecart-admin-zohb.onrender.com"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // allow all needed
  allowedHeaders: ["Content-Type", "Authorization"]     // allow headers
}))

// ✅ Handle preflight requests explicitly
app.options("*", cors({
  origin: [
    "https://onecart-frontend-33ex.onrender.com",
    "https://onecart-admin-zohb.onrender.com"
  ],
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`)
  connectDb()
})



