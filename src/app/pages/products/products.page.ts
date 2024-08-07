import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { ModalController } from '@ionic/angular';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  cartItems: any[] = [];

  constructor( private productService: ProductService, 
               private cartService: CartService,
               private modalController: ModalController,
               private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
    this.loadCartItems();
  }

  loadCategories() {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadProducts() {
    if (this.selectedCategory) {
      this.productService.getProductsByCategory(this.selectedCategory).subscribe((data: any) => {
        this.products = data;
      });
    } else {
      this.productService.getProducts().subscribe((data: any) => {
        this.products = data;
      });
    }
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.detail.value;
    this.loadProducts();
  }  

  async showDetails(product: any) {
    const modal = await this.modalController.create({
      component: ProductDetailsComponent,
      componentProps: { product }
    });
    return await modal.present();
  }


  // Cart functions

  loadCartItems() {
    this.cartService.cart$.subscribe((items: any[]) => {
      this.cartItems = items;
    });
  }

  addToCart(product: any) {
    // Add product to the cart, setting quantity to 1
    this.cartService.addToCart({ ...product, quantity: 1 });
    console.log('Product added to cart:', product);
    // this.alertSuccessfulAdded();
  }

  async alertSuccessfulAdded() {
    const alert = await this.alertController.create({
      header: 'SUCCESS',
      message: 'The item has been successfully added to your shopping cart',
      buttons: ['OK']
    });
    await alert.present();
  }

  updateQuantity(id: number, quantity: number) {
    this.cartService.updateQuantity(id, quantity);
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

}
