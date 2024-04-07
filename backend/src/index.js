const express = require("express");
const cors = require("cors");
const env = require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

const DATABASE_CONNECTION = process.env.DATABASE_CONNECTION;
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));

mongoose.connect(DATABASE_CONNECTION)
    .then(() => console.log("DB connects"))
    .catch(() => console.error("something went wrong in conncecting to DB"));


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});