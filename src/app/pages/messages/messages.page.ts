import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap, Marker} from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ModalPage } from '../modal/modal.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  @ViewChild('map')mapRef: ElementRef;
  map: GoogleMap;

  constructor(private modalCtrl: ModalController, private alertController: AlertController) { }

  ngOnInit() {
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
          lat:-33.033264905759026, 
          lng: -71.53493283282204,
        },
        zoom:17,
        
      },
      
      

    });
    this.addMarkers();
  }

  async addMarkers() {
    const markers: Marker[] = [
      {
        coordinate: {
          lat:-33.033264905759026, 
          lng: -71.53493283282204,
        },
        title: 'Sebastian Soto',
        snippet: 'Gomez Carreño',
        draggable: true                                                                                                                                                                                                                                                                                                                              
      },      
    ];
    console.log(markers);
    const result = await this.map.addMarkers(markers);
    console.log(result);

    /* this.map.setOnMarkerClickListener(async (marker) => {
      
      const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps: {
          marker,
        },
        breakpoints: [0,0.3],
        initialBreakpoint: 0.3,
      });
      modal.present();
    }); */
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Viaje Creado',
      //subHeader: 'Destino Gomez Carreño',
      message: 'El viaje fue creado correctamente',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
