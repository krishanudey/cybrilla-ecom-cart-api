import { Router } from 'express';
import { index } from '../controllers/cart.controller';

export const CartRouter = Router();

CartRouter.get('/', index);
