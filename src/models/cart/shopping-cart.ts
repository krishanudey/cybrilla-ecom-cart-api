import { CartItem } from './cart-item';
import { Product } from '../product';

export class ShoppingCart {
    private items: Map<string, CartItem> = new Map();
    private _discount: number = 0.0;

    constructor() {}

    public get discount(): number {
        return this._discount;
    }
    public get totalDiscount(): number {
        return this.discount;
    }

    public get preDiscountTotal(): number {
        return this.getItems()
            .map((ci) => ci.itemTotal)
            .reduce((ac, it) => ac + it, 0.0);
    }

    public get postDiscountTotal(): number {
        return this.preDiscountTotal - this.discount;
    }
    private getItems(): CartItem[] {
        return Array.from(this.items.values());
    }

    addItemToCart(product: Product, quantity: number = 1) {
        let cartItem: CartItem = this.items.get(product.name);
        if (!cartItem) {
            cartItem = new CartItem(product.name, product.unitPrice, quantity);
        } else {
            cartItem.setQuantity(cartItem.quantity + quantity);
        }
        this.items.set(product.name, cartItem);
        this.runPromotions();
    }

    clearCart() {
        this.items.clear();
        this._discount = 0.0;
    }

    transform(): any {
        return {
            items: this.getItems().map((ci) => ci.transform()),
            discount: this.discount,
            preCartDiscountTotal: this.preDiscountTotal,
            postCartDiscountTotal: this.postDiscountTotal,
        };
    }

    private runPromotions() {
        //TODO:
    }
}
