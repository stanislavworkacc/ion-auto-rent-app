import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TechnicalCharacteristicsComponent } from './technical-characteristics.component';

describe('TechnicalCharacteristicsComponent', () => {
  let component: TechnicalCharacteristicsComponent;
  let fixture: ComponentFixture<TechnicalCharacteristicsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalCharacteristicsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TechnicalCharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
