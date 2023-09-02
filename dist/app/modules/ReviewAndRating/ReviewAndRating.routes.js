"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewAndRatingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ReviewAndRating_controller_1 = require("./ReviewAndRating.controller");
const router = express_1.default.Router();
router.get('/', ReviewAndRating_controller_1.ReviewAndRatingController.getAllFromDB);
router.get('/:id', ReviewAndRating_controller_1.ReviewAndRatingController.getDataById);
router.post('/', ReviewAndRating_controller_1.ReviewAndRatingController.insertIntoDB);
router.patch('/:id', ReviewAndRating_controller_1.ReviewAndRatingController.updateOneInDB);
router.delete('/:id', ReviewAndRating_controller_1.ReviewAndRatingController.deleteByIdFromDB);
exports.ReviewAndRatingRoutes = router;
