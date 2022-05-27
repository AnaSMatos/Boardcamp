import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoriesRouter from "./routes/categoriesRoute.js";

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

app.use(categoriesRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});

