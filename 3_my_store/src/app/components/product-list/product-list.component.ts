import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  regularDistribution = 100 / 3 + '%'

  constructor(
    private httpService: HttpService,
    private cartService: CartService
  ){}

  ngOnInit() {
    this.httpService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addItemToCart(event: CartItem) {
    this.cartService.addItem(event.product, event.quantity);
  }
}
