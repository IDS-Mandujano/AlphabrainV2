import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { VideoModule } from "../video/video.module";
import { SecurityModule } from "../security/security.module";
import { UserModule } from "../user/user.module";



@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    VideoModule,
    SecurityModule,
    UserModule
],
exports : [
  HomeComponent
]
})
export class HomeModule { }
