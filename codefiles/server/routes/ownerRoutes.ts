import express from 'express';
import { 
  addProperty, 
  getOwnerProperties, 
  updateProperty, 
  deleteProperty, 
  getOwnerBookings, 
  updateBookingStatus 
} from '../controllers/ownerController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('owner'));

router.post('/add-property', addProperty);
router.get('/properties', getOwnerProperties);
router.put('/update-property/:id', updateProperty);
router.delete('/delete-property/:id', deleteProperty);
router.get('/bookings', getOwnerBookings);
router.put('/booking-status/:id', updateBookingStatus);

export default router;
