import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  displayUserData= {
    "name": "",
    "email": ""
  };
 // datosUsuario: any;
  //usuarioPostData = {"name":"","email":""};
  //datosUsuario= {"name":"","email":""};
  categoryName: string = "";
  categories: any = [];
  editMode: boolean = false;
  editId: number = 0;
    
  constructor(private authService: AuthService, public alertController: AlertController,public navCtrl: NavController ) {
    
    //const data = JSON.parse(localStorage.getItem('usuario'));
    //this.datosUsuario = data.usuario;

    //this.usuarioPostData.name = this.datosUsuario.name;
    //this.usuarioPostData.email = this.datosUsuario.email;

    //console.log(data);
    this.cargarDatos();


   }



  ngOnInit() {
    this.authService.userData$.subscribe((res:any) => {
      this.displayUserData = res;
    })
  }

  cargarDatos(){
    this.displayUserData = JSON.parse(localStorage.getItem('usuario'));
    console.log(this.displayUserData.name);
    console.log(this.displayUserData.email);
  }

 
  async salir(){
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Está seguro de querer salir?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            
          }
        }, {
          text: 'Sí',
          handler: () => {
            localStorage.removeItem('ingresado');
            this.navCtrl.navigateRoot('login');
          }
        }
      ]
    });

    await alert.present();
  }

  logoutAction(){
    this.authService.logout();
  }

}
