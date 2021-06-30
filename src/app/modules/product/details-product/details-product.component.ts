import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from "../product";
import { ActivatedRoute, NavigationEnd, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss']
})

export class DetailsProductComponent implements OnInit {
  imageSrc = "";

  product: Product = {
    id: 0,
    name: '',
    image: '',
    price: 0,
    description: '',
    quantity: 0,
    status: 0
  };

  constructor(private router: Router, private route: ActivatedRoute, private service: ProductService) { }

  ngOnInit(): void {
    this.getProduct(this.route.snapshot.params.id);
  }

  saveProduct(): void {
    this.service.update(this.route.snapshot.params.id, this.product).subscribe(rs => {
      if (rs === true) {
        this.router.navigate(["/product"]);
      }
    })
  }

  getProduct(id: number): void {
    this.service.get(id).subscribe(data => {
      this.product = data;
      console.log(data);
    })
  }

  readURL(e: { target: any; }) {
    const file = (e.target).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    }
    reader.readAsDataURL(file as Blob);
    reader.onloadend = () => {
      this.product.image = reader.result as string;
    }
  }
}
