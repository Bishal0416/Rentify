import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log(`MongoDB connect succesfully DB HOST: ${connInstance.connection.host}`);
    } catch(error){
        console.log("MONGODB connection failed", error);
        throw error;
    }
}

export default connectDB