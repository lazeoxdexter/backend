const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/track", (req, res) => {
  const { userId, fingerprint, path: pagePath, timeSpent, timestamp } = req.body;

  if (!userId || !fingerprint || !pagePath || !timeSpent) {
    return res.status(400).json({ message: "Missing tracking data" });
  }

  // Log data to Render logs instead of a file
  console.log(`[TRACKING] ${timestamp} | User: ${userId}, Fingerprint: ${fingerprint}, Page: ${pagePath}, Time Spent: ${timeSpent}s`);

  res.json({ message: "Tracked successfully" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
