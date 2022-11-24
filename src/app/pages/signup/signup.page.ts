import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthConstants } from 'src/app/config/auth.constants';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  [x: string]: any;

  formularioRegistro: FormGroup;

  postData = {
    name: '',
    username: '',
    email: '',
    password: ''
  };
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private storageService: StorageService,
    private router: Router,
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController
  ){
    this.formularioRegistro = this.fb.group({
      'name': new FormControl("", Validators.required),
      'username':new FormControl("", Validators.required),
      'email':new FormControl("", Validators.required),
      'password':new FormControl("", Validators.required),

    })
   }


  ngOnInit() {
  }

  async guardar(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Debe completar todos los datos para registrarse',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }

    var usuario = {
      email: f.email,
      password: f.password,
      name: f.name
    }

    localStorage.setItem('usuario',JSON.stringify(usuario));
    const alert = await this.alertController.create({
        header: 'Información de Registro',
        message: 'Usuario registrado exitosamente.',
        buttons: ['Aceptar']
      });
    await alert.present();
    this.navCtrl.navigateRoot('login');
  }

  validateInputs() {
    let username = this.postData.username.trim();
    let password = this.postData.password.trim();
    let email = this.postData.email.trim();
    let name = this.postData.name.trim();
    return (
      this.postData.name &&
      this.postData.username &&
      this.postData.password &&
      this.postData.email &&
      name.length > 0 &&
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0
    );
  }
  
  registerAction() {
    console.log("Aca");
    if (this.validateInputs()) {
      this.authService.signup(this.postData).subscribe(
        (res: any) => {
          if (res.userData) {
            // Storing the User data.
            this.storageService
              .store(AuthConstants.AUTH, res.userData)
              .then(res => {
                this.router.navigate(['home']);
              });
          } else {
            this.toastService.presentToast('top','Los datos ya existen, por favor ingrese datos nuevos.'
            );
          }
        },
        (error: any) => {
          this.toastService.presentToast('top','Problemas de Conexión.');
        }
      );
    } else {
      this.toastService.presentToast('top','Por favor, ingresar los datos solicitados'
      );
    }
  }
}
