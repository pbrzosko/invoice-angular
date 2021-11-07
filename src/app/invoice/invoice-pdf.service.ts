import {Injectable} from "@angular/core";
import {jsPDF} from "jspdf";
import {InvoiceCalculateService} from "./invoice-calculate.service";
import {Invoice, InvoiceItem} from "../db/invoice.model";
import {Company} from "../db/company.model";
import {CurrencyToWordsPipe} from "./currency-to-words.pipe";
import {CurrencyPipe} from "@angular/common";

const MARGIN = 14;
const FONT_SIZE = 14;
const MEDIUM_FONT_SIZE = 10;
const SMALL_FONT_SIZE = 8;

interface Cell {
  label?: string,
  value: string | null,
  alignment: 'left' | 'right',
  col: number,
  span: number
}

@Injectable({
  providedIn: 'root'
})
export class InvoicePdfService {

  constructor(private invoiceCalculateService: InvoiceCalculateService,
              private currencyToWordsPipe: CurrencyToWordsPipe,
              private currencyPipe: CurrencyPipe) {
  }

  saveInvoice(invoice: Invoice) {
    const doc = new jsPDF();
    doc.setFontSize(FONT_SIZE);

    this.drawValue(doc, 'Document type', 'Faktura VAT', 10, 20);
    this.drawValue(doc, 'Issue date', invoice.issueDate, 16, 20);
    this.drawValue(doc, 'Number', `${invoice.id}/${invoice.month}/${invoice.year}`, 10, 35);
    this.drawValue(doc, 'Invoice date', invoice.invoiceDate, 16, 35);

    this.drawCompany(doc, invoice.seller, 'Seller', 0, 55);
    this.drawCompany(doc, invoice.buyer, 'Buyer', 10, 55);

    let y = this.drawItems(doc, invoice.items, 80);

    this.drawTotals(doc, invoice.items, y + 10);

    // this.drawValue(doc, 'Payment date', invoice.paymentDate, 0, itemsY);
    // this.drawValue(doc, 'Payment type', 'Money transfer', 0, itemsY + 15);
    // this.drawValue(doc, 'Account number', invoice.seller.accountNumber, 0, itemsY + 30);

    doc.save(`${invoice.seller.name}_${invoice.id}/${invoice.month}/${invoice.year}.pdf`);
  }

  getMaxHeight(doc: jsPDF, cells: Cell[]) {
    return cells.reduce((accumulator, cell) => {
      if (cell.value) {
        const size = doc.getTextDimensions(cell.value);
        if (size.h >= accumulator) {
          return size.h;
        } else {
          return accumulator;
        }
      } else {
        return accumulator;
      }
    }, 0);
  }

  drawTableLine(doc: jsPDF, cells: Cell[], y: number, fillColor: string, drawColor: string, textColor: string, col: number = 0) {
    const h = this.getMaxHeight(doc, cells);
    const padding = h / 4;
    const height = h + 2 * padding;
    doc.setFillColor(fillColor);
    doc.setDrawColor(drawColor);
    // TODO: figure out col from lowest col from cells and max from col and span
    doc.rect(this.columnX(doc, col), y, this.columnWidth(doc, 20 - col), height, 'DF');
    cells.forEach(cell => {
      if (cell.value) {
        const x = this.columnX(doc, cell.col);
        const w = this.columnWidth(doc, cell.span);
        const finalx = cell.alignment === 'left' ? x + padding : x + w - padding;
        doc.setTextColor(textColor);
        doc.setFontSize(MEDIUM_FONT_SIZE);
        doc.text(cell.value, finalx, y + padding + h / 2, {baseline: 'middle', align: cell.alignment});
        doc.setFontSize(FONT_SIZE);
      }
    });
    return y + height;
  }

