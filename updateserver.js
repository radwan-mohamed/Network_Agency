const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

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

app.get("/show", (req, res) => {
  const query = "SELECT * FROM network";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ status: "error", message: err.message });
      return;
    }
    res.json({
      status: "success",
      data: results,
    });
  });
});

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Show Server running on port ${PORT}`);
});
