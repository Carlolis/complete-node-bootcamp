import express from 'express';
import {
  getAllusers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controller/userController';

const router = express.Router();

router.route('/').get(getAllusers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
