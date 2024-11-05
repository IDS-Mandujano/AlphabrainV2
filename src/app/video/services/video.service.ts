import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVideo } from '../models/ivideo';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getVideos(): Observable<IVideo[]> {
    return this.http.get<IVideo[]>(`${this.apiUrl}/videos`);
  }
}