import {Company} from "../company/company.model";
import {Item} from "../item/item.model";

export interface Invoice {
  month: number,
  year: number,
  id: number,
  issueDate: Date,
  invoiceDate: Date,
  seller: Company,
  buyer: Company,
  items: InvoiceItem[]
}

export interface InvoiceItem {
  item: Item,
  qty: number
}
