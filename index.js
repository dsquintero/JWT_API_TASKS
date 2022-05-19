const http = require("http");
const app = require("./app");
const config = require('./config');
const server = http.createServer(app);

const { port } = config;

// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});