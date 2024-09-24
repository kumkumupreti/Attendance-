const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");

// Load the service account key JSON file
var serviceAccount = require("./serviceAccountKey.json");

// Initialize the Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Create an Express app
const app = express();
app.use(bodyParser.json());

// Sample route to get attendance data (replace with actual database logic)
app.get('/api/attendance', (req, res) => {
    // Fetch data from Firestore (replace this with actual database call)
    const attendanceData = [
        { id: 1, name: "John Doe", location: "Location A" },
        { id: 2, name: "Jane Smith", location: "Location B" }
    ];
    res.json(attendanceData);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
