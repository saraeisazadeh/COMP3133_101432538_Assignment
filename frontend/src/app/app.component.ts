import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [CommonModule,RouterModule],
})
export class AppComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('auth_token'); // or sessionStorage
    alert('Logged out!');
    this.router.navigate(['/login']);
  }
}
