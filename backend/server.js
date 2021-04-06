import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/data-base.js';
import colors from 'colors';
import {urlNotFound, errorHandler} from './middlewares/errorMiddlewares.js';

// import Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// invoking express func
const app = express();
app.use(express.json())

//configure from dotenv module
dotenv.config();

//invoking database connection func
connectDB();

app.get('/', (req,res) => {
    res.send('API is running...')
})

//mounting common path 
app.use('/api/products', productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
//custom Middleware for error handling

app.use(urlNotFound);
app.use(errorHandler);



//port decision
const PORT = process.env.PORT || 5000;

//server connecting...
app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on  PORT ${process.env.PORT}...`.magenta.bold)
);