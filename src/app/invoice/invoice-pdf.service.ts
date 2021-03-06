import {Injectable} from '@angular/core';
import {jsPDF, TextOptionsLight} from 'jspdf';
import {InvoiceCalculateService} from './invoice-calculate.service';
import {Invoice, InvoiceItem} from '../db/invoice.model';
import {Company} from '../db/company.model';
import {CurrencyToWordsPipe} from './currency-to-words.pipe';
import {TranslateService} from "@ngx-translate/core";
import robotoNormal from '../fonts/roboto-normal';
import robotoBold from '../fonts/roboto-bold';
import {MaskPipe} from "ngx-mask";
import {CurrencyFormatPipe} from "./currency-format.pipe";
import {ZipFormatPipe} from "./zip-format.pipe";

const MARGIN = 14;
const MEDIUM_FONT_SIZE = 10;
const FONT_SIZE = 14;
const SMALL_FONT_SIZE = 8;
const PADDING = 2;
const HEADER_BACKGROUND = '#03a9f4';
const HEADER_COLOR = 'white';
const BORDER_COLOR = '#e0e0e0';
const ROW_BACKGROUND = 'white';
const ROW_COLOR = 'black';
const SPACER = 10;

interface Cell {
  value: string,
  label?: string,
  col: number,
  span: number,
  align?: 'left' | 'right',
  bold?: boolean,
  nowrap?: boolean,
  fontSize?: number,
  padding?: boolean
}

interface CellDrawing {
  values: string | string[],
  labels?: string | string[],
  x: number,
  y: number,
  ly?: number,
  h: number,
  fontSize: number,
  bold: boolean,
  baseline: 'alphabetic' | 'ideographic' | 'bottom' | 'top' | 'middle' | 'hanging' | undefined,
  align: 'left' | 'right' | 'center' | 'justify' | undefined,
}

const addRoboto = function (this:any) {
  this.addFileToVFS('roboto-normal.ttf', robotoNormal);
  this.addFont('roboto-normal.ttf', 'roboto', 'normal');
  this.addFileToVFS('roboto-bold.ttf', robotoBold);
  this.addFont('roboto-bold.ttf', 'roboto', 'bold');
};

@Injectable({
  providedIn: 'root'
})
export class InvoicePdfService {

  constructor(private invoiceCalculateService: InvoiceCalculateService,
              private currencyToWordsPipe: CurrencyToWordsPipe,
              private currencyPipe: CurrencyFormatPipe,
              private maskPipe: MaskPipe,
              private zipPipe: ZipFormatPipe,
              private t: TranslateService) {
    jsPDF.API.events.push(['addFonts', addRoboto]);
  }

