import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../security/models/iuser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() user: IUser | null = null;

  ngOnInit() {
    console.log('UserProfileComponent recibió usuario:', this.user);
  }

  logout(){
    console.log("cerraste sesion");
    
  }
}