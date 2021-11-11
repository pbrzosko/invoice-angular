import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialog} from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'invoice-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.sass']
})
export class ContextMenuComponent {

  @Input() addLabel!: string;
  @Input() deleteLabel!: string;
  @Input() addLink: string = 'add';
  @Output() delete = new EventEmitter<any>();
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  menuPosition = {x: '0px', y: '0px'};

  constructor(private dialog: MatDialog) {
  }

  openMenu(event: MouseEvent, item: any = null, description: string = '') {
    event.preventDefault();
    event.stopPropagation();
    this.menuPosition.x = event.clientX + 'px';
    this.menuPosition.y = event.clientY + 'px';
    this.menuTrigger.menuData = {'item': item, 'description': description};
    this.menuTrigger.openMenu();
  }

  openConfirmationDialog(item: any, description: string) {
    const confirm = this.dialog.open(ConfirmationDialog, {
      data: {
        item: item,
        description: description
      }
    });
    confirm.afterClosed().subscribe(result => {
      if (result) {
        this.delete.emit(result);
      }
    });
  }
}