  saveInvoice(invoice: Invoice) {
    const doc = new jsPDF();
    doc.setFontSize(FONT_SIZE);
    doc.setFont('roboto', 'normal');
    let y = 20;

    const documentType:Cell = {label: this.t.instant('invoice.document'), value: this.t.instant('invoice.taxInvoice'), col: 10, span: 4, bold: true};
    const issueDate:Cell = {label: this.t.instant('invoice.issueDate'), value: invoice.issueDate, col: 16, span: 4, align: 'right'};
    this.drawValue(doc, documentType, y);
    y += this.drawValue(doc, issueDate, y) + SPACER;


    const invoiceNumber:Cell = {label: this.t.instant('invoice.number'), value: `${invoice.id}/${invoice.month}/${invoice.year}`, col: 10, span: 4, bold: true};
    const invoiceDate:Cell = {label: this.t.instant('invoice.invoiceDate'), value: invoice.invoiceDate, col: 16, span: 4, align: 'right'};
    this.drawValue(doc, invoiceNumber, y);
    y += this.drawValue(doc, invoiceDate, y) + SPACER;

    this.drawCompany(doc, invoice.seller, this.t.instant('invoice.seller'), 0, 10, y);
    y += this.drawCompany(doc, invoice.buyer, this.t.instant('invoice.buyer'), 10, 10, y) + 10;

    y += this.drawItems(doc, invoice.items, y) + SPACER;

    this.drawTotals(doc, invoice.items, y);

    const paymentDate:Cell = {label: this.t.instant('invoice.paymentDate'), value: invoice.paymentDate, col: 0, span: 10};
    y += this.drawValue(doc, paymentDate, y);
    const paymentType:Cell = {label: this.t.instant('invoice.paymentType'), value: this.t.instant('invoice.moneyTransfer'), col: 0, span: 10};
    y += this.drawValue(doc, paymentType, y);
    const accountNumberMask = '00 0000 0000 0000 0000 0000 0000';
    const accountNumberValue = this.maskPipe.transform(invoice.seller.accountNumber, accountNumberMask);
    const accountNumber:Cell = {label: this.t.instant('invoice.accountNumber'), value: accountNumberValue, col: 0, span: 10, fontSize: MEDIUM_FONT_SIZE};
    this.drawValue(doc, accountNumber, y);

    const sy = doc.internal.pageSize.height - 22;
    this.drawSignature(doc, this.t.instant('invoice.seller'), 0, 4, sy);
    this.drawSignature(doc, this.t.instant('invoice.buyer'), 16, 4, sy);

    doc.save(`${invoice.seller.name}_${invoice.id}/${invoice.month}/${invoice.year}.pdf`);
  }

  drawSignature(doc: jsPDF, label: string, col: number, span: number, y: number) {
    doc.setFontSize(SMALL_FONT_SIZE);
    doc.setFont('roboto', 'bold')
    doc.setTextColor(0, 0, 0, 0.54);
    doc.text(label, this.columnX(doc,col + span / 2), y + 1, {
      align: 'center',
      baseline: 'top'
    });
    doc.line(this.columnX(doc, col), y, this.columnX(doc, col + span), y);
  }

  drawTotals(doc: jsPDF, items:InvoiceItem[], y:number) {
    let cy = y;
    cy += this.drawTableLine(doc, [
      {value: '', align: 'right', col: 10, span: 2, fontSize: MEDIUM_FONT_SIZE, bold: true},
      {value: this.t.instant('invoice.net'), align: 'right', col: 12, span: 2, fontSize: MEDIUM_FONT_SIZE, bold: true},
      {value: this.t.instant('invoice.rate'), align: 'right', col: 14, span: 2, fontSize: MEDIUM_FONT_SIZE, bold: true},
      {value: this.t.instant('invoice.tax'), align: 'right', col: 16, span: 2, fontSize: MEDIUM_FONT_SIZE, bold: true},
      {value: this.t.instant('invoice.gross'), align: 'right', col: 18, span: 2, fontSize: MEDIUM_FONT_SIZE, bold: true},
    ], cy, HEADER_BACKGROUND, HEADER_COLOR);
    const totals = this.invoiceCalculateService.calculateTotals(items);
    totals.forEach((total, index) => {
      const bold = index === 0;
      cy += this.drawTableLine(doc, [
        {value: total.label, align: 'right', col: 10, span: 2, bold: bold, fontSize: SMALL_FONT_SIZE},
        {value: this.currencyPipe.transform(total.net), align: 'right', col: 12, span: 2, nowrap: true, bold: bold, fontSize: SMALL_FONT_SIZE},
        {value: total.rate, align: 'right', col: 14, span: 2, nowrap: true, bold: bold, fontSize: SMALL_FONT_SIZE},
        {value: this.currencyPipe.transform(total.tax), align: 'right', col: 16, span: 2, nowrap: true, bold: bold, fontSize: SMALL_FONT_SIZE},
        {value: this.currencyPipe.transform(total.gross), align: 'right', col: 18, span: 2, nowrap: true, bold: bold, fontSize: SMALL_FONT_SIZE},
      ], cy, ROW_BACKGROUND, ROW_COLOR);
    });
    const total = this.currencyPipe.transform(totals[0].gross, true);
    cy += this.drawTableLine(doc, [
      {label: this.t.instant('invoice.total'), value: total, align: 'right', col: 10, span: 10, nowrap: true, bold: true}
    ], cy, ROW_BACKGROUND, ROW_COLOR);
    cy += this.drawTableLine(doc, [
      {label: this.t.instant('invoice.totalWords'), value: this.currencyToWordsPipe.transform(totals[0].gross), align: 'right', col: 10, span: 10, fontSize: MEDIUM_FONT_SIZE}
    ], cy, ROW_BACKGROUND, ROW_COLOR);
    return cy - y;
  }

