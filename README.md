# frp.js

`frp.js` is a JavaScript library written in TypeScript for managing FRP instances. FRP is a fast reverse proxy to help you expose a local server behind a NAT or firewall to the Internet.  

`frp.js` provides complete typing for all FRP configuration.  

[Find out more about FRP on the official respository here.](https://github.com/fatedier/frp)  

  # Installing  
Install frp.js using npm by running:  
```
npm install frp.js  
```
# Usage

`frp.js` exposes two classes: `FRPClient` and `FRPServer`. Both classes work very similarly.  Whether you're running a server or a client you must provide your config. You can do this in three ways. The first way is the most practical way, when creating an instance you provide your config as an object. The second way is to use `.setConfig(config)` after creating your instance and providing your config and the third way is running `.setConfigRaw(rawConfig)` where you can input a raw ini formatted string.  
Now you can start your instance with `.start()`.
You can find all config fields in the FRP repository which can be accessed by [clicking here](https://github.com/fatedier/frp/tree/dev/conf). Each section should be a separate key in  your object.
# Example
**Client example:**
```js
const { FRPClient } = require('frp.js');

const client = new FRPClient({
	common: {
		server_addr: '127.0.0.1',
		server_port: 7000
	},

	ssh: {
		type: 'tcp',
	    local_ip: '127.0.0.1',
		local_port: 22,
		remote_port: 6000
	}
});

client.on('started', () => {
	// Event is triggered when the FRP process begins to be launched, due to the fact the FRP executables will need to be downloaded if you haven't run FRP before you should wait for this event instead of assuming everything will be ready instantly after calling frp.start()
	// At this point client.process (and client.stdout) will become available.
});
client.on('spawned', () => {
	// Event is trigged when the FRP process spawns succesfully
	console.log('The FRP client process has been started.');
});
client.on('closed', () => {
	console.log('The FRP process has stopped.');
	// If you wish to be safe and you don't want the client to stop you can add a line calling client.start() to automatically restart the client.
});
client.on('message', (msg) => {
	// An alternative to using client.stdout where the messages are parsed to stringts for you.
	console.log(msg);
});

client.start();
// You can use client.stop() if you need to stop the client at any point
```
**Server example:**
  
Server works almost exactly the same as client, all above events apply so will not be repeated in this example.
```js
const { FRPServer } = require('frp.js');

const server = new FRPServer({
	common: {
		bind_port: 7000
	}
});

server.start();
```
# License
The code in `frp.js` is licensed with an [MIT license](https://github.com/PondWader/frp.js/blob/main/LICENSE). FRP is licensed with [Apache License](https://github.com/fatedier/frp/blob/dev/LICENSE).
