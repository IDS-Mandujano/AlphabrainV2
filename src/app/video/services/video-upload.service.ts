import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVideo } from '../models/ivideo';
import { environment } from '../../../enviroments/enviroment';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoUploadService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadVideo(videoFile: File, title: string, description: string): Observable<IVideo> {
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', title);
    formData.append('description', description);

    return this.http.post<IVideo>(`${this.apiUrl}/videos/upload`, formData).pipe(
      catchError(error => {
        Swal.fire({
          title: '¡Error!',
          text: 'Hubo un problema al subir el video. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
        throw error;
      })
    );
  }

  getVideos(): Observable<IVideo[]> {
    return this.http.get<IVideo[]>(`${this.apiUrl}/videos`).pipe(
      catchError(error => {
        Swal.fire({
          title: '¡Error!',
          text: 'No se pudieron obtener los videos. Intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
        throw error;
      })
    );
  }

  getVideoById(id: number): Observable<IVideo> {
    return this.http.get<IVideo>(`${this.apiUrl}/videos/${id}`).pipe(
      catchError(error => {
        Swal.fire({
          title: '¡Error!',
          text: `No se pudo obtener el video con ID ${id}. Intenta nuevamente.`,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
        throw error;
      })
    );
  }
}