import { MultiBuyFlatOffPromotion } from '../models/promotion/impl/multi-buy-flat-off-promotion';
import { CartValueFlatOffPromotion } from '../models/promotion/impl/cart-value-flat-off-promotion';

export const Promotions = [
    new MultiBuyFlatOffPromotion({
        productName: 'A',
        batchQuantity: 3,
        discount: 15,
    }),
    new MultiBuyFlatOffPromotion({
        productName: 'B',
        batchQuantity: 2,
        discount: 5,
    }),
    new CartValueFlatOffPromotion([
        {
            min: 150,
            discount: 20,
        },
    ]),
];
