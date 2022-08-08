import {} from "dotenv/config";
import express from "express";
import cors from "cors";
import usersRouter from "./users/users.router.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: "utf-8" }));

app.use("/users", usersRouter);

app.listen(port, () => console.log(`Servidor levantado en el puerto ${port}`));
