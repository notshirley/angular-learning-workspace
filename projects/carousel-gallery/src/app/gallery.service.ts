import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private images: BehaviorSubject<string[]> = new BehaviorSubject([
    'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ]);

  private previousImageIndex: BehaviorSubject<number> = new BehaviorSubject(
    this.images.value.length - 1
  );
  private currentImageIndex: BehaviorSubject<number> = new BehaviorSubject(0);

  get images$() {
    return this.images.asObservable();
  }

  get previousImageIndex$() {
    return this.previousImageIndex.asObservable();
  }

  get currentImageIndex$() {
    return this.currentImageIndex.asObservable();
  }

  setNextImage() {
    this.currentImageIndex.next(
      this.currentImageIndex.value + 1 == this.images.value.length
        ? 0
        : this.currentImageIndex.value + 1
    );
    this.previousImageIndex.next(
      this.previousImageIndex.value + 1 == this.images.value.length
        ? 0
        : this.previousImageIndex.value + 1
    );
  }

  setPreviousImage() {
    this.currentImageIndex.next(
      this.currentImageIndex.value == 0
        ? this.images.value.length - 1
        : this.currentImageIndex.value - 1
    );
    this.previousImageIndex.next(
      this.previousImageIndex.value == 0
        ? this.images.value.length - 1
        : this.previousImageIndex.value - 1
    );
  }

  addNewImage(imageUrl: string) {
    if (imageUrl) {
      this.images.next([...this.images.value, imageUrl]);
    }
  }
}
