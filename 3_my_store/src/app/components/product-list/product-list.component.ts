import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private httpService: HttpService){}

  ngOnInit() {
    this.httpService.getProducts().subscribe(data => {
      this.products = data;
  });
  }
}
