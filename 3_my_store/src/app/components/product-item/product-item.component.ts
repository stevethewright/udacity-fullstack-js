import { Component, Input } from '@angular/core';
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

  constructor (private cartService: CartService) {}

  updateQuantity(quantity: string) {
    this.quantity = parseInt(quantity);
  }

  addItemToCart() {
    this.cartService.addItem(this.product, this.quantity);
  }

}
