import {ChangeDetectionStrategy, Component, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {SwitcherComponent} from "../../../shared/ui-kit/components/switcher/switcher.component";

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  standalone: true,
  imports: [
    SwitcherComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyPolicyComponent  implements OnInit {

  @Input() privacyPolicyAgreement: WritableSignal<boolean> = signal(false);

  onToggleChange(isAgree): void {
    this.privacyPolicyAgreement.set(isAgree);
  }
  constructor() { }

  ngOnInit() {}

}
