import { Directive, EventEmitter, Host, HostListener, Output } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Directive({
    selector: '[appHoverControls]',
    standalone: true
})
export class ControlsDirective {
    @Output() hoverState = new BehaviorSubject<boolean>(false);

    @HostListener('mouseenter')
    onMouseEnter() {
        this.hoverState.next(true);
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.hoverState.next(false);
    }


}