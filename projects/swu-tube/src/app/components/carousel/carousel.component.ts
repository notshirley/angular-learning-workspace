import { Component } from '@angular/core';
import { CarouselService, CarouselState } from './carousel.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
standalone: true,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  carousel$: Observable<CarouselState> = this.carouselService.state$;
  animationDirection: 'left' | 'right' | 'none' = 'none';
  transitioning = false;
  autoAdvanceSub?: Subscription;

  constructor(private carouselService: CarouselService) {}

  ngOnInit(): void {
    this.startAuto();

    this.autoAdvanceSub = this.carouselService.autoAdvanceCommand$.subscribe(
      (direction) => {
        this.onCarouselButtonClick(direction);
      }
    );
  }

  ngOnDestroy(): void {
    this.carouselService.stopAutoAdvance();
    this.autoAdvanceSub?.unsubscribe();
  }

  onCarouselButtonClick(direction: 'left' | 'right') {
    this.startAuto();
    if (this.transitioning) return;

    this.animationDirection = direction;
    this.transitioning = true;
    this.carouselService.moveToNextImage(direction);
  }

  onAnimationEnd() {
    this.animationDirection = 'none';
    this.transitioning = false;
  }

  startAuto() {
    this.carouselService.startAutoAdvance(4000);
  }
}
