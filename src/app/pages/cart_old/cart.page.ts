// src/app/pages/cart/cart.page.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'; // Adjust the path as needed

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  updateQuantity(id: number, quantity: number) {
    this.cartService.updateQuantity(id, quantity);
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }
}
