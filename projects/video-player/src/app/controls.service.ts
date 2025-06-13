import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Control {
  isPlaying: boolean;
  showControls: boolean;
  currentVideoTime: number;
  videoDuration: number;
  volume: number;
  showVolumeControl: boolean;
}

export const DEFAULT_CONTROL: Control = {
  isPlaying: false,
  showControls: false,
  currentVideoTime: 0,
  videoDuration: 0,
  volume: 0.0,
  showVolumeControl: false,
};

@Injectable({
  providedIn: 'root',
})
export class ControlsService {
  controlSubject = new BehaviorSubject<Control>(DEFAULT_CONTROL);

  get control$(): Observable<Control> {
    return this.controlSubject.asObservable();
  }

  controlSnapshot(): Control {
    return this.controlSubject.value;
  }

  setControl(newControl: Control) {
    this.controlSubject.next(newControl);
  }

  updateControl(partial: Partial<Control>) {
    const current = this.controlSubject.value;
    const updated = { ...current, ...partial };

    if (updated.currentVideoTime >= updated.videoDuration) {
      updated.currentVideoTime = 0;
      updated.isPlaying = false;
    }

    this.controlSubject.next(updated);
  }
}
