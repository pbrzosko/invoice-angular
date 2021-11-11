import {Component, Input} from "@angular/core";

@Component({
  selector: 'invoice-invoice-form-spacing',
  template: `
    <div gdColumn="1 / span 11" [gdRow]="row" [style]="styles"></div>
  `
})
export class InvoiceFormSpacingComponent {

  @Input() row!: number;
  @Input() size: number = 1;

  get styles() {
    return {padding: `${this.size}em`}
  }
}
