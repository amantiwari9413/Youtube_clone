import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const dbConnection = async ()=>{
    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("db wala file hai " , error)
        process.exit(1);
    }
}

export default  dbConnection; 