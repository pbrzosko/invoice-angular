import {TranslateLoader} from '@ngx-translate/core';
import * as translationsEN from './en.json';
import * as translationsPL from './pl.json';
import {Observable, of} from "rxjs";

export class JsonLoader implements TranslateLoader {

  translations:any = {
    en: translationsEN,
    pl: translationsPL
  }

  getTranslation(lang: string): Observable<any> {
    return of(this.translations[lang] as any);
  }
}
