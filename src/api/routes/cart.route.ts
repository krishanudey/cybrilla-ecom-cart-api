import { Router } from 'express';
import { index, addProductToCart } from '../controllers/cart.controller';

export const CartRouter = Router();

CartRouter.get('/', index);
CartRouter.get('/add/:productName', addProductToCart);
