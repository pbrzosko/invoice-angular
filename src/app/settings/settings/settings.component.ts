import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Component} from "@angular/core";
import {SettingsService} from "../settings.service";

@Component({
  selector: 'invoice-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {

  settingsForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    street: [null, [Validators.required]],
    zip: [null, [Validators.required]],
    city: [null, [Validators.required]],
    tin: [null, [Validators.required]],
  })

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private settingsService: SettingsService) {
  }

  async ngOnInit() {
    this.settingsForm.patchValue(await this.settingsService.getSettings());
  }

  async save() {
    if (this.settingsForm.valid) {
      await this.settingsService.saveSettings(this.settingsForm.value);
      await this.router.navigate(['']);
    }
  }
}
