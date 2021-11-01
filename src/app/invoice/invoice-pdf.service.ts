import {Injectable} from "@angular/core";
import {PageSizes, PDFDocument, PDFFont, PDFPage, StandardFonts} from "pdf-lib";
import {Invoice} from "./invoice.model";

interface PdfContext {
  width: number,
  height: number,
  column: number,
  row: number,
  font: number,
  big: number,
  bold: PDFFont
}

@Injectable({
  providedIn: 'root'
})
export class InvoicePdfService {

  async saveInvoice(invoice: Invoice) {
    const pdfDoc = await PDFDocument.create();
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const page = pdfDoc.addPage(PageSizes.A4);
    const ctx:PdfContext = {
      width: page.getSize().width,
      height: page.getSize().height,
      column: page.getSize().width / 16,
      row: page.getSize().height / 16,
      font: 8,
      big: 14,
      bold: boldFont
    }

    this.drawValue(page, ctx, 'Document type', 'Faktura VAT', 8, 1);
    this.drawValue(page, ctx, 'Issue date', invoice.issueDate, 12, 1);
    this.drawValue(page, ctx, 'Number', `${invoice.id}/${invoice.month}/${invoice.year}`, 8, 2);
    this.drawValue(page, ctx, 'Invoice date', invoice.invoiceDate, 12, 2);

    const bytes = await pdfDoc.save();
    return new Blob([bytes], {type: "application/pdf"})
  }

  drawValue(page: PDFPage, ctx:PdfContext, label: string, value: string, col: number, row: number) {
    page.drawText(label + ':', {x: col * ctx.column, y: ctx.height - row * ctx.row, size: ctx.font});
    page.drawText(value, { x: col * ctx.column, y: ctx.height - row * ctx.row - 18, size: ctx.big, font: ctx.bold});
  }
}
