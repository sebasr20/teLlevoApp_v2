import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthConstants } from 'src/app/config/auth.constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
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
    private router: Router
  ) { }

  ngOnInit() {
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
