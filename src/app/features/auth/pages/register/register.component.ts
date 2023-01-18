import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ToastService } from 'src/app/core/services/toast.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading: boolean = false
  message!: string;
  constructor(private auth: AuthenticationService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      gender: new FormControl(''),
    });
  }

  async registerUser() {

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    try {
      let data = await lastValueFrom(this.auth.register(this.registerForm.value));
      if (data) {
        this.loading = false;
        this.registerForm.reset()
        this.toast.showSuccess('Register Successfully');
        this.router.navigate(["/login"]);
      }
      else {
        this.toast.showError('something wrong');
        this.loading = false;

      }
    } catch (err) {
      this.toast.showError('Something went wrong');
    }

  }

}
