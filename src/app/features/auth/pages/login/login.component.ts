import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NotificationService } from 'src/app/core/services/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading: boolean = false

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notification: NotificationService,


  ) { }

  ngOnInit(): void {

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
    try {
      let data = await lastValueFrom(this.authenticationService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value))

      if (data && data.success) {
        this.router.navigate(["/dashboard"]);
        this.notification.showSuccess('Logged In Successfully');
      } else {
        this.loading = false;
        this.notification.showError(data.errorMessage);

      }


    } catch (err) {
      this.notification.showError('Something went wrong');
      this.loading = false;
    }


  }



}
