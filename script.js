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
    openUpdateEntryWindow();
  });

  document.getElementById("4").addEventListener("click", () => {
    openCpuRamUsageWindow(); // Ensure this function is correctly defined
  });

  document.getElementById("12349").addEventListener("click", () => {
    initiateShutdown();
  });

  document.getElementById("12350").addEventListener("click", () => {
    openChatWindow();
  });
});

function openAddEntryWindow() {
  window.open("add.html", "_blank");
}

function openDeleteEntryWindow() {
  window.open("delete.html", "_blank");
}

function openUpdateEntryWindow() {
  window.open("update.html", "_blank");
}

function openCpuRamUsageWindow() {
  window.open("cpuRamUsage.html", "_blank"); // Ensure this points to the correct file
}

function openChatWindow() {
  window.open("chat.html", "_blank");
}

async function fetchCpuRamUsage() {
  try {
    const response = await fetch("http://localhost:3002/cpu-ram-usage", {
      method: "GET",
    });
    const data = await response.json();
    document.getElementById("cpuRamUsage").innerHTML = `
      <p>CPU Usage: ${data.cpuUsage}%</p>
      <p>RAM Usage: ${data.ramUsage}%</p>
    `;
  } catch (error) {
    console.error("Error fetching CPU and RAM usage:", error);
    document.getElementById("cpuRamUsage").innerHTML =
      "<p>Error fetching CPU and RAM usage.</p>";
  }
}

async function initiateShutdown() {
  try {
    const response = await fetch("http://localhost:3002/shutdown", {
      method: "GET",
    });
    const data = await response.text();
    alert(data);
  } catch (error) {
    console.error("Error initiating shutdown:", error);
    alert("Error initiating shutdown.");
  }
}

// async function fetchCpuRamUsage() {
//   try {
//     const response = await fetch("http://localhost:3005/cpu-ram-usage", {
//       method: "GET",
//     });
//     const data = await response.json();
//     document.getElementById("cpuRamUsage").innerHTML = `
//       <p>CPU Usage: ${data.cpuUsage}%</p>
//       <p>RAM Usage: ${data.ramUsage}%</p>
//     `;
//   } catch (error) {
//     console.error("Error fetching CPU and RAM usage:", error);
//     document.getElementById("cpuRamUsage").innerHTML =
//       "<p>Error fetching CPU and RAM usage.</p>";
//   }
// }

async function initiateShutdown() {
  try {
    const response = await fetch("http://localhost:3005/shutdown", {
      method: "GET",
    });
    const data = await response.text();
    alert(data);
  } catch (error) {
    console.error("Error initiating shutdown:", error);
    alert("Error initiating shutdown.");
  }
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
