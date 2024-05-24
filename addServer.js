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

app.post("/add", (req, res) => {
  const { name, age } = req.body;
  const query = "INSERT INTO network (name, age) VALUES (?, ?)";
  db.query(query, [name, age], (err, results) => {
    if (err) {
      res.status(500).json({ status: "error", message: err.message });
      return;
    }
    res.json({
      status: "success",
      message: "Entry added successfully",
      id: results.insertId,
    });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Add Server running on port ${PORT}`);
});
