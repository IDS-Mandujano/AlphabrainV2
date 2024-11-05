import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVideo } from '../models/ivideo';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class VideoUploadService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  uploadVideo(videoFile: File, title: string, description: string): Observable<IVideo> {
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', title);
    formData.append('description', description);

    return this.http.post<IVideo>(`${this.apiUrl}/videos/upload`, formData);
  }

  getVideos(): Observable<IVideo[]> {
    return this.http.get<IVideo[]>(`${this.apiUrl}/videos`);
  }

  getVideoById(id: number): Observable<IVideo> {
    return this.http.get<IVideo>(`${this.apiUrl}/videos/${id}`);
  }
}
