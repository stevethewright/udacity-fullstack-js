import { Product } from "./product";

export class CartItem {
    product: Product;
    quantity: number;

    constructor(product?: Product, quantity?: number) {
        if (product !== undefined) { 
            this.product = product;
        } else {
            this.product = new Product();
        }
        if (quantity !== undefined) {
            this.quantity = quantity;
        } else {
            this.quantity = -1;
        }
    }
}
