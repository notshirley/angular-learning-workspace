import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subject, Subscription } from 'rxjs';

export interface CarouselState {
  images: string[];
  currentImgIndex: number;
  prevImgIndex: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  private carouselState: BehaviorSubject<CarouselState> = new BehaviorSubject({
    images: [
      'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    currentImgIndex: 0,
    prevImgIndex: 0,
  });

  private autoAdvance?: Subscription;
  private autoAdvanceTrigger$ = new Subject<'left' | 'right'>();

  get state$() {
    return this.carouselState.asObservable();
  }

  get currentState() {
    return this.carouselState.value;
  }

  get autoAdvanceCommand$() {
    return this.autoAdvanceTrigger$.asObservable(); 
  }
  get autoAdvanceActive() {
    return this.autoAdvance && !this.autoAdvance.closed;
  }

  moveToNextImage(direction: 'left' | 'right') {
    let current = this.currentState.currentImgIndex;
    let prev = current - 1;
    let next = current + 1;

    if (direction === 'left') {
      this.carouselState.next({
        ...this.currentState,
        prevImgIndex: current,
        currentImgIndex: next >= this.currentState.images.length ? 0 : next,
      });
    } else {
      this.carouselState.next({
        ...this.currentState,
        prevImgIndex: current,
        currentImgIndex: prev < 0 ? this.currentState.images.length - 1 : prev,
      });
    }
  }

  startAutoAdvance(intervalMs: number = 3000) {
    this.stopAutoAdvance();
    this.autoAdvance = interval(intervalMs).subscribe(() => {
      this.autoAdvanceTrigger$.next('right'); 
    });
  }

  stopAutoAdvance() {
    this.autoAdvance?.unsubscribe();
  }
}
