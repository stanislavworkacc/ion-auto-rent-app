import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
