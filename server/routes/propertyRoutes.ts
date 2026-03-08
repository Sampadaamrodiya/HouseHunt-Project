import express from 'express';
import { 
  getAllProperties, 
  getPropertyById, 
  bookProperty, 
  getUserBookings 
} from '../controllers/renterController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/all', getAllProperties);
router.get('/:id', getPropertyById);
router.post('/book', protect, bookProperty);
router.get('/my-bookings', protect, getUserBookings);

export default router;
