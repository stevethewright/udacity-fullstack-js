import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: CartItem[] = [];

  constructor() {}

  getCart(): CartItem[] {
    return this.cart;
  }

  addItem(product: Product, quantity: number): void {
    if (this.hasProduct(product.id)) {
      let cartItem = this.getCartItem(product.id);
      if (cartItem === undefined) {
        console.error('Item ' + product.id + ' not in cart');
        return;
      }
      let newQuantity = cartItem.quantity + quantity;
      this.updateCartItemQuantity(cartItem, newQuantity);
    } else {
      this.cart.push(new CartItem(product, quantity));
    }
    alert('Added to cart!');
  }

  resetCart(): void {
    this.cart = [];
  }

  removeItem(productId: number): void {
    let removingIndex: number = this.getCartItemIndex(productId);
    this.cart.splice(removingIndex, 1);
  }

  hasProduct(productId: number): boolean {
    let cartItem: CartItem | undefined = this.cart.find(item => item.product.id === productId);
    if (cartItem === undefined) {
      return false;
    }
    return true;
  }

  getCartItem(productId: number): CartItem | undefined {
    let cartItem: CartItem | undefined = this.cart.find(item => item.product.id === productId);
    return cartItem;
  }

  getCartItemIndex(productId: number): number {
    let cartItemIndex: number = this.cart.findIndex(item => item.product.id === productId);
    return cartItemIndex;
  }

  updateCartItemQuantity(cartItem: CartItem, quantity: number): void {
    cartItem.quantity = quantity;
  }

}
