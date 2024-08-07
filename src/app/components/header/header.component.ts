import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  goCart() {
    this.router.navigate(['/cart']);
  }

  goProducts() {
    this.router.navigate(['/products']);
  }

  logout() {
    this.authService.logout(); // Clear authentication details
    this.router.navigate(['/login']); // Redirect to login page
  }

}
