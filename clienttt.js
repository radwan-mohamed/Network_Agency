const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3002'); // Ensure this matches the WebSocket server URL

ws.on('open', () => {
  console.log('Connected to the WebSocket server');
  ws.send('Hello from clientt.js!'); // Send a string message
});

ws.on('message', (data) => {
  console.log(`Message from server: ${data}`);
});

ws.on('close', () => {
  console.log('Disconnected from the WebSocket server');
});

ws.on('error', (error) => {
  console.error(`WebSocket error: ${error}`);
});
