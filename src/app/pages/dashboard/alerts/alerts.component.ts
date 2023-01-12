import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  page:number=1
  alerts:any
    constructor(private api:ApiService) { }
  
    ngOnInit(): void {
      this.getAlerts()
    }
  
  
  

    async getAlerts(){
      this.alerts= await lastValueFrom(this.api.get('alerts',this.page))
      console.log("alerts",this.alerts)
    }
  

}
