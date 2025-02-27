const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // Required for serving static files

const app = express();
app.use(express.json());

// Configure CORS to allow requests from your front-end (e.g., localhost:3000)
app.use(cors({
    origin: "http://localhost:3000",  // Replace with your front-end URL if different
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, "frontend")));

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://pubghearbeat:E5YqOcM3IG4W3KqL@cluster0.gobyb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("MongoDB connection error:", err));

// Define schema and model
const EnrollmentSchema = new mongoose.Schema({
    studentName: String,
    dob: String,
    gender: String,
    address: String,
    city: String,
    state: String,
    country: String,
    fatherName: String,
    fatherQualification: String,
    fatherOccupation: String,
    motherName: String,
    motherQualification: String,
    motherOccupation: String,
    email: String,
    phone: String,
    previousSchool: String,
    lastClass: String,
    admissionClass: String,
    percentage: String,
    timestamp: String  // Define timestamp field
});

// Create the model using the schema
const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);

// API to handle form submission
app.post("/submit", async (req, res) => {
    try {
        // Create a new enrollment with the form data, including the timestamp
        const newEnrollment = new Enrollment(req.body);
        await newEnrollment.save();
        res.status(200).json({ message: "Enrollment successful!" });
    } catch (error) {
        res.status(500).json({ message: "Error processing enrollment." });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
