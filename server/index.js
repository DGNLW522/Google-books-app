const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());

// Route to fetch books with pagination
app.get("/api/books", async (req, res) => {
  try {
    const query = req.query.q || "javascript"; // Default search query
    const startIndex = parseInt(req.query.startIndex) || 0;
    const maxResults = parseInt(req.query.maxResults) || 10;

    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books from API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
