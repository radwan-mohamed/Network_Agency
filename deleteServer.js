const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7709039",
  password: "dMMCvdCsSH",
  database: "sql7709039",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database.");
});

app.delete("/delete", (req, res) => {
  const { id } = req.body;
  const query = "DELETE FROM network WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ status: "error", message: err.message });
      return;
    }
    res.json({ status: "success", message: "Entry deleted successfully" });
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Delete Server running on port ${PORT}`);
});
