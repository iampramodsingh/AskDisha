import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import statesData from '../../assets/station.json';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { IBookingDetails, IStation } from '../data.interface';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import { VoiceRecognitionService } from '../voice-recognition.service';




@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatExpansionModule,CommonModule ,MatSelectModule, MatDatepickerModule, MatDialogModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule, MatAutocompleteModule,],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  providers: [provideNativeDateAdapter(), VoiceRecognitionService],
})
export class HomepageComponent {
  bookingData!:IBookingDetails;
  filteredStation!: IStation[];
  isFocused: boolean = false;
  micId:string[] = []
  isMicOn = false; // Variable to track mic status

  Quota = [
    {
      quotaNameWithCode: 'GN - General',
      img: 'https://cdn.jsdelivr.net/gh/corover/assets@latest/askdisha-bucket/gn.svg',
      color: '#cce3f5'
    },
    {
      quotaNameWithCode: 'LD - Ladies',
      img: 'https://cdn.jsdelivr.net/gh/corover/assets@latest/askdisha-bucket/ld.svg',
      color: '#f7e4f3'
    },
    {
      quotaNameWithCode: 'SS - LB / SC',
      img: 'https://cdn.jsdelivr.net/gh/corover/assets@latest/askdisha-bucket/ss.svg',
      color: '#e5e5e5'
    },
    {
      quotaNameWithCode: 'TQ - tatkatl',
      img: 'https://cdn.jsdelivr.net/gh/corover/assets@latest/askdisha-bucket/hourglass.png',
      color: '#fff3dc'
    }
  ]

  services = [
    {
      img: 'https://cdn.jsdelivr.net/gh/corover/assets@latest/askdisha-bucket/failed-transation.svg',
      desc: 'Failed Bookings',
      color: 'rgb(252, 237, 236)',
      width: '34'
    },
    {
      img: 'https://cdn.jsdelivr.net/gh/corover/assets@latest/askdisha-bucket/FoT-Icon.png',
      desc: 'Order Food',
      color: 'rgb(253, 228, 217)',
      width: '34'
    },
    {
      img: 'https://cdn.jsdelivr.net/gh/corover/assets@latest/askdisha-bucket/tourism-logo.png',
      desc: 'Tour Packages',
      color: 'rgb(252, 247, 236)',
      width: '34'
    },
    {
      img: 'https://cdn.jsdelivr.net/gh/corover/assets@latest/askdisha-bucket/tdr.svg',
      desc: 'File TDR',
      color: 'rgb(239, 248, 253)',
      width: '26'
    },
    {
      img: 'https://cdn.jsdelivr.net/gh/corover/assets@latest/askdisha-bucket/cancel-ticket-refactored.png',
      desc: 'Cancel Ticket',
      color: 'rgb(255, 238, 238)',
      width: '28'
    },
    {
      img: 'https://d3upbvvdvllr10.cloudfront.net/dishav3/pnr.svg',
      desc: 'PNR Status',
      color: 'rgb(235, 238, 253)',
      width: '40'
    },
    {
      img: 'https://cdn.jsdelivr.net/gh/corover/assets@latest/askdisha-bucket/luggage2-refactored.png',
      desc: 'My Passengers',
      color: 'rgb(240, 239, 253)',
      width: '32'
    },
    {
      img: 'https://cdn.jsdelivr.net/gh/corover/assets@latest/askdisha-bucket/bording-station.svg',
      desc: 'Change Boarding',
      color: 'rgb(227, 255, 240)',
      width: '30'
    },
 
  ]
  
  constructor(public service : VoiceRecognitionService){
    // Subscribe to the mic status observable
    this.service.micStatus$.subscribe((status: boolean) => {
      this.isMicOn = status;  // Update the status
      console.log(this.isMicOn)
      // service.text = ''
      
      if(this.isMicOn == false) {
          if(this.micId.includes('from')) {
            this.bookingData.from = this.cleanString(service.text);
            this.filterStations(this.cleanString(service.text));
            this.micId = [];
            service.text = ''

          } else if(this.micId.includes('to')) {
            this.bookingData.to = this.cleanString(service.text);
            this.filterStations(this.cleanString(service.text));
            this.micId = [];
            service.text = ''
          }
      }
    });
    this.service.init()
    this.bookingData = {
      from : '',
      to : '',
      journeyDate: '',
      journeyQuota: '',
    }

  
  }
  filterStations(e:any) {
    console.log("hello")
    const searchStr = e.toLowerCase();
    if(!searchStr) {
      this.filteredStation = [...statesData]
    } else {
      this.filteredStation = statesData.filter((station) => station.stationName.toLowerCase().includes(searchStr) || station.stationCode.toLowerCase().includes(searchStr))
    }
    
    console.log(this.bookingData)
  }

  focus() {
    this.filteredStation = [];
    this.filteredStation = [...statesData];
  }

  swap(from: string, to: string) {
    let temp ;
    
    temp = from;
    this.bookingData.from = to;
    this.bookingData.to = temp;
  }

  clear(val:string) {
    if(val == 'from') {
      this.bookingData.from = ''
    } else if(val == 'to') {
      this.bookingData.to = ''
    }
    this.filteredStation = []
  }

  greetings() {
    var hrs = new Date().getHours();
    if (hrs < 12)
      return 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
      return 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
      return 'Good Evening';
    else
      return
  }


  bookTicket(data:IBookingDetails) {
    console.log(data)
  }


  OpenRecord(){
    this.service.start()  
  }

  stopService(){
    this.service.stop()
  }


  cleanString(input: string): string {
    if (!input) {
      return '';
    }
  
    // Convert to lowercase for uniform processing
    let cleanInput = input.toLowerCase();
  
    // Remove special characters, multiple dots, or other punctuation
    cleanInput = cleanInput.replace(/[^a-zA-Z0-9\s]/g, ''); // Remove anything that is not a letter, number, or space
    
    // Replace multiple spaces with a single space
    cleanInput = cleanInput.replace(/\s+/g, ' ').trim(); // Ensure no extra spaces
  
    // Capitalize first letter of each word
    cleanInput = cleanInput.replace(/\b\w/g, char => char.toUpperCase());
  
    return cleanInput;
  }

}
