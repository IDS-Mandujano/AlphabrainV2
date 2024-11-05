import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { CardVideoComponent } from './card-video/card-video.component';
import { DashboardVideoComponent } from './dashboard-video/dashboard-video.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'



@NgModule({
  declarations: [
    UploadVideoComponent,
    CardVideoComponent,
    DashboardVideoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports : [
    DashboardVideoComponent,
    UploadVideoComponent
  ]
})
export class VideoModule { }
