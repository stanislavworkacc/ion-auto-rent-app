import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  Renderer2,
  signal, ViewChild,
  WritableSignal
} from '@angular/core';
import {IonIcon, IonInput, IonLabel} from "@ionic/angular/standalone";
import {ValidateInputDirective} from "../../../directives/validate-input.directive";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GooglePlacesSerivce} from "../../../services/google-places.serivce";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {filter} from "rxjs/operators";
import {GooglePlacesComponent} from "../../google-places/google-places.component";

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonIcon,
    IonInput,
    ValidateInputDirective,
    ReactiveFormsModule,
    GooglePlacesComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressInfoComponent  implements OnInit, AfterViewInit {

  private fb: FormBuilder = inject(FormBuilder);
  private googlePlacesService: GooglePlacesSerivce = inject(GooglePlacesSerivce);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private renderer: Renderer2 = inject(Renderer2);

  public form!: FormGroup;
  public address!: FormControl;
  public isFocused: { [key: string]: boolean } = { address: false };

  suggestions: WritableSignal<string[]> = signal([]);

  @ViewChild('addressInput', { static: false }) addressInput!: IonInput;

  onFocus(field: string): void {
    this.isFocused[field] = true;
  }

  onBlur(field: string): void {
    this.isFocused[field] = false;
  }
  assignFormControls(): void {
    this.address = this.form.get('address') as FormControl;
  }

  initForm(): void {
    this.form = this.fb.group({
      address: [''],
    });

    this.assignFormControls();
  }

  initGooglePlaces(): void {
    this.googlePlacesService.googlePlacesLoaded$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((loaded: boolean) => loaded),
      )
      .subscribe();

    this.googlePlacesService.loadGoogleSSOScript(this.renderer).subscribe();
  }

  fetchSuggestions(query: any): void {
    //@ts-ignore
    const autocompleteService = new google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions({ input: query }, (predictions, status) => {
      //@ts-ignore
      if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
        this.suggestions.set(predictions.map(prediction => prediction.description));
      }
    });
  }

  selectSuggestion(suggestion: string): void {
    this.address.setValue(suggestion);
    this.suggestions.set([]);
  }


  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.initGooglePlaces();
  }

}