  drawItems(doc: jsPDF, items:InvoiceItem[], y:number) {
    let cy = y;
    cy += this.drawTableLine(doc, [
      {value: this.t.instant('invoice.idx'), align: 'left', col: 0, span: 1, fontSize: MEDIUM_FONT_SIZE, bold: true},
      {value: this.t.instant('invoice.item'), align: 'left', col: 1, span: 7, fontSize: MEDIUM_FONT_SIZE, bold: true},
      {value: this.t.instant('invoice.qty'), align: 'left', col: 8, span: 2, fontSize: MEDIUM_FONT_SIZE, bold: true},
      {value: this.t.instant('invoice.price'), align: 'right', col: 10, span: 2, fontSize: MEDIUM_FONT_SIZE, bold: true},
      {value: this.t.instant('invoice.net'), align: 'right', col: 12, span: 2, fontSize: MEDIUM_FONT_SIZE, bold: true},
      {value: this.t.instant('invoice.rate'), align: 'right', col: 14, span: 2, fontSize: MEDIUM_FONT_SIZE, bold: true},
      {value: this.t.instant('invoice.tax'), align: 'right', col: 16, span: 2, fontSize: MEDIUM_FONT_SIZE, bold: true},
      {value: this.t.instant('invoice.gross'), align: 'right', col: 18, span: 2, fontSize: MEDIUM_FONT_SIZE, bold: true},
    ], cy, HEADER_BACKGROUND, HEADER_COLOR);
    items.map((item, index) => {
      const net = item.item.price * item.qty;
      const tax = net * item.item.tax / 100;
      cy += this.drawTableLine(doc, [
        {value: (index + 1) + '.', align: 'left', col: 0, span: 1, nowrap: true, fontSize: SMALL_FONT_SIZE},
        {value: item.item.name, align: 'left', col: 1, span: 7, fontSize: SMALL_FONT_SIZE},
        {value: item.qty + ' ' + item.item.unit, align: 'left', col: 8, span: 2, nowrap: true, fontSize: SMALL_FONT_SIZE},
        {value: this.currencyPipe.transform(item.item.price), align: 'right', col: 10, span: 2, nowrap: true, fontSize: SMALL_FONT_SIZE},
        {value: this.currencyPipe.transform(net), align: 'right', col: 12, span: 2, nowrap: true, fontSize: SMALL_FONT_SIZE},
        {value: this.currencyPipe.transform(item.item.tax), align: 'right', col: 14, span: 2, nowrap: true, fontSize: SMALL_FONT_SIZE},
        {value: this.currencyPipe.transform(tax), align: 'right', col: 16, span: 2, nowrap: true, fontSize: SMALL_FONT_SIZE},
        {value: this.currencyPipe.transform(net + tax), align: 'right', col: 18, span: 2, nowrap: true, fontSize: SMALL_FONT_SIZE},
      ], cy, ROW_BACKGROUND, ROW_COLOR);
    });
    return cy - y;
  }

  drawCompany(doc: jsPDF, company:Company, label: string, col: number, span: number, y:number) {
    const h = this.drawValue(doc, {
      label: label,
      value: company.name,
      col: col,
      span: span,
    }, y);
    const hm = this.drawMultiline(doc, [
      company.street,
      this.zipPipe.transform(company.zip) + ' ' + company.city,
      this.t.instant('company.tins') + company.tin
    ], col, span, y + h);
    return hm + h;
  }

