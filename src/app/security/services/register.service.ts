import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegister } from '../models/iregister';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(user: IRegister): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, user);
  }
}