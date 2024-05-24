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

// Example usage

addEntry("boda", 17);

addEntry("John Doe", 30).then(() => deleteEntry(1)); // Replace with the actual ID you want to delete
