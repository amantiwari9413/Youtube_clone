import dotenv from "dotenv"
import dbConnection from "./db/index.js"
import express from  'express'
const app = express()

dotenv.config({
    path:'./env'
}) // ye maine isliye kiya kyuki  .env file ko load krne ke liye hai

dbConnection()
.then(() => {
    console.log("Database connected successfully");
    app.on('error', (err) => {
        console.log(err)
        throw err
    })
    
    app.listen(process.env.PORT || 3001, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}).catch((err) =>{
    console.error(err);
});
