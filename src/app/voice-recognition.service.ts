import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
  recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords!:string;

   // Observable to notify component of status changes
   public micStatus$ = new Subject<boolean>();
  constructor() { }

  init() {

    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e:any) => {
      const transcript = Array.from(e.results)
        .map((result:any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
    });


        // Stop recognition when no one is speaking
        this.recognition.onspeechend = () => {
          this.stop();
          this.micStatus$.next(false);  // Notify that the mic is off
          console.log('Speech ended. Stopping microphone.');
        };
    
        // Optionally, stop if no sound is detected
        this.recognition.onsoundend = () => {
          this.stop();
          this.micStatus$.next(false);  // Notify that the mic is off
          console.log('No sound detected. Stopping microphone.');
        };
  }


  

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    this.micStatus$.next(true);  // Notify that the mic is on
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', (condition:any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        this.micStatus$.next(false);  // Notify that the mic is off
        console.log("End speech recognition")
      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    this.micStatus$.next(false);  // Notify that the mic is off
    console.log("End speech recognition")
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }
}
