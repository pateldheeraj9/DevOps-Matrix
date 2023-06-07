import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'data-export',
  templateUrl: './data-export.component.html',
  styleUrls: ['./data-export.component.css']
})
export class DataExportComponent {
  @Input() TableCaption = "";
  @Input() DivClass1 = "";
  @Input() DivClass2 = "";
  @Output() exportToCSV = new EventEmitter();
}
