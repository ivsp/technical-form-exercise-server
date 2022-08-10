import {} from "dotenv/config";
import express from "express";
import cors from "cors";
import usersRouter from "./users/users.router.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    "Access-Control-Allow-Origin": "http://localhost:3000/",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
); //Permite resolver el problema de cors
app.use(express.json());
app.use(express.urlencoded({ extended: "utf-8" }));

app.use("/users", usersRouter);

app.listen(port, () => console.log(`Servidor levantado en el puerto ${port}`));
