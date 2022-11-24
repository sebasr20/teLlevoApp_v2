import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthConstants } from 'src/app/config/auth.constants';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  public postData = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService : ToastService,
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController
  ) {
    this.formularioLogin = this.fb.group({
      'email':new FormControl("", Validators.required),
      'password':new FormControl("", Validators.required)

    })
   }

  ngOnInit() {
  }

  async ingresar(){
    var f = this.formularioLogin.value;

    var usuario = JSON.parse(localStorage.getItem('usuario'));

    if(usuario.email == f.email && usuario.password == f.password){
      console.log('Ingresado ' + usuario.name);
      localStorage.setItem('ingresado','true');
      this.navCtrl.navigateRoot('home/feed');
    }else{
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Usuario o Contraseña incorrecta, vuelva a intentarlo',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    }
  
 }

  validateInputs(){
    let email = this.postData.email.trim();
    let password = this.postData.password.trim();

    return (this.postData.email && this.postData.password && email.length > 0 && password.length > 0)
  }

  loginAction(){
    //this.router.navigate(['/home/feed'])
    console.log(this.postData.email);
    
    console.log("aca");
    if(this.validateInputs()){
      this.authService.login(this.postData).subscribe((res: any) =>{
        if(res.userData){
          let usuarios = res.userData
          
          let dataFinal = usuarios.find(el => el.email === this.postData.email);
          
          this.storageService.store(AuthConstants.AUTH, dataFinal);
          this.router.navigate(['home/feed'])
        }else{
          this.toastService.presentToast('top',res.error.text);
        }
      },
      (error: any)=>{
        this.toastService.presentToast('top','Usuario o Contraseña Incorrecta')
      }
      )
    }else{
      this.toastService.presentToast('top','Debe ingresar datos correctos');
    }

  }
}
