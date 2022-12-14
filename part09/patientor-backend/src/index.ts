import express from 'express';

import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();
const cors = require('cors')//eslint-disable-line

//app.use()
app.use(express.json());
app.use(cors());//eslint-disable-line

const PORT = 3001;

//ping endpoint
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

//diagnoses endpoint
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});