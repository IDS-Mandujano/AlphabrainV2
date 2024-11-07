import { Component, EventEmitter, Output } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { IRegister } from '../models/iregister';
import { IUser } from '../../security/models/iuser';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  correo: string = '';
  contrasena: string = '';

  @Output() toggleForm = new EventEmitter<void>();
  @Output() authenticated = new EventEmitter<IUser>();

  constructor(private registerService: RegisterService) {}

  onSubmit() {
    const user: IRegister = {
      username: this.username,
      correo: this.correo,
      contrasena: this.contrasena
    };

    this.registerService.register(user).subscribe({
      next: (response) => {
        console.log('Usuario registrado, usuario recibido:', response.user);
        this.authenticated.emit(response.user);

        Swal.fire({
          title: '¡Registrado con éxito!',
          text: 'El usuario ha sido registrado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (error) => {
        console.error('Error al registrar el usuario:', error);

        Swal.fire({
          title: '¡Error!',
          text: 'Hubo un problema al registrar el usuario. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }

  onToggleForm() {
    this.toggleForm.emit();
  }
}