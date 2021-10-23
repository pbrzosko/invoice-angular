import { Injectable } from "@angular/core";
import {Company} from "./company.model";

const COMPANIES_KEY:string = 'invoice_companies';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  async add(company: Company) {
    const companies:Company[] = await this.list();
    companies.push(company);
    localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
    return Promise.resolve();
  }

  async list() {
    const saved = localStorage.getItem(COMPANIES_KEY);
    const companies:Company[] = saved ? JSON.parse(saved) : [];
    return Promise.resolve(companies);
  }
}
