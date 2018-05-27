import { Component } from '@angular/core';
import { AbstractTextMatcher, MatchingSplitParts } from './util/abstract-text-matcher';
import { Accessible } from './util/accessible.model';

class MyTextMatcher implements AbstractTextMatcher {

  public isFilterMatching(accessible: Accessible, filter: string): boolean {
    return false;
  }

  public split(aValue: string, filter: string): MatchingSplitParts {
    return null;
  }

}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'This is an app';
  filter = 'app';
  myVal = 'toto';
  textMatcher: AbstractTextMatcher;
  public itemsA: Array<Accessible>;

  constructor() {
    console.log('constructor');

    this.textMatcher = new MyTextMatcher();
    this.itemsA = new Array<Accessible>();

    this.initAccessible('1', 'Label1', {}, this.itemsA);
    this.initAccessible('2', 'Label2', {}, this.itemsA);
    this.initAccessible('3', 'Label3', {}, this.itemsA);

    console.log('Items ' + this.itemsA.length);
  }

  onKey(value): void {
    this.title = value;
  }

  private initAccessible(id: string, label: string, value: any, out: Array<Accessible>) {
    const rslt = new Accessible();
    rslt.id = id;
    rslt.label = label;
    rslt.value = value;
    out.push(rslt);
  }
}
