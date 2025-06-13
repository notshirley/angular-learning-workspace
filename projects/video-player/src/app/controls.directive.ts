import { Directive, HostListener, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[appHoverControls]',
  standalone: true,
})
export class ControlsDirective {
  @Output() hoverVideoState = new BehaviorSubject<boolean>(false);
  @HostListener('mouseenter')
  onMouseEnterVideo() {
    this.hoverVideoState.next(true);
  }

  @HostListener('mouseleave')
  onMouseLeaveVideo() {
    this.hoverVideoState.next(false);
  }
}
