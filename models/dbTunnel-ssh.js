const tunnel = require('tunnel-ssh');
const { Client } = require('pg'); // For PostgreSQL

const config = {
    username: 'your_username',
    host: 'remote_host',
    port: 22, // SSH port
    dstHost: 'localhost', // Remote PostgreSQL server host
    dstPort: 5432, // Remote PostgreSQL port
    localHost: 'localhost', // Localhost for your application
    localPort: 5432, // Local port for PostgreSQL
    privateKey: require('fs').readFileSync('/path/to/your/private/key')
};

const server = tunnel(config, function (error, server) {
    if (error) {
        console.error('SSH Tunnel Error:', error);
        return;
    }

    // connect to PostgreSQL through the tunnel
    const client = new Client({
        host: 'localhost', // connect to localhost
        port: 5432, // connect to the tunneled port
        user: 'your_pg_user',
        password: 'your_pg_password',
        database: 'your_database'
    });

    client.connect(err => {
        if (err) {
            console.error('PostgreSQL Connection Error:', err.stack);
        } else {
            console.log('Connected to PostgreSQL through SSH tunnel');
            // Run your queries here
        }
    });
});

server.on('close', () => {
    console.log('SSH Tunnel Closed');
});
