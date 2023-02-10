import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gamesRouter from "./routers/games.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(gamesRouter);

app.get("/", (_, res) => {
	res.send("Hello World!");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
