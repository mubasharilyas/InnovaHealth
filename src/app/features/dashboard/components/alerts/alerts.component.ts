import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { NotificationService } from 'src/app/core/services/notification.service';

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
  constructor(private api: ApiService,
    private toaster: NotificationService) { }

  ngOnInit(): void {
    this.getAlerts()
  }




  async getAlerts() {
    this.isLoading.emit(true);
    this.alertLoading = true
    try {
      this.alerts = await lastValueFrom(this.api.get(`alert/get-alerts/${this.page}/${this.sort}`))
      this.isLoading.emit(false);
      if (!this.alerts.errorMessage) {
        if (this.page == 1) {
          this.initial_page = this.page,
            this.total_page = this.alerts.alerts.length,
            this.overall_total = this.alerts.totalCount

        }
        else if (this.page > 1) {
          this.initial_page = ((this.page - 1) * 10) + 1
          if (this.alerts.alerts.length == 10) {
            this.total_page = (this.alerts.alerts.length * this.page)
          }
          else {
            this.total_page = (this.alerts.alerts.length + ((this.page - 1) * 10))

          }
          this.overall_total = this.alerts.totalCount
        }
      } else {
        this.toaster.showError(this.alerts.errorMessage);

      }
      this.alertLoading = false
    }
    catch (error) {
      this.toaster.showError("Network Error");

      this.alertLoading = false
    }
  }
  sortData(sort: number) {
    console.log("sort", sort)
    this.sort = sort
    this.page = 1
    this.getAlerts();

  }


  alertPageChanged(event: any) {
    this.page = event
    this.getAlerts()

  }




}
