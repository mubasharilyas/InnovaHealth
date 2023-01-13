import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
page:number=1
totalContacts:any
totalStates:any
results:any
alerts:any
isLoading:boolean=false
ContactsAndStats_Loading:boolean=false

  constructor(private api:ApiService, public authenticationService:AuthenticationService) { }

  ngOnInit(): void {
   
    this.getTotalContactsAndStats()
  }

  async getTotalContactsAndStats(){
    this.ContactsAndStats_Loading=true
    this.results = await lastValueFrom(this.api.get('contact-stats'))
    console.log("respons",this.results)
    this.totalContacts=this.results.totalContacts
    this.totalStates=this.results.totalStates
    this.ContactsAndStats_Loading=false

  }
  onLoading(event:boolean){
this.isLoading=event
  }
 

}
