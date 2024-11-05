import { Component } from '@angular/core';
import { VideoUploadService } from '../services/video-upload.service';

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
          console.log('Video uploaded successfully', response);
          this.resetForm();
        },
        error => {
          console.error('Error uploading video', error);
        }
      );
    } else {
      alert('Por favor completa todos los campos y selecciona un archivo de video.');
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
