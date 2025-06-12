import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ControlsDirective } from './controls.directive';
import { CommonModule } from '@angular/common';
import { Mp4ToTitlePipe } from './mp4-to-title.pipe';

// doesn't consider what happens when video is over
// doesn't allow adjustment of volume outside of fullscreen
// video source is dynamic, but must change in code

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ControlsDirective, CommonModule, Mp4ToTitlePipe],
})
export class AppComponent {
  @Input() title = 'video-player';
  @Input() source = "assets/videos/cat-video-1.mp4"
  @ViewChild('videoPlayer', { static: true })
  videoPlayer!: ElementRef<HTMLVideoElement>;

  video!: HTMLVideoElement;
  isPlaying = false;
  showControls = false;
  currentVideoTime = 0;
  videoDuration = 0;
  volume = 0.0;
  showVolumeControl = false;

  ngAfterViewInit() {
    this.video = this.videoPlayer.nativeElement;
    this.video.volume = this.volume;

    this.video.addEventListener('loadedmetadata', () => {
      this.videoDuration = this.video.duration;
    });

    this.video.addEventListener('timeupdate', () => {
      this.currentVideoTime = this.video.currentTime;
    });
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

  toggleFullscreen() {
    this.video?.requestFullscreen();
  }

  onSeek(value: number): void {
    this.video.currentTime = value;
  }

  onVolumeChange(value: number): void {
    this.volume = value;
    this.video.volume = value;
  }

  formatTime(time: number): string {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  onVolumeClick(): void {
    this.showVolumeControl = !this.showVolumeControl;
  }
}
