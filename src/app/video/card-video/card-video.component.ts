// card-video.component.ts
import { Component, Input } from '@angular/core';
import { IVideo } from '../models/ivideo';
import { VideoService } from '../services/video.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-video',
  templateUrl: './card-video.component.html',
  styleUrls: ['./card-video.component.css']
})
export class CardVideoComponent {
  @Input() video!: IVideo;
  isEditModalOpen = false;

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    console.log('Video URL:', this.video.video_url);
    console.log('Description: ', this.video.description);
  }

  openEditModal() {
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  onVideoUpdated() {
    this.closeEditModal();
    Swal.fire({
      title: 'Actualizado',
      text: 'El video ha sido actualizado exitosamente.',
      icon: 'success',
      confirmButtonText: 'Cerrar'
    });
  }

  deleteVideo(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.videoService.deleteVideo(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Eliminado',
              text: 'El video ha sido eliminado exitosamente.',
              icon: 'success',
              confirmButtonText: 'Cerrar'
            });
          },
          error: (error) => {
            console.error('Error al eliminar el video:', error);
          }
        });
      }
    });
  }
}