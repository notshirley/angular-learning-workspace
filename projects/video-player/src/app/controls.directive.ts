import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
    selector: '[appHoverControls]',
    standalone: true
})
export class ControlsDirective {
    @Output() hoverStateChange = new EventEmitter<boolean>();

    @HostListener('mouseenter')
    onMouseEnter() {
        this.hoverStateChange.emit(true);
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.hoverStateChange.emit(false);
    }
}