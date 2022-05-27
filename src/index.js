import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoriesRouter from "./routes/categoriesRoute.js";
import gamesRouter from "./routes/gamesRoute.js";

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

app.use(categoriesRouter)
app.use(gamesRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});

