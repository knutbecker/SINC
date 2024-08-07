import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        async response => {
          if (response.success) {
            console.log('Login successful', response);
            this.router.navigate(['/products']);
          } else {
            console.log('Login failed', response);
            await this.showLoginFailedAlert();
          }
        },
        async error => {
          console.error('Login failed', error);
          await this.showLoginFailedAlert();
        }
      );
    }
  }

  async showLoginFailedAlert() {
    const alert = await this.alertController.create({
      header: 'Login failed',
      message: 'Incorrect username or password. Please try again.',
      buttons: ['OK']
    });
    await alert.present();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
