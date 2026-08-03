import {Component, OnInit} from '@angular/core';
import {NotaFiscalService} from '../../services/nota-fiscal-service';
import {DxDataGridModule} from 'devextreme-angular';
import {NotaFiscal} from '../../interfaces/nota-fiscal';

@Component({
  selector: 'app-nota',
  standalone: true,
  imports: [DxDataGridModule],
  templateUrl: './nota.html',
  styleUrl: './nota.scss',
})
export class Nota  implements OnInit {

  constructor(private notaFiscalService: NotaFiscalService){}

  notas: NotaFiscal[] = [];

  ngOnInit() {

  }
}
