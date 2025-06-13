import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ControlsDirective } from './controls.directive';
import { CommonModule } from '@angular/common';
import { Mp4ToTitlePipe } from './mp4-to-title.pipe';
import { ControlsService, DEFAULT_CONTROL } from './controls.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ControlsDirective, CommonModule, Mp4ToTitlePipe],
})
export class AppComponent {
  control$ = this.controlService.control$;
  @Input() title = 'video-player';
  @Input() source = 'assets/videos/orange-cat-playing-with-rat-toy.mp4';
  @ViewChild('videoPlayer', { static: false })
  videoPlayer!: ElementRef<HTMLVideoElement>;
  video: HTMLVideoElement | null = null;

  constructor(private controlService: ControlsService) {}

  ngAfterViewInit() {
    this.video = this.videoPlayer.nativeElement;
    if (this.video) {
      this.video.addEventListener('loadedmetadata', () => {
        this.controlService.setControl({
          ...DEFAULT_CONTROL,
          videoDuration: this.video!.duration,
        });
      });
      
      this.video.addEventListener('timeupdate', () => {
        this.controlService.updateControl({
          currentVideoTime: this.video!.currentTime,
        });
      });

      this.video.volume = 0
    }
  }

  togglePlayPause() {
    if (!this.video) return;

    const isPlaying = !this.video.paused;

    if (isPlaying) {
      this.video.pause();
    } else {
      this.video.play();
    }

    this.controlService.updateControl({ isPlaying: !isPlaying });
  }

  toggleFullscreen() {
    if (!this.video) return;

    this.video?.requestFullscreen();
  }

  onSeek(value: number): void {
    if (!this.video) return;

    this.video!.currentTime = value;

    this.controlService.updateControl({ currentVideoTime: value });
  }

  onVolumeChange(value: number): void {
    if (!this.video) return;

    this.video!.volume = value;
    this.controlService.updateControl({ volume: value });
  }

  formatTime(time: number): string {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  onVolumeClick(): void {
    if (!this.video) return;

    const currentControlState = this.controlService.currentControlState();
    this.controlService.updateControl({
      showVolumeControl: !currentControlState.showVolumeControl,
    });
  }
}
