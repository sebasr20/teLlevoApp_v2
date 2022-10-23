import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Reserva',
      subHeader: 'Viaje Confirmado',
      message: 'El Vehículo sale a las 21:30 hrs',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
