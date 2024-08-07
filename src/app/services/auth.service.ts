import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://fakestoreapi.com/users'; // Endpoint for users
  private tokenKey = 'authToken'; // Key to store token

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        // Find if user exists with the given username and password
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
          // Successful login
          const token = 'mock-token'; // Mock token for demonstration
          localStorage.setItem(this.tokenKey, token);
          return { success: true, token };
        } else {
          // Invalid credentials
          return { success: false, error: 'Invalid credentials' };
        }
      }),
      catchError(error => {
        console.error('Login error', error);
        return of({ success: false, error: 'Login failed' });
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey); // Check if token exists
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey); // Remove token on logout
  }
}