  drawTotals(doc: jsPDF, items:InvoiceItem[], y:number) {
    let cy = y;
    cy = this.drawTableLine(doc, [
      {value: null, alignment: 'right', col: 10, span: 2},
      {value: 'Net', alignment: 'right', col: 12, span: 2},
      {value: 'Rate', alignment: 'right', col: 14, span: 2},
      {value: 'Tax', alignment: 'right', col: 16, span: 2},
      {value: 'Gross', alignment: 'right', col: 18, span: 2},
    ], cy, '#03a9f4', '#e0e0e0', 'white', 10);
    const totals = this.invoiceCalculateService.calculateTotals(items);
    totals.forEach(total => {
      cy = this.drawTableLine(doc, [
        {value: total.label, alignment: 'right', col: 10, span: 2},
        {value: total.net.toFixed(2), alignment: 'right', col: 12, span: 2},
        {value: total.rate, alignment: 'right', col: 14, span: 2},
        {value: total.tax.toFixed(2), alignment: 'right', col: 16, span: 2},
        {value: total.gross.toFixed(2), alignment: 'right', col: 18, span: 2},
      ], cy, 'white', '#e0e0e0', 'black', 10);
    });
    cy = this.drawTableLine(doc, [
      {value: this.currencyPipe.transform(totals[0].gross), alignment: 'right', col: 10, span: 10}
    ], cy, 'white', '#e0e0e0', 'black', 10);
    cy = this.drawTableLine(doc, [
      {value: this.currencyToWordsPipe.transform(totals[0].gross), alignment: 'right', col: 10, span: 10}
    ], cy, 'white', '#e0e0e0', 'black', 10);
    return cy;
  }

  drawItems(doc: jsPDF, items:InvoiceItem[], y:number) {
    let cy = y;
    cy = this.drawTableLine(doc, [
      {value: 'Idx', alignment: 'left', col: 0, span: 1},
      {value: 'Item', alignment: 'left', col: 1, span: 7},
      {value: 'Qty', alignment: 'left', col: 8, span: 2},
      {value: 'Price', alignment: 'right', col: 10, span: 2},
      {value: 'Net', alignment: 'right', col: 12, span: 2},
      {value: 'Rate', alignment: 'right', col: 14, span: 2},
      {value: 'Tax', alignment: 'right', col: 16, span: 2},
      {value: 'Gross', alignment: 'right', col: 18, span: 2},
    ], cy, '#03a9f4', '#e0e0e0', 'white');
    items.map((item, index) => {
      const net = item.item.price * item.qty;
      const tax = net * item.item.tax / 100;
      cy = this.drawTableLine(doc, [
        {value: (index + 1) + '.', alignment: 'left', col: 0, span: 1},
        {value: item.item.name, alignment: 'left', col: 1, span: 7},
        {value: item.qty + '', alignment: 'left', col: 8, span: 2},
        {value: item.item.price.toFixed(2), alignment: 'right', col: 10, span: 2},
        {value: net.toFixed(2), alignment: 'right', col: 12, span: 2},
        {value: item.item.tax.toFixed(2), alignment: 'right', col: 14, span: 2},
        {value: tax.toFixed(2), alignment: 'right', col: 16, span: 2},
        {value: (net + tax).toFixed(2), alignment: 'right', col: 18, span: 2},
      ], cy, 'white', '#e0e0e0', 'black');
    });
    return cy;
  }

  drawCompany(doc: jsPDF, company:Company, label: string, col: number, y:number) {
    this.drawValue(doc, label, company.name, col, y);
    this.drawMultiline(doc, [
      company.street,
      company.zip + ' ' + company.city,
      'NIP: ' + company.tin
    ], col, y + 10);
  }

  drawMultiline(doc: jsPDF, lines:string[], col: number, y:number) {
    doc.setFontSize(MEDIUM_FONT_SIZE);
    let cordy = y;
    lines.forEach((line, index) => {
      doc.text(line, this.columnX(doc, col), cordy);
      cordy += doc.getTextDimensions(line).h + 1;
    });
    doc.setFontSize(FONT_SIZE);
  }

  drawValue(doc: jsPDF, label: string, value: string, col: number, y: number, bold: boolean = false) {
    doc.setFontSize(SMALL_FONT_SIZE);
    doc.setFont("helvetica", "bold")
    doc.setTextColor(0, 0, 0, 0.54);
    doc.text(label, this.columnX(doc, col), y);
    doc.setFontSize(FONT_SIZE);
    doc.setTextColor(1);
    if (!bold) {
      doc.setFont("helvetica", "normal")
    }
    doc.text(value, this.columnX(doc, col), y + 6);
  }

  columnX(doc: jsPDF, col: number) {
    return MARGIN + (col * (doc.internal.pageSize.width - 2 * MARGIN) / 20);
  }

  columnWidth(doc: jsPDF, width: number) {
    return width * (doc.internal.pageSize.width - 2 * MARGIN) / 20;
  }
}
