import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './product-data/users.js';
import products from './product-data/products.js';
import User from './models/userModels.js';
import Product from './models/productModels.js';
import Order from './models/orderModels.js';
import connectDB from './config/data-base.js';


dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const allUsers = await User.insertMany(users)

        const adminUser = allUsers[0]._id;
        const sampleProducts = products.map(p => {
            return { ...p, user: adminUser }
        })

        await Product.insertMany(sampleProducts);

        console.log('Data Imported'.magenta.inverse.bold)
        process.exit();

    } catch (error) {
        console.error(`${error}`.red.inverse.bold);
        process.exit(1);
    }
}



const scrapData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Scrapped".red.inverse.bold);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse.bold);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    scrapData();
} else {
    importData();
}