import {Component, OnInit, ViewChild} from "@angular/core";
import {CompanyService} from "../company.service";
import {ContextMenuComponent} from "../../dock/context-menu/context-menu.component";
import {Company} from "../../db/company.model";

@Component({
  selector: 'invoice-company-list',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {

  @ViewChild(ContextMenuComponent) contextMenu!: ContextMenuComponent;
  companies: Company[] = [];

  constructor(private companyService: CompanyService) {
  }

  async ngOnInit() {
    this.companies = await this.companyService.list();
  }

  async delete(company: Company) {
    await this.companyService.delete(company.id);
    await this.ngOnInit();
  }
}
