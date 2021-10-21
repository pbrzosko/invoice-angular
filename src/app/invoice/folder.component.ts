import {Component, Input} from "@angular/core";

@Component({
  selector: 'invoice-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.sass']
})
export class FolderComponent {
  @Input() year: Number | undefined;
}
