import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebkooks from "./controllers/clerkWebhooks.js";

connectDB();
const app = express();
app.use(cors()); // Enables cross-orgin resource sharing


//Middleware
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("API WORKING FINE, GREAT!"));

//api to listen clerk webhook
app.get('/api/clerk', (req,res) => clerkWebkooks)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server runnnig on port ${PORT}`));
