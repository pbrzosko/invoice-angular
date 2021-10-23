import { Injectable } from "@angular/core";
import { Company } from "../company/company.model";

const SETTINGS_KEY:string = 'invoice_settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  async saveSettings(settings: Company) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    return Promise.resolve();
  }

  getSettings() {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return Promise.resolve(saved ? JSON.parse(saved) : null);
  }
}
