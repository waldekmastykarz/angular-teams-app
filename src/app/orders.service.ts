import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient
  ) { }

  getOrders() {
    return this.http.get('https://myuniquedomain-api.loca.lt/api/orders');
  }
}
