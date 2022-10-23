import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from 'src/app/config/auth.constants';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public postData = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService : ToastService,
  ) { }

  ngOnInit() {
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
