import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000 || process.env.PORT;
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
	res.send("Hello World!");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
