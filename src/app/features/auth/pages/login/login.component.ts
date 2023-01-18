import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ToastService } from 'src/app/core/services/toast.service';
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
    private auth: AuthenticationService,
    private toaster: ToastService,
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
      let data = await lastValueFrom(this.auth.login(this.loginForm.value))

      if (data && data.success) {
        this.router.navigate(["/dashboard"]);
      } else {
        this.loading = false;
        this.toaster.showError(data.errorMessage);

      }


    } catch (err) {
      this.toaster.showError('Something went wrong');
      this.loading = false;
    }


  }



}
