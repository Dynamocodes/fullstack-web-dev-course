import express from 'express'
import { calculateBmi, parseArguments } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const { height, weight } = parseArguments([String(req.query.height),String(req.query.weight)]);
        const bmi = calculateBmi(Number(height), Number(weight))
        res.send(
        {
            weight,
            height,
            bmi
        });
    } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    res.send(errorMessage);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})