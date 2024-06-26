import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompaniesMarqueeComponent } from './companies-marquee.component';

describe('CompaniesMarqueeComponent', () => {
  let component: CompaniesMarqueeComponent;
  let fixture: ComponentFixture<CompaniesMarqueeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesMarqueeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompaniesMarqueeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
