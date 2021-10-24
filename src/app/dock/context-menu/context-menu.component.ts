import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'invoice-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.sass']
})
export class ContextMenuComponent {

  @Input() addLabel!: string;
  @Output() delete = new EventEmitter<any>();
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  menuPosition = { x: '0px', y: '0px' };

  openMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    event.stopPropagation();
    this.menuPosition.x = event.clientX + 'px';
    this.menuPosition.y = event.clientY + 'px';
    this.menuTrigger.menuData = {'item': item };
    this.menuTrigger.openMenu();
  }

  itemDeleted(item: any) {
    this.delete.emit(item);
  }
}
