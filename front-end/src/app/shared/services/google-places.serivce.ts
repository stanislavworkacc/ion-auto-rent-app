import {Inject, Injectable, Renderer2} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {CrudService} from "../../../../libs/collection/src/lib/crud.service";

@Injectable({
  providedIn: 'root'
})
export class GooglePlacesSerivce {

  googlePlacesLoaded: boolean = false;
  googlePlacesLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  loadGoogleSSOScript(_renderer: Renderer2): Subject<any> {
    const scriptUrl: string = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDGcigfwXQWpARqV7RLVHaNAZV3--R0yWU&libraries=places&language=uk';
    const scriptTag: any = this._document.createElement('script');

    const responseSubject: Subject<any> = new Subject();

    scriptTag.type = 'text/javascript';
    scriptTag.async = true;
    scriptTag.id = 'google-sso';
    scriptTag.src = scriptUrl;
    scriptTag.onload = scriptTag['onreadystatechange'] = (): void => {
      // callback which work when script already rendered into DOM
      this.waitForInitGoogleSSO(responseSubject);
    };

    const existingScriptTag: HTMLScriptElement = this._document.getElementsByTagName('script')[0]; // get first <script> into DOM;
    _renderer.insertBefore(existingScriptTag.parentNode, scriptTag, existingScriptTag); // inserting before first existing <script>

    return responseSubject;
  }

  waitForInitGoogleSSO(responseSubject): void {
    if (!window['google']) {
      setTimeout((): void => {
        this.waitForInitGoogleSSO(responseSubject);
      }, 1)
    } else {
      responseSubject.next(true);
      this.googlePlacesLoaded = true;
      this.googlePlacesLoaded$.next(true);
    }
  }


  reloadSSOScript(_renderer: Renderer2) {
    this.googlePlacesLoaded = false;
    this.googlePlacesLoaded$.next(false);
    const existingScript = this._document.getElementById('google-sso');
    if (existingScript) {
      _renderer.removeChild(this._document, existingScript);
      // @ts-ignore
      google = null;
      // @ts-ignore
      window.google = undefined;
    }

    return this.loadGoogleSSOScript(_renderer);
  }

  constructor(@Inject(DOCUMENT) private _document: Document,
              private _crud: CrudService) {
  }
}
