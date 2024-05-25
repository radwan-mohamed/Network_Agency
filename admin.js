const net = require('net');
const fs = require('fs').promises;
const os = require('os');
const { exec } = require('child_process');
const { cpuUsage } = require('os-utils');

async function logMessage(message) {
    const logFile = 'server_log.txt';
    try {
        await fs.appendFile(logFile, message + '\n');
    } catch (err) {
        console.error(`Error logging message: ${err}`);
    }
}

async function handleClient(socket, port) {
    socket.on('data', async (data) => {
        const message = data.toString('utf-8');
        console.log(`Received message on port ${port}: ${message}`);
        await logMessage(`Received message on port ${port}: ${message}`);

        let response;
        if (port === 12345) {
            console.log("Shutting down the server as requested by client 1");
            await logMessage("Shutting down the server as requested by client 1");
            response = "Server is shutting down...";
            shutdownServer();
        } else if (port === 12347) {
            cpuUsage((usage) => {
                response = `CPU usage of server: ${usage * 100}%`;
                socket.write(response);
                logMessage(response);
            });
            return;
        } else {
            response = "Request received";
            await logMessage(response);
        }

        socket.write(response);
        socket.end();
    });
}

function shutdownServer() {
    try {
        if (os.platform() === 'win32') {
            exec('shutdown /s /t 1');
        } else {
            exec('shutdown -h now');
        }
    } catch (err) {
        console.error(`Failed to shutdown due to: ${err}`);
        logMessage(`Failed to shutdown due to: ${err}`);
    }
}

function startServer(port) {
    const server = net.createServer((socket) => {
        console.log(`Accepted connection on port ${port}`);
        logMessage(`Accepted connection on port ${port}`);
        handleClient(socket, port);
    });

    server.listen(port, 'localhost', () => {
        console.log(`Server listening on port: ${port}`);
        logMessage(`Server listening on port: ${port}`);
    });
}

function main() {
    const ports = [12345, 12346, 12347];
    ports.forEach(port => startServer(port));
}

main();
