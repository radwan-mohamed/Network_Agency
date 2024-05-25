const dgram = require('dgram');

function getHostIp(callback) {
    const socket = dgram.createSocket('udp4');
    socket.connect(80, '8.8.8.8', () => {
        try {
            const address = socket.address();
            callback(null, address.address);
        } catch (err) {
            callback(err, null);
        } finally {
            socket.close();
        }
    });

    socket.on('error', (err) => {
        callback(err, null);
    });
}

getHostIp((err, ip) => {
    if (err) {
        console.error('Unable to retrieve IP address:', err.message);
    } else {
        console.log('Your Host IP Address is:', ip);
    }
});
