import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart: CartItem[] = [];
  totalPrice: number = 0;

  fullName: string = '';
  address: string = '';
  creditCardNumber: string = '';
  
  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.refreshCart();
  }

  refreshCart(): void {
    this.totalPrice = 0;
    this.cart = this.cartService.getCart();
    this.cart.forEach(item => {
      this.totalPrice += (item.product.price * item.quantity);
    });
  }

  updateQuantity(e: Event): void {
    let productId = parseInt((<HTMLInputElement>(e.target!)).id);
    let cartItem: CartItem | undefined= this.cartService.getCart().find(item => item.product.id === productId);
    let quantity: number = parseInt((<HTMLInputElement>(e.target!)).value);
    console.log(cartItem)
    if (cartItem !== undefined) {
      this.cartService.updateCartItemQuantity(cartItem, quantity);
    }
    this.refreshCart();
  }

  submitPayment(): void {
    this.router.navigate(['confirmation'], { relativeTo: this.route.parent, queryParams:{'fullName': this.fullName, 'totalPrice': this.totalPrice}});
  }

}
