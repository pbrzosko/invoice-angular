import { Injectable } from "@angular/core";
import {DatabaseService} from "../db/database.service";
import {Company} from "../db/company.model";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private db: DatabaseService) {
  }

  async add(company: Company) {
    await this.db.companies.add(company);
  }

  async update(company: Company) {
    await this.db.companies.update(company.id, company);
  }

  async list() {
    return this.db.companies.toArray();
  }

  async get(id: number) {
     return this.db.companies.get(id);
  }

  async delete(id: number) {
    await this.db.companies.delete(id);
  }
}
