// Forward DNS query requests
const { FRPClient } = require('js-frp');

const frpc = new FRPClient();

const server_addr = '0.0.0.0';
const server_port = 7000;
const remote_port = 6000;

frpc.setConfig({
    common: {
        server_addr: server_addr,
        server_port: server_port
    },

    dns: {
        type: 'udp',
        local_ip: '8.8.8.8',
        local_port: 53,
        remote_port: remote_port
    }
});

frpc.on('spawned', () => {
    console.log(`FRP client started, DNS requests will now be received from ${server_addr}:${remote_port}.`);
});

frpc.start();