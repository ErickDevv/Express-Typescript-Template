import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

const numberMiddleware = (req: Request, res: Response, next: Function) => {
  const { a, b } = req.query;
  if (isNaN(Number(a)) || isNaN(Number(b))) {
    res.send('a and b must be numbers');
  } else {
    next();
  }
};

const denominatorMiddleware = (req: Request, res: Response, next: Function) => {
  const { b } = req.query;
  if (Number(b) === 0) {
    res.send('The denominator cannot be 0');
  } else {
    next();
  }
};

app.get('/divide', [numberMiddleware, denominatorMiddleware], (req: Request, res: Response) => {
  const { a, b } = req.query;
  const result = Number(a) / Number(b);
  res.send(`${result}`);
});

app.listen(port, () => {
  console.log(`⚡️Server is running in the port: ${port}`);
});