import { Component, ElementRef, ViewChild } from '@angular/core';
import { ControlsDirective } from './controls.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ControlsDirective, CommonModule],
})
export class AppComponent {
  title = 'video-player';
  @ViewChild('videoPlayer', { static: true })
  videoPlayer!: ElementRef<HTMLVideoElement>;

  video: HTMLVideoElement | null = null;
  isPlaying = false;
  showControls = false;

  ngAfterViewInit() {
    this.video = this.videoPlayer.nativeElement;
  }

  togglePlayPause() {
    if (this.video) {
      if (this.isPlaying) {
        this.video.pause();
      } else {
        this.video.play();
      }
      this.isPlaying = !this.isPlaying;
    }
  }
}
