import {Component, Input, ContentChild, TemplateRef} from '@angular/core';
import {AbstractTextMatcher} from '../util/abstract-text-matcher';
import {Accessible} from '../util/accessible.model';

@Component({
    selector: 'appAutocomplete',
    template: `
        <div>Autocomplete</div>
        <div *ngFor="let item of items">
            <ng-container *ngTemplateOutlet="optionTemplate,context: {$implicit: {item: item, filter: filter, textMatcher: textMatcher, mustHighlight: true}}"></ng-container>
        </div>
    `
})
export class AutoCompleteComponent {

    @Input() textMatcher: AbstractTextMatcher;
    @Input() items: Array<Accessible>;

    @ContentChild('optionTemplate') optionTemplate: TemplateRef<any>;

    private filter: string = 'Toto';

  private initAccessible(id: string, label: string, value: any, out: Array<Accessible>) {
    const rslt = new Accessible();
    rslt.id = id;
    rslt.label = label;
    rslt.value = value;
    out.push(rslt);
  }    
}