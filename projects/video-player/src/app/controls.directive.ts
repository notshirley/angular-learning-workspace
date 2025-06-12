import { Directive, EventEmitter, Host, HostListener, Output } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Directive({
    selector: '[appHoverControls]',
    standalone: true
})
export class ControlsDirective {
    @Output() hoverStateChange = new BehaviorSubject<boolean>(false);

    @HostListener('mouseenter')
    onMouseEnter() {
        this.hoverStateChange.next(true);
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.hoverStateChange.next(false);
    }


}