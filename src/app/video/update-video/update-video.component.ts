// update-video.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VideoService } from '../services/video.service';
import { IVideo } from '../models/ivideo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-video',  // Actualizamos el selector
  templateUrl: './update-video.component.html',  // Actualizamos el nombre del archivo de plantilla
  styleUrls: ['./update-video.component.css']
})
export class UpdateVideoComponent {  // Cambiamos el nombre de la clase a UpdateVideoComponent
  @Input() video!: IVideo;
  @Output() videoUpdated = new EventEmitter<void>();

  selectedFile: File | null = null;

  constructor(private videoService: VideoService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'video/mp4') {
      this.selectedFile = file;
    } else {
      Swal.fire({
        title: 'Formato no válido',
        text: 'Solo se permite cargar archivos en formato .mp4.',
        icon: 'warning',
        confirmButtonText: 'Cerrar'
      });
    }
  }

  updateVideo() {
    this.videoService.editVideo(
      this.video.id,
      { title: this.video.title, description: this.video.description },
      this.selectedFile!
    ).subscribe({
      next: () => {
        Swal.fire({
          title: 'Actualizado',
          text: 'El video ha sido actualizado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
        this.videoUpdated.emit();
      },
      error: (error) => {
        console.error('Error al actualizar el video:', error);
      }
    });
  }

  

}