import {Company} from "../company/company.model";
import {Item} from "../item/item.model";

export interface Invoice {
  month: number,
  year: number,
  id: number,
  issueDate: Date,
  paymentDate: Date,
  seller: Company,
  buyer: Company,
  items: Item[]
}
