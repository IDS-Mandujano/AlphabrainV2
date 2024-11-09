import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import { IVideo } from '../models/ivideo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-video',
  templateUrl: './dashboard-video.component.html',
  styleUrls: ['./dashboard-video.component.css']
})
export class DashboardVideoComponent implements OnInit {
  videos: IVideo[] = [];

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(): void {
    this.videoService.getVideos().subscribe(
      (data: IVideo[]) => {
        this.videos = data;
        console.log(data);
      },
      (error) => {
        console.error('Error al cargar videos', error);
        Swal.fire({
          title: '¡Error!',
          text: 'Hubo un problema al cargar los videos. Intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    );
  }

  onVideoUpdated(): void {
    this.loadVideos();
  }
}