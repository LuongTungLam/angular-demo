import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Product } from './product';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './sortable.directive';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/product';

interface SearchResult {
    products: Product[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
    list: Product[];
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(products: Product[], column: SortColumn, direction: string): Product[] {
    if (direction === '' || column === '') {
        return products;
    } else {
        return [...products].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

function matches(product: Product, term: string, pipe: PipeTransform) {
    return product.name.toLowerCase().includes(term.toLowerCase())
        || pipe.transform(product.price).includes(term);
}

@Injectable({ providedIn: 'root' })
export class ProductService {
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _products$ = new BehaviorSubject<Product[]>([]);
    private _total$ = new BehaviorSubject<number>(0);
    private _state: State = {
        page: 1,
        pageSize: 4,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
        list: [],
    };

    constructor(private pipe: DecimalPipe, private http: HttpClient) {
        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            this._products$.next(result.products);
            this._total$.next(result.total);
        });
        this._search$.next();
    }

    get products$() { return this._products$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    get productList() { return this._state.list };

    set productList(list: Product[]) { this._set({ list }) }
    set page(page: number) { this._set({ page }); }
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
    set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

    fetchData(list: Product[]) {
        this.productList = list;
    }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let products = sort(this.productList, sortColumn, sortDirection);

        // 2. filter
        products = products.filter(product => matches(product, searchTerm, this.pipe));
        const total = products.length;

        // 3. paginate
        products = products.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ products, total });
    }

    getAll(): Observable<any> {
        return this.http.get(baseUrl);
    }

    get(id: number): Observable<any> {
        return this.http.get(`${baseUrl}/${id}`)
    }

    update(id: number, data: any): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, data);
    }

    create(data: any): Observable<any> {
        return this.http.post(baseUrl, data);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`)
    }
}