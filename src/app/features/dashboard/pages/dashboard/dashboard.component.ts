import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  page: number = 1
  totalContacts: any
  totalStates: any
  results: any
  alerts: any
  isLoading: boolean = false
  ContactsAndStats_Loading: boolean = false

  constructor(private api: ApiService, public authenticationService: AuthenticationService) { }

  ngOnInit(): void {

    this.getTotalContactsAndStats()
  }

  async getTotalContactsAndStats() {
    this.ContactsAndStats_Loading = true
    this.results = await lastValueFrom(this.api.get('contact/get-contact-stats'))
    this.totalContacts = this.results.totalContacts
    this.totalStates = this.results.totalStates
    this.ContactsAndStats_Loading = false

  }
  onLoading(event: any) {
    this.isLoading = event
  }


}
