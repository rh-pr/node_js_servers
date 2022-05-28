'use strict';

const app = require ('./app');
const http = require ('http');

const port = parseInt (process.env.PORT || '3000', 10);
app.set ('port', port);

const server = http.createServer (app);
server.listen (port, () => console.log (`Server listening on ${port}`));
