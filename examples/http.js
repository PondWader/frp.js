// Expose a simple HTTP file server
// Browser your files stored in the LAN, from public Internet.
const { FRPClient } = require('js-frp');

const frpc = new FRPClient();

const server_addr = 'x.x.x.x';
const server_port = 7000;
const remote_port = 6000;

frpc.setConfig({
    common: {
        server_addr: server_addr,
        server_port: server_port
    },

    example_static_file: {
        type: 'tcp',
        remote_port: remote_port,
        plugin: 'static_file',
        plugin_local_path: '/tmp/files',
        plugin_strip_prefix: 'static',
        plugin_http_user: 'abc',
        plugin_http_passwd: 'abc'
    }
});

frpc.on('spawned', () => {
    // Visit http://x.x.x.x:6000/static/ from your browser and specify correct user and password to view files in /tmp/files on the frpc machine.
    console.log(`FRP client started, the files in /tmp/files can now be loaded using HTTP through ${server_addr}:${remote_port}.`);
});

frpc.start();