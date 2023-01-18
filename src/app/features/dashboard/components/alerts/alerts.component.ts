import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { alerts } from '../../models/alert.model';

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
  initialPage!: number
  totalPages!: number
  overallTotal: number = 0
  alerts: alerts = {
    alerts: [],
    totalCount: 0,
  }
  alertLoading: boolean = false
  constructor(private api: ApiService,
    private toaster: ToastService) { }

  ngOnInit(): void {
    this.getAlerts()
  }

  async getAlerts() {
    this.isLoading.emit(true);
    this.alertLoading = true
    try {
      this.alerts = <alerts>await lastValueFrom(this.api.get(`alert/get-alerts/${this.page}/${this.sort}`))
      this.isLoading.emit(false);
      if (!this.alerts.errorMessage) {
        if (this.page == 1) {
          this.initialPage = this.page,
            this.totalPages = this.alerts.alerts.length,
            this.overallTotal = this.alerts.totalCount

        }
        else if (this.page > 1) {
          this.initialPage = ((this.page - 1) * 10) + 1
          if (this.alerts.alerts.length == 10) {
            this.totalPages = (this.alerts.alerts.length * this.page)
          }
          else {
            this.totalPages = (this.alerts.alerts.length + ((this.page - 1) * 10))

          }
          this.overallTotal = this.alerts.totalCount
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
  sortAlerts(sort: number) {
    this.sort = sort
    this.page = 1
    this.getAlerts();

  }
  onPageChange(pageNumber: number) {
    this.page = pageNumber
    this.getAlerts()

  }

  trackByFn(index: number) {
    return index
  }

}
