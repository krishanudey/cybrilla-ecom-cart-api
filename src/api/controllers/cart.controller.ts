import { Request, Response } from 'express';
import { Promotions } from '../../data/promotion-repository';
import { ShoppingCart } from '../../models/cart/shopping-cart';

const cart = new ShoppingCart(Promotions);
export const index = (_req: Request, res: Response) => {
    res.json(cart.transform());
};
