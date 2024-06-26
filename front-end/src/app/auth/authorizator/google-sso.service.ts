import {Inject, Injectable, Renderer2} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {PostEntityModel} from "../../../../libs/collection/src/lib/models/post-entity.model";
import {DOCUMENT} from "@angular/common";
import {CrudService} from "../../../../libs/collection/src/lib/crud.service";

@Injectable({
  providedIn: 'root'
})
export class GoogleSsoService {

  googleSSOLoaded: boolean = false;
  googleSSOLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  googleSSORequest: PostEntityModel;

  loadGoogleSSOScript(_renderer: Renderer2): Subject<any> {
    const scriptUrl: string = 'https://accounts.google.com/gsi/client';
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
      this.googleSSOLoaded = true;
      this.googleSSOLoaded$.next(true);
    }
  }


  reloadSSOScript(_renderer: Renderer2) {
    this.googleSSOLoaded = false;
    this.googleSSOLoaded$.next(false);
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
    this.googleSSORequest = this._crud.createPostEntity({ name: 'sso-login/google' })
  }
}
