import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toster:NgToastService) { }
  showSuccess(message:string){
    this.toster.success({detail:"SUCCESS",summary:message,duration:5000})
}
 
showError(message:string){
    this.toster.error({detail:message})
}
 
// showInfo(message, title){
//     this.toastr.info(message, title)
// }
 
// showWarning(message, title){
//     this.toastr.warning(message, title)
// }
}
