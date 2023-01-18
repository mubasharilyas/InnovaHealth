import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, lastValueFrom, Observable, Subscription, tap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { contacts } from '../../models/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, AfterViewInit {
  @ViewChild('search') search!: ElementRef;
  @Output() isLoading = new EventEmitter<boolean>(false);

  page: number = 1
  limit: number = 10
  sort: number = 1
  contacts: contacts = {
    contacts: [],
    totalCount: 0
  }
  initialPage!: number
  totalPages!: number
  overallTotal!: number
  SearchSubcription!: Subscription
  contactLoading: boolean = false


  constructor(private api: ApiService,
    private toaster: ToastService) { }

  ngOnInit(): void {
    this.getContacts()
  }



  async getContacts() {
    this.contactLoading = true
    this.isLoading.emit(true);
    try {
      this.contacts = <contacts>await lastValueFrom(this.api.get(`contact/get-contacts/${this.page}/${this.sort}/${this.search && this.search.nativeElement ? this.search.nativeElement.value : ''}`))
      if (!this.contacts.errorMessage) {
        if (this.page == 1) {
          this.initialPage = this.page,
            this.totalPages = this.contacts.contacts.length,
            this.overallTotal = this.contacts.totalCount

        }
        else if (this.page > 1) {
          this.initialPage = ((this.page - 1) * 10) + 1
          if (this.contacts.contacts.length == 10) {
            this.totalPages = (this.contacts.contacts.length * this.page)
          }
          else {
            this.totalPages = (this.contacts.contacts.length + ((this.page - 1) * 10))

          }
          this.overallTotal = this.contacts.totalCount
        }
      } else {
        this.toaster.showError(this.contacts.errorMessage);

      }
      this.contactLoading = false
      this.isLoading.emit(false);
    }
    catch (error) {
      this.contactLoading = false
      this.isLoading.emit(false);
    }
  }

  ngAfterViewInit(): void {
    this.SearchSubcription = fromEvent(
      this.search.nativeElement,
      'keyup'
    ).pipe(
      filter(Boolean),
      debounceTime(1000),
      distinctUntilChanged(),
      tap(() => {
        this.page = 1
        this.sort = 1
        this.contactLoading = true
        this.isLoading.emit(true);

        this.getContacts();
        setTimeout(() => {
          this.contactLoading = false
          this.isLoading.emit(false);
        }, 1000)
      })
    ).subscribe();

  }
  sortContacts(sort: number) {
    this.sort = sort
    this.page = 1
    this.getContacts();

  }

  onPageChange(pageNumber: number) {
    this.page = pageNumber
    this.getContacts()

  }
  trackByFn(index: number) {
    return index
  }

}
