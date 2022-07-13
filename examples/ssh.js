// Access your computer in LAN by SSH
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
        type: 'tcp',
        local_ip: '127.0.0.1',
        local_port: 22,
        remote_port: remote_port
    }
});

frpc.on('spawned', () => {
    console.log(`FRP client started, the local machine can now be connected to using SSH through ${server_addr}:${remote_port}.`);
});

frpc.start();