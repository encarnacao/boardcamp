import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gamesRouter from "./routers/games.js";
import customerRouter from "./routers/customers.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(gamesRouter);
app.use(customerRouter);

app.get("/", (_, res) => {
	res.send("Hello World!");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
