import {Injectable} from "@angular/core";
import {jsPDF} from "jspdf";
import autoTable, {CellHookData, RowInput} from "jspdf-autotable";
import {InvoiceCalculateService} from "./invoice-calculate.service";
import {Invoice, InvoiceItem} from "../db/invoice.model";
import {Company} from "../db/company.model";

const MARGIN = 14;
const FONT_SIZE = 8;
const BIG_FONT_SIZE = 14;

@Injectable({
  providedIn: 'root'
})
export class InvoicePdfService {

  constructor(private invoiceCalculateService: InvoiceCalculateService) {
  }

  saveInvoice(invoice: Invoice) {
    const doc = new jsPDF();
    doc.setFontSize(FONT_SIZE);

    this.drawValue(doc, 'Document type', 'Faktura VAT', 10, 20, true);
    this.drawValue(doc, 'Issue date', invoice.issueDate, 16, 20);
    this.drawValue(doc, 'Number', `${invoice.id}/${invoice.month}/${invoice.year}`, 10, 35, true);
    this.drawValue(doc, 'Invoice date', invoice.invoiceDate, 16, 35);

    this.drawCompany(doc, invoice.seller, 'Seller', 0, 55);
    this.drawCompany(doc, invoice.buyer, 'Buyer', 10, 55);

    this.drawItems(doc, invoice.items, 80);
    this.drawTotals(doc, invoice.items, (doc as any).lastAutoTable.finalY + 8, 10);

    doc.save(`${invoice.id}/${invoice.month}/${invoice.year}.pdf`);
  }

  drawTotals(doc: jsPDF, items:InvoiceItem[], y:number, col: number) {
    const totals = this.invoiceCalculateService.calculateTotals(items).map(total => {
      return {
        label: total.label,
        net: total.net.toFixed(2),
        rate: total.rate,
        tax: total.tax.toFixed(2),
        gross: total.gross.toFixed(2)
      };
    });
    autoTable(doc, {
      margin: { left: this.columnX(doc, 10) },
      startY: y,
      headStyles: { fillColor: '#03a9f4'},
      columnStyles: {
        label: { cellWidth: this.columnWidth(doc, 2)},
        net: { cellWidth: this.columnWidth(doc, 2)},
        rate: { cellWidth: this.columnWidth(doc, 2)},
        tax: { cellWidth: this.columnWidth(doc, 2)},
        gross: { cellWidth: this.columnWidth(doc, 2)}
      },
      body: totals,
      columns: [
        { header: '', dataKey: 'label' },
        { header: 'Net', dataKey: 'net' },
        { header: 'Rate', dataKey: 'rate' },
        { header: 'Tax', dataKey: 'tax' },
        { header: 'Gross', dataKey: 'gross' }
      ],
      didParseCell: (data) => {
        if (data.row.section === 'body' && data.row.index === 0) {
          data.cell.styles.fontStyle = "bold";
        }
        this.parseCellHook(data);
      }
    })
  }

  drawItems(doc: jsPDF, items:InvoiceItem[], y:number) {
    const data = items.map((item, index) => {
      const net = item.item.price * item.qty;
      const tax = net * item.item.tax / 100;
      return {
        idx: (index + 1) + '.',
        item: item.item.name,
        qty: item.qty,
        price: item.item.price.toFixed(2),
        net: net.toFixed(2),
        rate: item.item.tax.toFixed(2),
        tax: tax.toFixed(2),
        gross: (net + tax).toFixed(2)
      };
    });
    autoTable(doc, {
      startY: y,
      headStyles: { fillColor: '#03a9f4'},
      columnStyles: {
        idx: { cellWidth: this.columnWidth(doc, 1)},
        item: { cellWidth: this.columnWidth(doc, 7)},
        qty: { cellWidth: this.columnWidth(doc, 2)},
        price: { cellWidth: this.columnWidth(doc, 2)},
        net: { cellWidth: this.columnWidth(doc, 2)},
        rate: { cellWidth: this.columnWidth(doc, 2)},
        tax: { cellWidth: this.columnWidth(doc, 2)},
        gross: { cellWidth: this.columnWidth(doc, 2)}
      },
      body: data,
      columns: [
        { header: 'Idx', dataKey: 'idx' },
        { header: 'Item or service', dataKey: 'item' },
        { header: 'Qty', dataKey: 'qty' },
        { header: 'Price', dataKey: 'price' },
        { header: 'Net', dataKey: 'net' },
        { header: 'Rate', dataKey: 'rate' },
        { header: 'Tax', dataKey: 'tax' },
        { header: 'Gross', dataKey: 'gross' }
      ],
      didParseCell: this.parseCellHook
    })
  }

  parseCellHook(data: CellHookData) {
    if (data.column.dataKey !== 'idx' && data.column.dataKey !== 'item') {
      data.cell.styles.halign = 'right';
    }
    data.cell.styles.valign = 'middle';
    data.cell.styles.fontSize = 8;
  }

  drawCompany(doc: jsPDF, company:Company, label: string, col: number, y:number) {
    this.drawMultiline(doc, [
      company.name,
      company.street,
      company.zip + ' ' + company.city,
      'NIP: ' + company.tin
    ], label, col, y);
  }

  drawMultiline(doc: jsPDF, lines:string[], label: string, col: number, y:number) {
    let cordy = y;
    doc.setFont("helvetica", "bold");
    doc.text(label + ":", this.columnX(doc, col), cordy);
    doc.setFont("helvetica", "normal");
    cordy += doc.getTextDimensions(label).h + 1;
    lines.forEach((line, index) => {
      doc.text(line, this.columnX(doc, col), cordy);
      cordy += doc.getTextDimensions(line).h + 1;
    });
  }

  drawValue(doc: jsPDF, label: string, value: string, col: number, y: number, bold: boolean = false) {
    doc.text(label + ':', this.columnX(doc, col), y);
    if (bold) {
      doc.setFont("helvetica", "bold")
    }
    doc.setFontSize(BIG_FONT_SIZE);
    doc.text(value, this.columnX(doc, col), y + 6);
    doc.setFontSize(FONT_SIZE);
    doc.setFont("helvetica", "normal");
  }

  columnX(doc: jsPDF, col: number) {
    return MARGIN + (col * (doc.internal.pageSize.width - 2 * MARGIN) / 20);
  }

  columnWidth(doc: jsPDF, width: number) {
    return width * (doc.internal.pageSize.width - 2 * MARGIN) / 20;
  }
}
