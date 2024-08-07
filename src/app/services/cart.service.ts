import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  cart$ = this.cartSubject.asObservable();

  constructor() { }

  addToCart(item: CartItem) {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (index > -1) {
      this.cartItems[index].quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.cartSubject.next(this.cartItems);
  }

  updateQuantity(id: number, quantity: number) {
    const index = this.cartItems.findIndex(item => item.id === id);
    if (index > -1) {
      if (quantity <= 0) {
        this.removeFromCart(id);
      } else {
        this.cartItems[index].quantity = quantity;
        this.cartSubject.next(this.cartItems);
      }
    }
  }

  getCartItems() {
    return [...this.cartItems];
  }
}
