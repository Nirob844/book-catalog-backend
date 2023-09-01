import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.get('/', BookController.getAllFromDB);
router.get('/:id', BookController.getDataById);
router.post('/', BookController.insertIntoDB);
router.patch('/:id', BookController.updateOneInDB);
router.delete('/:id', BookController.deleteByIdFromDB);

export const BookRoutes = router;
