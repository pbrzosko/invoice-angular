import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../settings.service";
import {Location} from "@angular/common";
import {Company} from "../../db/company.model";
import {Subject} from "rxjs";

@Component({
  selector: 'invoice-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  settings$ = new Subject<Company | undefined>();

  constructor(
    private location: Location,
    private settingsService: SettingsService) {
  }

  async ngOnInit() {
    const settings = await this.settingsService.getSettings();
    this.settings$.next(settings);
    this.settings$.complete();
  }

  async save(settings: Company) {
    await this.settingsService.saveSettings(settings);
    this.location.back();
  }
}
