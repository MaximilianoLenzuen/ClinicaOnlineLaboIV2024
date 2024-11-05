import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfDownloadService {

  constructor() { }

  downloadPDF(content: string, title: string): void {
    const doc = new jsPDF();
    
    // Configurar el contenido del PDF
    const logo = 'favicon.png'; // Ruta a la imagen del logo
    const today = new Date().toLocaleDateString();

    // Añadir el logo
    const img = new Image();
    img.src = logo;
    doc.addImage(img, 'PNG', 10, 10, 40, 40);

    // Agregar título e información
    doc.setFontSize(18);
    doc.text('Informe de Historia Clínica', 60, 20);
    doc.setFontSize(12);
    doc.text(`Fecha de emisión: ${today}`, 60, 30);

    // Agregar el contenido dinámico (historia clínica)
    doc.setFontSize(12);
    doc.text(content, 10, 60);

    // Descargar el PDF
    doc.save(`${title}.pdf`);
  }
}