  drawMultiline(doc: jsPDF, lines:string[], col: number, span: number, y:number, fontSize: number = MEDIUM_FONT_SIZE) {
    const w = this.columnWidth(doc, span) - PADDING;
    doc.setFontSize(fontSize);
    let height = 0;
    lines.forEach(line => {
      const lines = doc.splitTextToSize(line, w);
      doc.text(lines, this.columnX(doc, col), y + height, {baseline: 'top'});
      height += doc.getTextDimensions(lines).h + 1;
    });
    return height;
  }

  drawTableLine(doc: jsPDF, cells: Cell[], y: number, fillColor: string, textColor: string) {
    cells.forEach(cell => cell.padding = true);
    const height = this.drawRowRect(doc, cells, y, fillColor);
    cells.forEach(cell => {
      this.drawValue(doc, cell, y, textColor);
    });
    return height;
  }

  drawRowRect(doc: jsPDF, cells: Cell[], y: number, color: string) {
    const first = Math.min(...cells.map(cell => cell.col));
    const last = Math.max(...cells.map(cell => cell.col + cell.span));
    const height = Math.max(...cells.map(cell => this.cellDrawing(doc, cell, y).h));
    doc.setFillColor(color);
    doc.setDrawColor(BORDER_COLOR);
    doc.rect(this.columnX(doc, first), y, this.columnWidth(doc, last - first), height,'DF');
    return height;
  }

  drawValue(doc: jsPDF, cell: Cell, y: number, color: string = ROW_COLOR) {
    const drawing = this.cellDrawing(doc, cell, y);
    const options: TextOptionsLight = {baseline: drawing.baseline, align: drawing.align};
    if (drawing.labels) {
      doc.setFontSize(SMALL_FONT_SIZE);
      doc.setFont('roboto', 'bold')
      doc.setTextColor(0, 0, 0, 0.54);
      doc.text(drawing.labels, drawing.x, drawing.ly || drawing.y, options);
    }
    doc.setFontSize(drawing.fontSize);
    doc.setTextColor(color);
    doc.setFont('roboto', drawing.bold ? 'bold' : 'normal')
    doc.text(drawing.values, drawing.x, drawing.y, options);
    doc.setFont('roboto', 'normal')
    return drawing.h;
  }

  cellDrawing(doc: jsPDF, cell: Cell, y: number, height?: number): CellDrawing {
    const px = cell.padding ? PADDING : 0;
    const w = this.columnWidth(doc, cell.span) - PADDING - px;
    const fontSize = cell.fontSize || FONT_SIZE;
    doc.setFontSize(fontSize);
    const values = doc.splitTextToSize(cell.value, w);
    let valuesHeight = doc.getTextDimensions(values).h;
    let labels = null;
    let labelsHeight = 0;
    let separation = 0;
    if (cell.label) {
      doc.setFontSize(SMALL_FONT_SIZE);
      labels = doc.splitTextToSize(cell.label, w);
      labelsHeight = doc.getTextDimensions(labels).h;
      separation = PADDING;
    }
    return {
      values: values,
      labels: labels,
      x: cell.align === 'right' ? this.columnX(doc, cell.col + cell.span) - px : this.columnX(doc, cell.col) + px,
      y: cell.label ? y + PADDING + labelsHeight + separation : y + PADDING,
      ly: cell.label ? y + PADDING : undefined,
      h: valuesHeight + labelsHeight + 2 * PADDING + separation,
      fontSize: fontSize,
      bold: cell.bold || false,
      align: cell.align || 'left',
      baseline: 'top'
    }
  }

  columnX(doc: jsPDF, col: number) {
    return MARGIN + (col * (doc.internal.pageSize.width - 2 * MARGIN) / 20);
  }

  columnWidth(doc: jsPDF, width: number) {
    return width * (doc.internal.pageSize.width - 2 * MARGIN) / 20;
  }
}
