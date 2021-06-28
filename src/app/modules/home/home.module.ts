import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    NgbPaginationModule,
    NgbAlertModule,
    CommonModule, FormsModule
  ]
})
export class HomeModule { }
