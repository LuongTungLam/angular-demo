import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [ProductService]
})
export class AddProductComponent implements OnInit {
  product = {
    name: '',
    image: '',
    price: 0,
    description: '',
    quantity: 0,
    status: 0
  };
  imageSrc = "";
  base64: string = "Base64...";
  constructor(private service: ProductService) { }

  ngOnInit(): void {
  }

  saveProduct(): void {
    console.log(this.product);
    this.service.create(this.product).subscribe(rs => {
      console.log(rs);
    }, error => {
      console.log(error);
    });
  }

  readURL(e: { target: any; }) {
    const file = (e.target).files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    }

    reader.readAsDataURL(file as Blob);
    reader.onloadend = () => {
      this.base64 = reader.result as string;
      this.product.image = reader.result as string;
    }
  }
}
