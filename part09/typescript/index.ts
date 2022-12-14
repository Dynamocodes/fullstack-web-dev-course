import express from 'express';
import { calculateBmi, parseArguments } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const isNumberArray = (arr: Array<number>) : boolean => {
  const isArray: boolean = Array.isArray(arr);
  const areNumbers: boolean = arr.reduce( (acc : boolean, e: number) => {
    return acc && !isNaN(Number(e));
  }, true);
  return isArray && areNumbers;
};

app.post('/exercises', (req, res) => {
  if(!req.body || !req.body.daily_exercises || !req.body.target){//eslint-disable-line
    res.status(401).json( {error: "parameters missing"}).end();
  }
  else if(isNaN(req.body.target) || !isNumberArray(req.body.daily_exercises)){//eslint-disable-line
    res.status(401).json({error: "malformatted parameters"}).end();
  }
  else{
    const daily_exercises : Array<number> = req.body.daily_exercises // eslint-disable-line
    const target : number = req.body.target // eslint-disable-line
    res.send(calculateExercises(daily_exercises, target));
  }
  
});

app.get('/bmi', (req, res) => {
  const { height, weight } = parseArguments([String(req.query.height),String(req.query.weight)]);
  const bmi = calculateBmi(Number(height), Number(weight));
  res.send(
  {
    weight,
    height,
    bmi
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});