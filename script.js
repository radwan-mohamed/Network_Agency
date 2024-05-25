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
});

function openAddEntryWindow() {
  const newWindow = window.open("add.html", "_blank");
}

function openDeleteEntryWindow() {
  const newWindow = window.open("delete.html", "_blank");
}
