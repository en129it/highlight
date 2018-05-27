import { PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AbstractTextMatcher } from './util/abstract-text-matcher';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
    constructor(public sanitizer: DomSanitizer) {
    }
    transform(text: string, filter: string, mustHightLight: boolean, textMatcher: AbstractTextMatcher): SafeHtml {
        if (filter && text) {
            let pattern = filter.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            pattern = pattern.split(' ').filter((t) => {
                return t.length > 0;
            }).join('|');
            const regex = new RegExp(pattern, 'gi');
            return text.replace(regex, (match) => `<span class="search-highlight">${match}</span>`);
/*            
            return this.sanitizer.bypassSecurityTrustHtml(
                text.replace(regex, (match) => `<span class="search-highlight">${match}</span>`)
            );
*/
        } else {
            return text;
        }
    }
}
