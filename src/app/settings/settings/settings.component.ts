import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../settings.service";
import {Location} from "@angular/common";
import {Company} from "../../db/company.model";

@Component({
  selector: 'invoice-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  settings: Company | undefined;

  constructor(
    private location: Location,
    private settingsService: SettingsService) {
  }

  async ngOnInit() {
    this.settings = await this.settingsService.getSettings();
  }

  async save(settings: Company) {
    await this.settingsService.saveSettings(settings);
    this.location.back();
  }
}
