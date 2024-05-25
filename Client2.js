const net = require('net');

const client = new net.Socket();
const port = 12346;
const host = 'localhost';

client.connect(port, host, () => {
    console.log('Connected to server');
    client.write('from client 2');
});

client.on('data', (data) => {
    console.log('Response from server:', data.toString());
    client.destroy(); // kill client after server's response
});

client.on('close', () => {
    console.log('Connection closed');
});

client.on('error', (err) => {
    console.error('Error:', err.message);
});
