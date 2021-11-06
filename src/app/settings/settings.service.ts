import { Injectable } from "@angular/core";
import {Company} from "../db/company.model";
import {DatabaseService} from "../db/database.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private databaseService: DatabaseService) {
  }

  async saveSettings(settings: Company) {
    settings.id = 1;
    await this.databaseService.settings.put(settings);
  }

  async getSettings() {
    return this.databaseService.settings.get(1);
  }
}
