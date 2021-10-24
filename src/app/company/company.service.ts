import { Injectable } from "@angular/core";
import {Company} from "./company.model";

const COMPANIES_KEY:string = 'invoice_companies';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  async add(company: Company) {
    const companies:Company[] = await this.list();
    company.id = companies.length + 1;
    companies.push(company);
    localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
    return Promise.resolve();
  }

  async list() {
    const saved = localStorage.getItem(COMPANIES_KEY);
    const companies:Company[] = saved ? JSON.parse(saved) : [];
    return Promise.resolve(companies);
  }

  async get(id: number) {
    const companies:Company[] = await this.list();
    return companies.find(company => company.id === id);
  }

  async delete(id: number) {
    let companies:Company[] = await this.list();
    companies = companies.filter(company => company.id !== id);
    localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
    return Promise.resolve();
  }
}
