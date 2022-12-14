import express from 'express';
const app = express();
const cors = require('cors')//eslint-disable-line

//app.use()
app.use(express.json());
app.use(cors());//eslint-disable-line

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});