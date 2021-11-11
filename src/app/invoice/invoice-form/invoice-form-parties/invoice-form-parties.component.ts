import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Company} from "../../../db/company.model";
import {BehaviorSubject, Subject} from "rxjs";
import {Invoice} from "../../../db/invoice.model";
import {SettingsService} from "../../../settings/settings.service";
import {CompanyService} from "../../../company/company.service";
import {ObjectListenerComponent} from "../../../object-listener.component";

@Component({
  selector: 'invoice-invoice-form-parties',
  templateUrl: './invoice-form-parties.component.html',
  styleUrls: ['./invoice-form-parties.component.sass']
})
export class InvoiceFormPartiesComponent extends ObjectListenerComponent<Invoice> {

  @Input() invoiceForm!: FormGroup;
  @Input() readonly!: boolean | undefined;
  @Input() row!: number;
  seller!: Company | undefined;
  companies: Company[] = [];

  constructor(private settingsService: SettingsService,
              private companyService: CompanyService) {
    super();
  }

  async objectChanged(object: Invoice | null) {
    this.seller = await this.settingsService.getSettings();
    this.invoiceForm.get('seller')?.setValue(this.seller);
    this.companies = await this.companyService.list();
  }
}
