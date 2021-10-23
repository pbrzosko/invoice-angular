import { Injectable } from "@angular/core";
import {Company} from "./company.model";

const COMPANY_KEY:string = 'invoice_company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  async save(company: Company) {
    localStorage.setItem(COMPANY_KEY, JSON.stringify(company));
    return Promise.resolve();
  }

  getCompany() {
    const saved = localStorage.getItem(COMPANY_KEY);
    return Promise.resolve(saved ? JSON.parse(saved) : null);
  }
}
