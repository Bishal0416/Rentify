import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/connectDB.js';

dotenv.config()

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "24kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser());

app.get("/test", (req, res) => {
    res.send('namaste')
})

connectDB()
    .then(() => {
        app.listen(3000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
        })
    })
    .catch((error) => {
        console.log("MongoDB connection failed", error);
    })


// Route import
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js'
import propertyRouter from './routes/property.route.js'

//Route declaration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/property", propertyRouter);



//middlewares
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});