import { Component, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../services/login.service';
import { IUser } from '../../security/models/iuser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  @Output() toggleForm = new EventEmitter<void>();
  @Output() authenticated = new EventEmitter<IUser>();

  constructor(private loginService: LoginService) {}

  onSubmit(): void {
    this.loginService.login(this.email, this.password).subscribe(
      (user) => {
        console.log('Login exitoso, usuario recibido:', user);
        if (user) {
          this.authenticated.emit(user);
          Swal.fire({
            title: '¡Bienvenido!',
            text: 'Inicio de sesión exitoso.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
          console.warn('El usuario es undefined o null');
        }
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        Swal.fire({
          title: '¡Error!',
          text: 'Las credenciales no son válidas. Por favor, intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    );
  }

  onToggleForm() {
    this.toggleForm.emit();
  }
}