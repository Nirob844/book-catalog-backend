import express from 'express';
import { ReviewAndRatingRoutes } from '../modules/ReviewAndRating/ReviewAndRating.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { BookRoutes } from '../modules/book/book.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { OrderRoutes } from '../modules/order/order.routes';
import { ProfileRoutes } from '../modules/profile/profile.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/review-and-rating',
    route: ReviewAndRatingRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
