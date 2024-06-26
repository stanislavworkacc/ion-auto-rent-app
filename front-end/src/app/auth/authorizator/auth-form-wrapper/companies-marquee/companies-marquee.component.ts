import {ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal} from '@angular/core';
import {NgForOf} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {IonIcon} from "@ionic/angular/standalone";

@Component({
  selector: 'companies-marquee',
  templateUrl: './companies-marquee.component.html',
  styleUrls: ['./companies-marquee.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    IonIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesMarqueeComponent  implements OnInit {

  public isPaused: WritableSignal<boolean> = signal(false);
  public companies: WritableSignal<any> = signal([]);

  toggleAnimation(): void {
    this.isPaused.update((isPaused: boolean) => !isPaused);
  }

  setCompanies(): void {
    this.companies.set([
      { name: 'Company A', icon: 'logo-apple' },
      { name: 'Company B', icon: 'logo-google' },
      { name: 'Company C', icon: 'logo-microsoft' },
      { name: 'Company D', icon: 'logo-facebook' },
      { name: 'Company E', icon: 'logo-twitter' },
      { name: 'Company F', icon: 'logo-amazon' }
    ])
  }
  ngOnInit(): void {
    this.setCompanies()
  }

}
