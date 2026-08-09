import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {

  private readonly _domSanitizer = inject(DomSanitizer)

  transform(text: string, search: string): SafeHtml {
    if (!text) return '';
    if (!search) return text;

    const regex = new RegExp(`(${this.escapeRegExp(search)})`, 'gi');
    const highlighted = text.replace(regex, '<span class="text-primary font-bold">$1</span>');

    return this._domSanitizer.bypassSecurityTrustHtml(highlighted);
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
