import { Directive, ElementRef, Input, OnChanges, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit,
    AfterContentChecked, 
    SimpleChanges} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AbstractTextMatcher } from './util/abstract-text-matcher';

@Directive(
    {
        selector: '[appHighlight]'
    }
)
export class HighlightDirective implements OnChanges, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked {

    @Input() appHighlight: string;
    @Input() textMatcher: AbstractTextMatcher;

    constructor(public el: ElementRef) {
    }


    ngOnChanges(changes: SimpleChanges): void {
        if ('appHighlight' in changes) {
//            this.aaa('ngOnChanges');
        }
    }

    ngOnInit(): void {
//        console.log("||||||||| ", this.textMatcher);
//        this.aaa('ngOnInit');
    }

    ngAfterViewInit(): void {
        this.aaa('ngAfterViewInit');
    }

    ngAfterViewChecked(): void {
        //this.aaa('ngAfterViewChecked');
    }

    ngAfterContentInit(): void {
        //this.aaa('ngAfterContentInit');
    }

    ngAfterContentChecked(): void {
        //this.aaa('ngAfterContentChecked');
    }

    private aaa(lifeCycle: string): void {
        const a = this.el.nativeElement.innerHTML;
        const b = this.transform(a, this.appHighlight);
        console.log(lifeCycle + '     ' + a + '     ' + b);
        //this.el.nativeElement.innerHTML = b;
    }

    transform(text: string, search): SafeHtml {
        if (search && text) {
            let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
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
