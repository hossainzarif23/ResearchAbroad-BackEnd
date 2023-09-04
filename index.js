import express from "express";
import cors from "cors";

import appRoutes from "./Routes/AppRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/Images", express.static('Images'));
app.use("/", appRoutes);

app.listen(8000, ()=>{
    console.log("Connected to BackEnd!");
});