import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

const fileUrl: string = `${__dirname}\\..\\..\\dev-data\\data\\tours-simple.json`;
const tours: any[] = JSON.parse(fs.readFileSync(fileUrl, 'utf8'));

export const checkId = (
  _req: Request,
  res: Response,
  next: NextFunction,
  val: string
) => {
  console.log(`Tour id is: ${val}`);
  if (+val > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID !' });
  }
  next();
};

export const checkBody = (req: Request, res: Response, next: NextFunction) => {
  if (!(req.body.name && isFinite(req.body.price) && req.body.price > 0)) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Invalid Tour params !' });
  }

  console.log(
    `Tour body name is: ${req.body.name} and the price is ${req.body.price}`
  );
  next();
};

export const getAllTours = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

export const getTour = (req: Request, res: Response) => {
  const tour = tours.find((elm) => elm.id === +req.params.id);
  res.status(200).json({ status: 'success', data: { tour } });
};

export const createTour = (req: Request, res: Response) => {
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

export const updateTour = (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Update to do!>' } });
};

export const deleteTour = (req: Request, res: Response) => {
  res.status(204).json({ status: 'success', data: null });
};
