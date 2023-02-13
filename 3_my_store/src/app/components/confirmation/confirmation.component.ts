import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item';
import { ConfirmationParameters } from 'src/app/models/confirmation-parameters';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {

  cart: CartItem[] = [];
  params: ConfirmationParameters = new ConfirmationParameters();
  subscription: Subscription = new Subscription;

  constructor(private cartService: CartService, private router: Router) {
    this.subscription = router.routerState.root.queryParams.subscribe((queryParams: any) => this.params = queryParams);
  }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    if(this.cart.length > 0) {
      this.cartService.resetCart();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
