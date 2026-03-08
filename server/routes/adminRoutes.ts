import express from 'express';
import { 
  getAllUsers, 
  getAllPropertiesAdmin, 
  getAllBookingsAdmin, 
  deleteUser 
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.get('/properties', getAllPropertiesAdmin);
router.get('/bookings', getAllBookingsAdmin);
router.delete('/user/:id', deleteUser);

export default router;
