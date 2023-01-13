import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading: boolean = false

  constructor(
    private api: ApiService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notification:NotificationService,


  ) { }

  ngOnInit(): void {
    console.log("dd")
    this.api.get('alerts', 1).subscribe(data=>console.log(data))
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])

    });
  }

  async Login() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    try{
      let data = await lastValueFrom(this.authenticationService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value))
      console.log("data", data)
      if (data) {
        if (data.message === 'Auth Successful') {
          this.router.navigate(["/dashboard"]);
          // this.notification.showSuccess();
        }else
        this.loading = false;
      }
      else {
        this.loading = false;
        this.notification.showError('Something wrong');
      }
    }catch(err){
      this.notification.showError('Something wrong');
      this.loading = false;
    }
   

  }

  

}
