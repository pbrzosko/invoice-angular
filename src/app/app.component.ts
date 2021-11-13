import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(private t: TranslateService) {
    t.setDefaultLang('en');
    if (/^pl\b/.test(navigator.language)) {
      t.use('pl');
    } else {
      t.use('en');
    }
  }
}
