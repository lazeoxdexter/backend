const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/track", (req, res) => {
  const { userId, fingerprint, path: pagePath, timeSpent, timestamp } = req.body;

  if (!userId || !fingerprint || !pagePath || !timeSpent) {
    return res.status(400).json({ message: "Missing tracking data" });
  }

  const logEntry = `${timestamp} - User: ${userId}, Fingerprint: ${fingerprint}, Page: ${pagePath}, Time Spent: ${timeSpent}s\n`;

  // **Ensure the directory exists**
  const logFilePath = path.resolve(__dirname, "tracking.log");

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error("Failed to log data:", err);
      return res.status(500).json({ message: "Error logging data" });
    }
    res.json({ message: "Tracked successfully" });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
