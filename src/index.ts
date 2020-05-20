import { Product } from './models/product';
import { ShoppingCart } from './models/cart/shopping-cart';

let products: Map<string, Product> = new Map();

products.set('A', new Product('A', 30));
products.set('B', new Product('B', 20));
products.set('C', new Product('C', 50));
products.set('D', new Product('D', 15));

let cart = new ShoppingCart([]);

// Case 1
cart.addItemToCart(products.get('A'));
cart.addItemToCart(products.get('B'));
cart.addItemToCart(products.get('C'));

console.log(cart.transform());
