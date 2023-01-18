import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toaster: NgToastService) { }
  showSuccess(message: string) {
    this.toaster.success({ detail: "SUCCESS", summary: message, duration: 5000 })
  }

  showError(message: string) {
    this.toaster.error({ detail: message })
  }


}
