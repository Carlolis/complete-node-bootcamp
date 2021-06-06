import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tourRoutes';
import tourUser from './routes/userRoutes';
export const app = express();

// 1) MIDLLEWARES
app.use(morgan('common'));
app.use(express.json());

app.use((_req: Request, _res: Response, next: NextFunction) => {
  console.log('Hello from the midle !');
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', tourUser);
