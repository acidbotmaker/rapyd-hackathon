import mongoose from 'mongoose';

const db_connect = async () =>{
    try{
        const connect = await mongoose.connect(process.env.DB_URL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(
          `MongoDB connected with ${connect.connection.host}`.yellow.bold
        );

    }catch(err){
        console.error(`Error: ${error.message}`.red.bold.underline);
        process.exit(1)
    }
}

export default db_connect;  