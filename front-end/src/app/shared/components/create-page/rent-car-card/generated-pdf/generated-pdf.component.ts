import {ChangeDetectionStrategy, Component, Input, OnInit, signal, WritableSignal} from '@angular/core';

@Component({
  selector: 'generated-pdf',
  templateUrl: './generated-pdf.component.html',
  styleUrls: ['./generated-pdf.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneratedPdfComponent  implements OnInit {

  @Input() generatingContract: WritableSignal<boolean> = signal(false)
  @Input() openPdf: () => void;
  constructor() { }

  ngOnInit() {}

}
