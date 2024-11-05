import { Component, Input } from '@angular/core';
import { IVideo } from '../models/ivideo';

@Component({
  selector: 'app-card-video',
  templateUrl: './card-video.component.html',
  styleUrls: ['./card-video.component.css']
})
export class CardVideoComponent {
  @Input() video!: IVideo;
  ngOnInit() {
    console.log('Video URL:', this.video.video_url);
    console.log('Description: ',this.video.description)
  }

  playVideo(url: string) {
    const videoElement = document.createElement('video');
    videoElement.src = url;
    videoElement.controls = true;
    videoElement.play();
  }
}
