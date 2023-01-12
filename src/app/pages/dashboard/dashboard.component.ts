import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
page:number=1
contacts:any
alerts:any
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getAlerts()
    this.getContacts()
  }



  async getContacts(){
    this.contacts= await lastValueFrom(this.api.get('contacts',this.page))
  }
  async getAlerts(){
    this.alerts= await lastValueFrom(this.api.get('alerts',this.page))
  }

}
