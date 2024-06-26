import {ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal} from '@angular/core';
import {NgForOf} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {IonButton, IonIcon, IonModal} from "@ionic/angular/standalone";

@Component({
  selector: 'companies-marquee',
  templateUrl: './companies-marquee.component.html',
  styleUrls: ['./companies-marquee.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    IonIcon,
    IonModal,
    IonButton
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesMarqueeComponent  implements OnInit {

  public isPaused: WritableSignal<boolean> = signal(false);
  public companies: WritableSignal<{ name: string, icon: string, description: string }[]> = signal([]);
  public selectedCompany: WritableSignal<{ name: string, icon: string, description: string } | null> = signal(null);
  public isModalOpen: WritableSignal<boolean> = signal(false);

  toggleAnimation(): void {
    this.isPaused.update((isPaused: boolean) => !isPaused);
  }

  showCompanyDetails(company: { name: string, icon: string, description: string }): void {
    this.toggleAnimation();
    this.selectedCompany.set(company);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedCompany.set(null);
    this.toggleAnimation()
  }

  setCompanies(): void {
    this.companies.set([
      { name: 'Company A', icon: 'logo-apple', description: 'Apple Inc. is an American multinational technology company.' },
      { name: 'Company B', icon: 'logo-google', description: 'Google LLC is an American multinational technology company.' },
      { name: 'Company C', icon: 'logo-microsoft', description: 'Microsoft Corporation is an American multinational technology company.' },
      { name: 'Company D', icon: 'logo-facebook', description: 'Facebook is an American online social media and social networking service.' },
      { name: 'Company E', icon: 'logo-twitter', description: 'Twitter is an American microblogging and social networking service.' },
      { name: 'Company F', icon: 'logo-amazon', description: 'Amazon.com, Inc. is an American multinational technology company.' }
    ]);
  }
  ngOnInit(): void {
    this.setCompanies()
  }

}
