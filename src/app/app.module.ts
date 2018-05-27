import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HighlightPipe } from './highlighter.pipe';
import { HighlightDirective } from './highlighter.directive';
import { AutoCompleteComponent } from './autocomplete/autocomplete.component';

@NgModule({
  declarations: [
    HighlightPipe, HighlightDirective, AppComponent, AutoCompleteComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
