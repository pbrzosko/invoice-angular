import {Company} from "../company/company.model";
import {Item} from "../item/item.model";

export interface Invoice {
  month: number,
  year: number,
  id: number,
  issueDate: string,
  invoiceDate: string,
  seller: Company,
  buyer: Company,
  items: InvoiceItem[]
}

export interface InvoiceItem {
  item: Item,
  qty: number
}

export interface TotalItem {
  label: string,
  net: number,
  rate: string,
  tax: number,
  gross: number
}
