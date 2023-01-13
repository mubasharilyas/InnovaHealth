import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  @Output() isLoading = new EventEmitter<boolean>(false);

  page: number = 1
  limit: number = 10
  sort: number = 1
  initial_page!: number
  total_page!: number
  overall_total: number = 0
  alerts: any = []
  alertLoading: boolean = false
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAlerts(this.page, this.sort)
  }




  async getAlerts(page: number, sort: number) {
    this.isLoading.emit(true);
    this.alertLoading = true
    try {
      this.alerts = await lastValueFrom(this.api.getAlerts('alerts', page, sort))
      console.log("contacts", this.alerts)
      this.isLoading.emit(false);

      if (page == 1) {
        this.initial_page = page,
          this.total_page = this.alerts.results,
          this.overall_total = this.alerts.totalCount

      }
      else if (page > 1) {
        this.initial_page = ((page - 1) * 10) + 1
        if (this.alerts.alerts.length == 10) {
          this.total_page = (this.alerts.alerts.length * page)
        }
        else {
          this.total_page = (this.alerts.alerts.length + ((page - 1) * 10))

        }
        this.overall_total = this.alerts.totalCount
      }
      this.alertLoading = false
    }
    catch (error) {
      this.alertLoading = false
    }
  }
  sortData(sort: number) {
    console.log("sort", sort)
    this.sort = sort
    this.page = 1
    this.getAlerts(this.page, sort);

  }


  alertPageChanged(event: any) {
    this.page = event
    this.getAlerts(this.page, this.sort)

  }




}
