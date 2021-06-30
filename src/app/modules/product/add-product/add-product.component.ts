import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [ProductService]
})
export class AddProductComponent implements OnInit {

  productForm?: FormGroup;
  submitted = false;

  product = {
    name: '',
    image: '',
    price: '',
    description: '',
    quantity: '',
    status: ''
  };

  imageSrc = "";
  constructor(private service: ProductService, private router: Router, private formBuilder: FormBuilder) { }

  get form() { return this.productForm?.controls; }


  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      price: [0 || '', [Validators.required]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      status: ['', [Validators.required]],
    })
  }

  saveProduct(): void {
    this.submitted = true;
    if (this.productForm?.invalid) {
      return;
    }
    if (this.submitted) {
      alert('test done')
      // this.service.create(this.product).subscribe(rs => {
      //   if (rs === true) {
      //     this.router.navigate(["/product"]);
      //   }
      // }, error => {
      //   console.log(error);
      // });
    }
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
