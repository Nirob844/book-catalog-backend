import express from 'express';

import { UsersController } from './user.controller';

const router = express.Router();

router.get('/', UsersController.getAllFromDB);
router.get('/:id', UsersController.getDataById);
router.post('/', UsersController.insertIntoDB);
router.patch('/:id', UsersController.updateOneInDB);
router.delete('/:id', UsersController.deleteByIdFromDB);

export const UserRoutes = router;
