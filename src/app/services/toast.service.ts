import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async presentToast(position: 'top', infoMessage: string) {
    const toast = await this.toastController.create({
      message: infoMessage,
      duration: 1500,
      position: position
    });

    await toast.present();
  }
}
