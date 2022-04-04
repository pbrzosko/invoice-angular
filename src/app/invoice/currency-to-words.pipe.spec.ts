import {CurrencyToWordsPipe} from "./currency-to-words.pipe";
import {TestBed} from "@angular/core/testing";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {JsonLoader} from "../locale/locale.loader";

describe('CurrencyToWordsPipeTest', () => {

  let pipe: CurrencyToWordsPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          defaultLanguage: 'pl',
          loader: {
            provide: TranslateLoader,
            useClass: JsonLoader
          }
        })
      ],
      providers: [
        CurrencyToWordsPipe
      ]
    });
    pipe = TestBed.inject(CurrencyToWordsPipe);
  })

  it('translates properly', () => {
    expect(pipe.transform(0)).toBe('zero złotych i zero groszy');
  });

  it('translates properly hundreds', () => {
    expect(pipe.transform(123.45)).toBe('sto dwadzieścia trzy złote i czterdzieści pięć groszy');
  });

  it('translates properly zero thousands', () => {
    expect(pipe.transform(1000125.01)).toBe('milion sto dwadzieścia pięć złotych i jeden grosz');
  });

  it('translates properly zero thousands and zero hundreds', () => {
    expect(pipe.transform(1000000.02)).toBe('milion złotych i dwa grosze');
  });
});
