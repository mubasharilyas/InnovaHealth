import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  page:number=1
  contacts:any
    constructor(private api:ApiService) { }
  
    ngOnInit(): void {
      this.getContacts()
    }
  
  
  
    async getContacts(){
      this.contacts= await lastValueFrom(this.api.get('contacts',this.page))
      console.log("alerts",this.contacts)

    }
   
  

}
