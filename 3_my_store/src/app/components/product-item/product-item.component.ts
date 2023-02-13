import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: Product = new Product();
  @Input() quantity: number = 1;
  @Output() addedProduct: EventEmitter<CartItem> = new EventEmitter();

  constructor (private cartService: CartService) {}

  updateQuantity(quantity: string) {
    this.quantity = parseInt(quantity);
  }

  addItemToCart() {
    let cartItem: CartItem = new CartItem(this.product, this.quantity);
    this.addedProduct.emit(cartItem);
  }

}
