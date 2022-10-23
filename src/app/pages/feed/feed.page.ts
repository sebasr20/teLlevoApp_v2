import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap, Marker} from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  displayUserData: any;
  @ViewChild('map')mapRef: ElementRef;
  map: GoogleMap;

  constructor(private authService: AuthService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.authService.userData$.subscribe((res:any) => {
      this.displayUserData = res;
    })
  }

  ionViewDidEnter(){
    this.createMap();
  }

  async createMap(){
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      forceCreate: true,
      config:{
        center:{ 
          lat: -33.0335876819661,
          lng: -71.53295662442804,
        },
        zoom:17,
      }

    });
    this.addMarkers();
  }

  async addMarkers() {
    const markers: Marker[] = [
      {
        coordinate: {
          lat:-33.032961210434195,
          lng: -71.53382527091321,
        },
        title: 'Matias Vega',
        snippet: 'Placilla',
      },
      {
        coordinate: {
          lat:-33.033889785935344,
          lng: -71.53253557744176,
        },
        title: 'Claudia Torres',
        snippet: 'Quilpué',
      },
      {
        coordinate: {
          lat:-33.033566223164634, 
          lng: -71.53248665831151,
        },
        title: 'Daniela Ramirez',
        snippet: 'Concón',
      },
      
    ];
    console.log(markers);
    const result = await this.map.addMarkers(markers);
    console.log(result);

    this.map.setOnMarkerClickListener(async (marker) => {
      
      const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps: {
          marker,
        },
        breakpoints: [0,0.3],
        initialBreakpoint: 0.3,
      });
      modal.present();
    });
  }

}
