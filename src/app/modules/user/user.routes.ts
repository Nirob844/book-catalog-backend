import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UsersController } from './user.controller';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UsersController.getAllFromDB);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UsersController.getDataById);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UsersController.updateOneInDB);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UsersController.deleteByIdFromDB
);

export const UserRoutes = router;
