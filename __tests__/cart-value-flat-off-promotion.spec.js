const { Product } = require('../build/models/product');
const { ShoppingCart } = require('../build/models/cart/shopping-cart');
const { CartItem } = require('../build/models/cart/cart-item');
const {
    CartValueFlatOffPromotion,
} = require('../build/models/promotion/impl/cart-value-flat-off-promotion');

describe('Cart value flat off promotion', () => {
    const promotion = new CartValueFlatOffPromotion([
        {
            min: 150,
            discount: 20,
        },
    ]);

    const productA = new Product('A', 30);
    const productB = new Product('B', 20);
    const cart = new ShoppingCart();

    test('it should not apply promotion when cart value is below 150', () => {
        cart.addItemToCart(productA);
        cart.addItemToCart(productA);
        cart.addItemToCart(productB);
        const discount = promotion.apply(cart);
        expect(discount).toEqual(0);
    });
    test('it should not apply promotion when cart value is minimum 150', () => {
        cart.addItemToCart(productA);
        cart.addItemToCart(productA);
        cart.addItemToCart(productA);
        cart.addItemToCart(productB);
        cart.addItemToCart(productB);
        cart.addItemToCart(productB);
        const discount = promotion.apply(cart);
        expect(discount).toEqual(20);
    });
});
