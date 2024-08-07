// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((products: any[]) => Array.from(new Set(products.map((product: { category: any; }) => product.category))))
    );
  }
  
  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((products: any[]) => products.filter((product: { category: string; }) => product.category === category))
    );
  }

}
