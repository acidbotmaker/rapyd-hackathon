import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const db_connect = async () => {
    try {
        console.log(process.env.DB_URL)
        const connect = await mongoose.connect(process.env.DB_URL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(
            `MongoDB connected with ${connect.connection.host}`.yellow.bold
        );

    } catch (err) {
        console.error(`Error: ${err.message}`.red.bold.underline);
        process.exit(1)
    }
}

export default db_connect;  