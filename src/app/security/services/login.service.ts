import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string): Observable<any> {
    const body = { correo: correo, contrasena: contrasena };
    return this.http.post<any>(`${this.apiUrl}/users/login`, body);
  }
}