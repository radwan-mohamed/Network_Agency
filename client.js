const express = require("express");
const path = require("path");
const axios = require("axios");

// Function to dynamically import the 'open' module
async function openUrl(url) {
  const { default: open } = await import("open");
  open(url);
}

// Set up the Express app
const app = express();
const port = 3000; // You can use any port that is free

// Serve the main.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "main.html"));
});

app.get("/add.html", (req, res) => {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/delete.html", (req, res) => {
  res.sendFile(path.join(__dirname, "delete.html"));
});

// Serve the script.js file
app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "script.js"));
});

// Serve the script.css file
app.get("/script.css", (req, res) => {
  res.sendFile(path.join(__dirname, "script.css"));
});

// Serve the video file
app.get("/Video/:file", (req, res) => {
  res.sendFile(path.join(__dirname, "Video", req.params.file));
});

// Start the server and open the browser
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  openUrl(`http://localhost:${port}`);
});

// Function to add an entry
async function addEntry(name, age) {
  try {
    const response = await axios.post("http://localhost:5000/add", {
      name,
      age,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Function to delete an entry
async function deleteEntry(id) {
  try {
    const response = await axios.delete("http://localhost:5001/delete", {
      data: { id },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Example usage (can be commented out if not needed for initial load)
// addEntry('boda', 17);
// addEntry('John Doe', 30).then(() => deleteEntry(1)); // Replace with the actual ID you want to delete

module.exports = { addEntry, deleteEntry };
