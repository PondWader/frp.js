// Use a plain text ini config instead of providing an object to be parsed
const { FRPClient } = require('js-frp');

const frpc = new FRPClient();

frpc.setConfigRaw(`[common]
server_addr = 127.0.0.1
server_port = 7000

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 6000`);
// You can read from a file using fs: frpc.setConfigRaw(fs.readFileSync('frpc.ini', 'utf-8'))

frpc.start();