import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getAllFromDB
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getDataById
);
router.post('/', auth(ENUM_USER_ROLE.CUSTOMER), OrderController.insertIntoDB);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), OrderController.updateOneInDB);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  OrderController.deleteByIdFromDB
);

export const OrderRoutes = router;
