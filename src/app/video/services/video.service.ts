import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { IVideo } from '../models/ivideo';
import { environment } from '../../../enviroments/enviroment';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getVideos(): Observable<IVideo[]> {
    return this.http.get<IVideo[]>(`${this.apiUrl}/videos`).pipe(
      catchError(error => {
        Swal.fire({
          title: '¡Error!',
          text: 'Hubo un problema al cargar los videos. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
        throw error;
      })
    );
  }

  editVideo(id: number, videoData: { title: string; description: string }, videoFile?: File): Observable<any> {
    const formData = new FormData();
    formData.append('title', videoData.title);
    formData.append('description', videoData.description);

    if (videoFile) {
      formData.append('video', videoFile, videoFile.name);
    }

    return this.http.put(`${this.apiUrl}/videos/${id}`, formData).pipe(
      catchError(error => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar el video. Inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
        return throwError(error);
      })
    );
  }

  deleteVideo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/videos/${id}`).pipe(
      catchError(error => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el video. Inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
        return throwError(error);
      })
    );
  }
}