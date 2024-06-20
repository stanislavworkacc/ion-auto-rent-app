import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private audio: HTMLAudioElement = new Audio();

  playSound(soundFile: string): void {
    this.audio.src = soundFile;
    this.audio.load();
    this.audio.play().catch(error => console.error("Audio play failed", error));
  }

  constructor() {}
}
