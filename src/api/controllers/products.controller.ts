import { Request, Response } from 'express';
import { Products } from '../../data/product-repository';

export const index = (_req: Request, res: Response) => {
    res.json(Products);
};
