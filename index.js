// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!
const express = require('express');

const server = express();

const project = require('./project/projectRoutes');
const action = require('./action/actionRoutes');

server.use(express.json());

server.use('/api/action', action);
// server.use('/api/project', project);

server.use('/', (req, res) => {
  res.status(200).json('main index route');
});

server.listen(4000, () => console.log('Server is running'));