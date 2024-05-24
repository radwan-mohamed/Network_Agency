const axios = require("axios");

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

// Example usage
addEntry("John Doe", 30);
