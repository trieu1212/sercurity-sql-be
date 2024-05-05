const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const AuthRoute = require('./routes/AuthRoute')
const UserRoute = require('./routes/UserRoute')
const ProductRoute = require('./routes/ProductRoute')
const CartRoute = require('./routes/CartRoute')
const CommentRoute = require('./routes/CommentRoute')
const CategoryRoute = require('./routes/CategoryRoute')
const OrderRoute = require('./routes/OrderRoute')
const connection = require('./orm/configs/connectDB')

//config server
const app = express()
const PORT = process.env.PORT || 7000
dotenv.config()
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({  
    origin: true, 
    credentials: true 
  }));
app.use(morgan("common"))
app.use(cookieParser());
app.use(helmet())

connection()
app.listen(PORT, (req,res)=>{
    console.log(`server đang chạy trên port: ${PORT}`)
})
 
//routes
app.use('/api/auth',AuthRoute)  
app.use('/api/user',UserRoute)
app.use('/api/product',ProductRoute)
app.use('/api/cart',CartRoute)
app.use('/api/comment',CommentRoute)
app.use('/api/category',CategoryRoute)
app.use('/api/order',OrderRoute)