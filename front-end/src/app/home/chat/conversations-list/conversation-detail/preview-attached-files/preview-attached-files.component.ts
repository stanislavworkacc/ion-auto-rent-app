import {ChangeDetectionStrategy, Component, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {IonIcon, IonLabel, IonTitle} from "@ionic/angular/standalone";

@Component({
  selector: 'preview-attached-files',
  templateUrl: './preview-attached-files.component.html',
  styleUrls: ['./preview-attached-files.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonTitle,
    IonLabel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewAttachedFilesComponent  implements OnInit {

  @Input({ required: true }) attachedFiles: WritableSignal<File[]> = signal([])
  @Input({ required: true }) attachingFile: WritableSignal<boolean> = signal(false)
  constructor() { }

  ngOnInit() {}

}
