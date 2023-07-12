import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  @ViewChild('content', { static: false }) el!: ElementRef

  generatePDF() {
    let pdf = new jsPDF('p', 'pt', 'a4')
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('customer.pdf')
      }
    });
  }

}
