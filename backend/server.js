const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
require("dotenv").config();



app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("HireMind AI Backend Running");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});