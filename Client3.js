const net = require('net');
//abdelrahman mohamed
function main() {
    const client = new net.Socket();

    client.connect(12347, 'localhost', () => {
        console.log('Connected to server');
        client.write('from client 3');
    });

    client.on('data', (data) => {
        console.log('Response from server:', data.toString('utf-8'));
        client.destroy(); // Close the connection after receiving the response
    });

    client.on('close', () => {
        console.log('Connection closed');
    });

    client.on('error', (err) => {
        console.error('Error:', err);
    });
}

main();
