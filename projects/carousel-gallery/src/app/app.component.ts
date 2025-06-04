import { Component, Input } from '@angular/core';
import { GalleryService } from './gallery.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @Input() newImageUrl: string = '';
  currentImage: string = '';
  currentImageIndex: number = 0;
  animationDirection: 'left' | 'right' | 'none' = 'none';
  autoAdvanceTimer: any;
  AUTO_ADVANCE_TIME = 3000;

  constructor(private galleryService: GalleryService) {
    this.galleryService.currentImageIndex$.subscribe((index) => {
      this.currentImageIndex = index;
      this.galleryService.images$
        .pipe(map((images) => images[index]))
        .subscribe((image) => {
          this.currentImage = image;
        });
    });
  }

  ngOnInit(): void {
    this.resetAutoAdvance();
  }

  private resetAutoAdvance(): void {
    clearTimeout(this.autoAdvanceTimer);
    this.autoAdvanceTimer = setTimeout(() => {
      this.nextImage();
    }, this.AUTO_ADVANCE_TIME);
  }
  
  nextImage() {
    this.resetAutoAdvance();
    this.animationDirection = 'left';
    this.galleryService.getNextImage();
  }
  
  previousImage() {
    this.resetAutoAdvance();
    this.animationDirection = 'right';
    this.galleryService.getPreviousImage();
  }
  
  onAnimationEnd() {
    this.animationDirection = 'none';
  }
  
  autoAnimate() {
    this.animationDirection = 'left';
  }
  
  addImage() {
    try {
      new URL(this.newImageUrl);
      this.galleryService.addNewImage(this.newImageUrl);
    } catch (e) {
      alert('Please enter a valid image URL.');
    }
    this.newImageUrl = '';
  }
  
    ngOnDestroy(): void {
      clearTimeout(this.autoAdvanceTimer);
    }
}
