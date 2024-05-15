import express from 'express';
import app from './app';  // Explicit .js extension

const server = express();
const port = 3000;

server.use(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
