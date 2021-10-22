import {Component, Input} from "@angular/core";

@Component({
  selector: 'invoice-dock-item',
  templateUrl: './dock-item.component.html',
  styleUrls: ['./dock-item.component.sass']
})
export class DockItemComponent {
  @Input() text: any | undefined;
  @Input() icon: String | undefined;
  @Input() link: String | undefined;
}
