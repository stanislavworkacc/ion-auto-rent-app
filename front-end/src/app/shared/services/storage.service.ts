import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setObject(key, value) {
    await Preferences.set({
      key,
      value: JSON.stringify(value)
    });
  }

  async getObject(key) {
    const ret = await Preferences.get({ key: key });
    return JSON.parse(ret.value);
  }
}
