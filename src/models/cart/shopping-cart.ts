import { CartItem } from './cart-item';
import { Product } from '../product';
import { Promotion } from '../promotion/core/promotion';
import { CartPromotion } from '../promotion/core/cart-promotion';
import { ItemPromotion } from '../promotion/core/item-promotion';

export class ShoppingCart {
    private items: Map<string, CartItem> = new Map();
    private _discount: number = 0.0;
    private _promotions: Promotion<any>[] = [];

    constructor(promotions: Promotion<any>[]) {
        this._promotions = promotions || [];
    }

    public get discount(): number {
        return this._discount;
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
        this._discount = 0.0;
        let cartPromotions: CartPromotion[] = [];
        let itemPromotions: ItemPromotion[] = [];

        this._promotions.forEach((promotion) => {
            if (promotion instanceof ItemPromotion) {
                itemPromotions.push(promotion);
            } else if (promotion instanceof CartPromotion) {
                cartPromotions.push(promotion);
            }
        });

        let productDiscount = 0.0;
        if (itemPromotions.length > 0) {
            this.getItems().forEach((item) => {
                productDiscount += Math.max(
                    ...itemPromotions.map((p) => {
                        return p.apply(item);
                    }),
                );
            });
        }

        this._discount = productDiscount;

        let cartDiscount = 0.0;
        if (cartPromotions.length) {
            cartDiscount = Math.max(
                ...cartPromotions.map((p) => {
                    return p.apply(this);
                }),
            );
        }

        this._discount += cartDiscount;
        // console.log(
        //     'ShoppingCart -> runPromotions -> productDiscount',
        //     productDiscount,
        // );
        // console.log(
        //     'ShoppingCart -> runPromotions -> cartDiscount',
        //     cartDiscount,
        // );
        // console.log(
        //     'ShoppingCart -> runPromotions -> this._discount',
        //     this._discount,
        // );
    }
}
