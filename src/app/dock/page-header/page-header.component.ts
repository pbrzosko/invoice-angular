import {Component, Input} from "@angular/core";

@Component({
  selector: 'invoice-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.sass']
})
export class PageHeaderComponent {
  @Input() title: string | undefined;
  @Input() hint: string | undefined;
  @Input() list: boolean = false;

  get styles() {
    if (this.list) {
      return {margin: '2rem'};
    } else {
      return {'margin-bottom': '2rem'}
    }
  }
}
