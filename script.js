document.addEventListener("DOMContentLoaded", () => {
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(
        "ipAddress"
      ).textContent = `Your IP Address is: ${data.ip}`;
    })
    .catch(() => {
      document.getElementById("ipAddress").textContent =
        "Unable to fetch IP address.";
    });

  document.getElementById("1").addEventListener("click", () => {
    openAddEntryWindow();
  });

  document.getElementById("2").addEventListener("click", () => {
    openDeleteEntryWindow();
  });

  document.getElementById("3").addEventListener("click", () => {
    openupdateEntryWindow();
  });
});

function openAddEntryWindow() {
  const newWindow = window.open("add.html", "_blank");
}

function openDeleteEntryWindow() {
  const newWindow = window.open("delete.html", "_blank");
}

function openupdateEntryWindow() {
  const newWindow = window.open("update.html", "_blank");
}

/// client side to server side
async function addEntry(name, age) {
  try {
    const response = await fetch("http://localhost:5000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age }),
    });
    const data = await response.json();
    console.log("Successfully added:", data);
    return data;
  } catch (error) {
    console.error("Error adding entry:", error);
  }
}

async function deleteEntry(id) {
  try {
    const response = await fetch("http://localhost:5001/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    console.log("Successfully deleted:", data);
    return data;
  } catch (error) {
    console.error("Error deleting entry:", error);
  }
}

async function fetchTableContent() {
  try {
    const response = await fetch("http://localhost:5002/show", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("Table content:", data);
    return data;
  } catch (error) {
    console.error("Error fetching table content:", error);
  }
}

//////////////////////// if you want to add add down here\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ here
