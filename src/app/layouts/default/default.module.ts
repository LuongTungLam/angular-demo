import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './default.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { DefaultRoutingModule } from './default-routing.module';
import { houseDoorFill, plusLg, eyeFill, NgxBootstrapIconsModule, penFill, trashFill, search } from 'ngx-bootstrap-icons';
import { ProductComponent } from '../../modules/product/index/product.component';
import { AddProductComponent } from '../../modules/product/add-product/add-product.component';
import { DetailsProductComponent } from '../../modules/product/details-product/details-product.component';
import { BrowserModule } from '@angular/platform-browser';
const icons = { houseDoorFill, plusLg, penFill, trashFill, search, eyeFill };

@NgModule({
  declarations: [DefaultComponent, ProductComponent, AddProductComponent, DetailsProductComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    FormsModule,
    NgbModule,
    NgxBootstrapIconsModule.pick(icons),
    // DefaultRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
  ]
})
export class DefaultModule { }
