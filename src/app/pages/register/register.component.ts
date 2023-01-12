import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading:boolean=false
  message!: string;
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      gender: new FormControl(''),
    });
  }

 async onSubmit() {
    console.log("form Value",this.registerForm.value)

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
   let data= await lastValueFrom(this.api.register(this.registerForm.value));
  console.log("resgister response",data)
        if(data){
          this.loading = false;
          this.registerForm.reset()
          this.router.navigate(["/login"]);
        }
        else{
          this.loading = false;
          // this.message = error.message;
        }

  }

}
