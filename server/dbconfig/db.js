import mongoose from "mongoose";

export const dbConnection = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected!! host:${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Database connection failed ", error);
        process.exit(1);
    }
}