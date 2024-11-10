import { Component, OnInit } from '@angular/core';
import { IUser } from '../../security/models/iuser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogin: boolean = true;
  isAuthenticated: boolean = false;
  user: IUser | null = null;
  
  currentView: string = 'dashboard';

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  onAuthenticated(user: IUser): void {
    if (user) {
      this.isAuthenticated = true;
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Usuario autenticado en HomeComponent:', this.user);
    } else {
      console.warn('onAuthenticated recibió un usuario undefined o null');
    }
  }

  setView(view: string) {
    this.currentView = view;
  }

  ngOnInit() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  onLogout() {
    this.isAuthenticated = false;
    this.user = null;
    console.log('Usuario desautenticado, redirigiendo al login...');
  }
}