import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

// router.get('/', UsersController.getAllFromDB);
// router.get('/:id', UsersController.getDataById);
router.post('/', OrderController.insertIntoDB);
// router.patch('/:id', UsersController.updateOneInDB);
// router.delete('/:id', UsersController.deleteByIdFromDB);

export const OrderRoutes = router;
