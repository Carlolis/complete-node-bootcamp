import { app } from './app';

// 4) Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
