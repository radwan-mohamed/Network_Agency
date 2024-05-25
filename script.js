document.addEventListener("DOMContentLoaded", () => {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ipAddress').textContent = `Your IP Address is: ${data.ip}`;
        })
        .catch(() => {
            document.getElementById('ipAddress').textContent = 'Unable to fetch IP address.';
        });

    document.getElementById("1").addEventListener("click", () => {
        const newWindow = window.open("", "_blank");
        newWindow.document.write(`
            <html>
            <head>
                <title>Port 12345</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <div class="container mt-5">
                    <form id="userForm">
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" name="name" aria-describedby="nameHelp">
                        </div>
                        <div class="mb-3">
                            <label for="age" class="form-label">Age</label>
                            <input type="text" class="form-control" id="age" name="age">
                        </div>
                        <button type="button" class="btn btn-primary" id="addButton">Add</button>
                    </form>
                    <p id="output" class="mt-3"></p>
                </div>
                <script>
                    document.getElementById("addButton").addEventListener("click", () => {
                        const name = document.getElementById("name").value;
                        const age = document.getElementById("age").value;
                        if (name === "" || age === "") {
                            alert("Please fill in both fields.");
                        } else {
                            alert(\`Name: \${name}, Age: \${age} added successfully!\`);
                            document.getElementById("output").textContent = \`Name: \${name}, Age: \${age}\`;
                        }
                    });
                <\/script>
            </body>
            </html>
        `);
    });

    document.getElementById("2").addEventListener("click", () => {
        const newWindow = window.open("", "_blank");
        newWindow.document.write(`
            <html>
            <head>
                <title>Port 12346</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <div class="container mt-5">
                    <form id="deleteForm">
                        <div class="mb-3">
                            <label for="id" class="form-label">ID</label>
                            <input type="text" class="form-control" id="id" name="id">
                        </div>
                        <button type="button" class="btn btn-danger" id="deleteButton">Delete</button>
                    </form>
                    <p id="output" class="mt-3"></p>
                </div>
                <script>
                    document.getElementById("deleteButton").addEventListener("click", () => {
                        const id = document.getElementById("id").value;
                        if (id === "") {
                            alert("Please fill in the ID field.");
                        } else {
                            alert(\`ID: \${id} deleted successfully!\`);
                            document.getElementById("output").textContent = \`ID: \${id} deleted successfully!\`;
                        }
                    });
                <\/script>
            </body>
            </html>
        `);
    });
});
