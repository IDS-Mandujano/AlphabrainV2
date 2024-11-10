import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IUser } from '../../security/models/iuser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() user: IUser | null = null;
  @Output() logoutEvent = new EventEmitter<void>();

  ngOnInit() {
    console.log('UserProfileComponent recibió usuario:', this.user);
  }

  logout() {
    localStorage.removeItem('user');
    console.log("cerraste sesion");

    this.logoutEvent.emit();

    Swal.fire({
      title: '¡Cerraste sesión!',
      text: 'Usted ha cerrado sesión correctamente.',
      icon: 'success',
      confirmButtonText: 'Continuar'
    });
  }
}