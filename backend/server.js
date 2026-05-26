const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

const candidateRoutes = require("./routes/candidateRoutes");
app.use("/api/candidates",candidateRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

const aiRoutes = require("./routes/aiRoutes");
app.use("/api/ai",aiRoutes);

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

app.get("/api/protected", protect, (req, res) => {

    res.json({
        message: "Protected route accessed",
        user: req.user
    });

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});