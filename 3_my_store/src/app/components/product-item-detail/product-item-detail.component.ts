import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent {
  @Input() product: Product = new Product();
  private routeSub: Subscription = new Subscription();

  constructor(private httpService: HttpService, private route: ActivatedRoute){}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.httpService.getProduct(params['id']).subscribe((data: Product) => {
        this.product = data;
      });
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
