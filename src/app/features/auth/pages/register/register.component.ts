import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NotificationService } from 'src/app/core/services/notification.service';
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
    private toast: NotificationService
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      gender: new FormControl(''),
    });
  }

  async onSubmit() {
    console.log("form Value", this.registerForm.value)

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
        // this.message = error.message;

      }
    } catch (err) {
      this.toast.showError('something wrong');
    }

  }

}
