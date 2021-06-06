import fs from 'fs';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

const app = express();

// 1) MIDLLEWARES
app.use(morgan('common'));

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Hello from the midle !');
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  next();
});

const fileUrl: string = `${__dirname}\\..\\dev-data\\data\\tours-simple.json`;
const tours: any[] = JSON.parse(fs.readFileSync(fileUrl, 'utf8'));

// 2) Routes handler

const getAllTours = (req: Request, res: Response) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req: Request, res: Response) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID !' });
  }
  const tour = tours.find((elm) => elm.id === +req.params.id);
  res.status(200).json({ status: 'success', data: { tour } });
};

const createTour = (req: Request, res: Response) => {
  const newId: number = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(fileUrl, JSON.stringify(tours), (err) => {
    if (err) console.log(err);
    else
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      });
  });
};

const updateTour = (req: Request, res: Response) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID !' });
  }
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Update to do!>' } });
};

const deleteTour = (req: Request, res: Response) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID !' });
  }
  res.status(204).json({ status: 'success', data: null });
};

const getAllusers = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This routes is not yet defined.',
  });
};

const createUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This routes is not yet defined.',
  });
};

const getUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This routes is not yet defined.',
  });
};
const updateUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This routes is not yet defined.',
  });
};
const deleteUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This routes is not yet defined.',
  });
};
//app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3) Routes

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .patch(updateTour)
  .delete(deleteTour)
  .get(getTour);

app.route('/api/v1/users').get(getAllusers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
// 4) Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
