import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import {connectDB} from "./lib/db.js"
const app = express();
dotenv.config()
const PORT = process.env.PORT;

app.use(express.json())
app.use("/api/auth" , authRoutes)
//TO fetch the destructured arguments their value use this middlewaew(form usermodal to authcontroller)
app.listen(PORT , () => {
    console.log("Server is running on PORT : " + PORT);
    connectDB();
});