import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'mp4ToTitle',
    standalone: true
})
export class Mp4ToTitlePipe implements PipeTransform {
    transform(value: any): any {
        if (typeof value !== 'string') {
            return value;
        } else {
            const fileName = value.split('/').pop()?.split('.').shift() || '';
            const title = fileName
                .replace(/-/g, ' ')
                .replace(/\b\w/g, char => char.toUpperCase());
            return title;
        }
    }

}