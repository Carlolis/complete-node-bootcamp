import express from 'express';
import {
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour,
  checkId,
  checkBody,
} from '../controller/tourController';

const router = express.Router();

router.param('id', checkId);

router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:id').patch(updateTour).delete(deleteTour).get(getTour);

export default router;
