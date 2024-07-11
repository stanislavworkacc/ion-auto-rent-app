import {computed, inject, Injectable, signal, Signal, WritableSignal} from "@angular/core";
import {Http, HttpResponse} from '@capacitor-community/http';
import {ToasterService} from "../components/app-toast/toaster.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AutoRIAService {

  private toaster: ToasterService = inject(ToasterService);

  public baseUrl: WritableSignal<string> = signal(environment.autoRIAEntity);
  public routeParams: WritableSignal<any[]> = signal([]);
  public queryParams: WritableSignal<{ [key: string]: string }> = signal({ api_key: environment.AUTO_RIA_CLIENT_ID });

  private apiUrl: Signal<string> = computed((): string => {
    const query: string = Object.entries(this.queryParams()).map(([key, value]): string => `${key}=${value}`).join('&');
    const routePath: string = this.routeParams().join('/');
    return `${this.baseUrl()}/${routePath}?${query}`;
  });

  async getAuto(routeParams: any[], queryParams?: { [key: string]: any }): Promise<any> {
    try {
      this.routeParams.set(routeParams);
      this.queryParams.set({ ...this.queryParams(), ...queryParams });

      const response: HttpResponse = await Http.get({
        url: this.apiUrl()
      });

      if (response.data.error) {
        throw new Error(response.data.error.message);
      }

      return response.data;
    } catch (error) {

      this.toaster.show({ type: 'error', message: error})
      throw error;
    }
  }

  setRouteParams(params: string[]): void {
    this.routeParams.set(params);
  }

  setParams(params: { [key: string]: string }): void {
    this.queryParams.set(params);
  }
}
