import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './../product';
import { ProductService } from './../product.service';
import { NgbdSortableHeader, SortEvent } from './../sortable.directive';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductService, DecimalPipe]
})
export class ProductComponent implements OnInit {
  closeModal = "";
  pName = "";
  _alert = false;
  products$: Observable<Product[]>;
  total$: Observable<number>;
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(public service: ProductService, private modalService: NgbModal, private router: Router) {
    this.products$ = service.products$
    this.total$ = service.total$;
    console.log(this.router.getCurrentNavigation()?.extras.state);
  }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  ngOnDestroy() {
  }

  retrieveProducts(): void {
    this.service.getAll().subscribe(data => {
      console.log(data);
      this.service.fetchData(data);
    }, error => {
      console.log(error);
    });
  }

  triggerModal(content: any, productName: string, id: number) {
    this.pName = productName;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.service.delete(id).subscribe(rs => {
        const deleterow = this.service.productList.find(x => x.id === id);
        this.service.productList.splice(this.service.productList.indexOf(deleterow!), 1);
        if (rs === true) {
          this.retrieveProducts();
        }
      })

      this.closeModal = `Closed with: ${res}`;
      //save click can add service for this
    }, (res) => {
      //close click top modal
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
