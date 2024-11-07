import { Component } from '@angular/core';
import { VideoUploadService } from '../services/video-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent {
  videoFile: File | null = null;
  title = '';
  description = '';

  constructor(private videoUploadService: VideoUploadService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.videoFile = input.files[0];
    }
  }

  uploadVideo(): void {
    if (this.videoFile && this.title && this.description) {
      this.videoUploadService.uploadVideo(this.videoFile, this.title, this.description).subscribe(
        response => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'El video se subió correctamente.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
          });
          this.resetForm();
        },
        error => {

          Swal.fire({
            title: '¡Error!',
            text: 'Hubo un problema al subir el video. Por favor, inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          });
          console.error('Error uploading video', error);
        }
      );
    } else {

      Swal.fire({
        title: '¡Advertencia!',
        text: 'Por favor completa todos los campos y selecciona un archivo de video.',
        icon: 'warning',
        confirmButtonText: 'Cerrar'
      });
    }
  }

  resetForm(): void {
    this.videoFile = null;
    this.title = '';
    this.description = '';
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}