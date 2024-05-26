const express = require("express");
const path = require("path");
const axios = require("axios");
const { WebSocketServer } = require("ws");

// Function to dynamically import the 'open' module
async function openUrl(url) {
  const { default: open } = await import("open");
  open(url);
}

// Set up the Express app
const app = express();
const port = 3005; // Change this port number to any free port

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

app.get("/update.html", (req, res) => {
  res.sendFile(path.join(__dirname, "update.html"));
});

app.get("/chat.html", (req, res) => {
  res.sendFile(path.join(__dirname, "chat.html"));
});

app.get("/cpuRamUsage.html", (req, res) => {
  res.sendFile(path.join(__dirname, "cpuRamUsage.html"));
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

// Endpoint for CPU and RAM usage
app.get("/cpu-ram-usage", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:12348/cpu-ram-usage");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching CPU and RAM usage:", error);
    res.status(500).json({ error: "Error fetching CPU and RAM usage" });
  }
});

// Endpoint for shutdown
app.get("/shutdown", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:12348/shutdown");
    res.send(response.data);
  } catch (error) {
    console.error("Error initiating shutdown:", error);
    res.status(500).send("Error initiating shutdown");
  }
});

// Start the server and open the browser
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  openUrl(`http://localhost:${port}`);
});

// Function to add an entry
async function addEntryy(name, age) {
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
async function deleteEntryy(id) {
  try {
    const response = await axios.delete("http://localhost:5001/delete", {
      data: { id },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Set up WebSocket server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
    // Broadcast message to all clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === client.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("Client has disconnected");
  });

  ws.on("error", (error) => {
    console.error(`WebSocket error: ${error}`);
  });

  ws.send("Welcome to the chat!");
});

module.exports = { addEntryy, deleteEntryy };
