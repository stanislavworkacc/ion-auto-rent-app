import {ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal} from '@angular/core';
import {NgForOf} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPopover
} from "@ionic/angular/standalone";

@Component({
  selector: 'companies-marquee',
  templateUrl: './companies-marquee.component.html',
  styleUrls: ['./companies-marquee.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    IonIcon,
    IonModal,
    IonButton,
    IonPopover,
    IonList,
    IonItem,
    IonLabel,
    IonContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesMarqueeComponent  implements OnInit {

  public isPaused: WritableSignal<boolean> = signal(false);
  public companies: WritableSignal<{ name: string, icon: string, description: string, listings: string[], rating: number }[]> = signal([]);
  public selectedCompany: WritableSignal<{ name: string, icon: string, description: string, listings: string[], rating: number } | null> = signal(null);

  public isPopoverOpen: WritableSignal<boolean> = signal(false);
  public popoverEvent: WritableSignal<Event | null> = signal(null)


  toggleAnimation(): void {
    this.isPaused.update((isPaused: boolean) => !isPaused);
  }

  showCompanyDetails(event: Event, company: { name: string, icon: string, description: string, listings: string[], rating: number }): void {
    this.toggleAnimation()
    this.popoverEvent.set(event);
    this.selectedCompany.set(company);
    this.isPopoverOpen.set(true);
  }


  closePopover(): void {
    this.isPopoverOpen.set(false);
    this.selectedCompany.set(null);
    this.toggleAnimation()
  }

  getStars(rating: number | undefined): string[] {
    if (!rating) return [];
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return [
      ...Array(fullStars).fill('star'),
      ...Array(halfStars).fill('star-half'),
      ...Array(emptyStars).fill('star-outline')
    ];
  }

  setCompanies(): void {
    this.companies.set([
      { name: 'Company A', icon: 'logo-apple', description: 'Apple Inc. is an American multinational technology company.', listings: ['Car 1', 'Car 2'], rating: 4.5 },
      { name: 'Company B', icon: 'logo-google', description: 'Google LLC is an American multinational technology company.', listings: ['Car 3', 'Car 4'], rating: 4 },
      { name: 'Company C', icon: 'logo-microsoft', description: 'Microsoft Corporation is an American multinational technology company.', listings: ['Car 5', 'Car 6'], rating: 4.8 },
      { name: 'Company D', icon: 'logo-facebook', description: 'Facebook is an American online social media and social networking service.', listings: ['Car 7', 'Car 8'], rating: 3.9 },
      { name: 'Company E', icon: 'logo-twitter', description: 'Twitter is an American microblogging and social networking service.', listings: ['Car 9', 'Car 10'], rating: 4.3 },
      { name: 'Company F', icon: 'logo-amazon', description: 'Amazon.com, Inc. is an American multinational technology company.', listings: ['Car 11', 'Car 12'], rating: 4.6 }
    ]);
  }
  ngOnInit(): void {
    this.setCompanies()
  }

}
