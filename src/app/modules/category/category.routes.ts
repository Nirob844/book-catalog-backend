import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.get('/', CategoryController.getAllFromDB);
router.get('/:id', CategoryController.getDataById);
router.post('/', CategoryController.insertIntoDB);
router.patch('/:id', CategoryController.updateOneInDB);
router.delete('/:id', CategoryController.deleteByIdFromDB);

export const CategoryRoutes = router;
