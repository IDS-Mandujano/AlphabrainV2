import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}