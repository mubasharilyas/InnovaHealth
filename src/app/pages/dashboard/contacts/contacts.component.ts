import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, lastValueFrom, Observable, Subscription, tap } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit,AfterViewInit {
  @ViewChild('search')search!: ElementRef;
  page:number=1
  limit:number=10
  sort:number=1
  contacts:any=[]
  initial_page!:number
  total_page!:number
  overall_totals!:number
  SearchSubcription!: Subscription
  contactLoading:boolean=false


    constructor(private api:ApiService) { }
  
    ngOnInit(): void {
      this.getContacts(this.page,this.sort,'')
    }
  
  
  
    async getContacts(page:number,sort:number,search:string){
      let res = await lastValueFrom(this.api.getContact('contacts',page,sort,search))
      this.contacts=res
      console.log("contacts",res)
      if(page==1){
        this.initial_page=page,
        this.total_page=this.contacts.results,
        this.overall_totals=this.contacts.totalCount

      }
      else if(page>1){
        this.initial_page=((page-1)*10)+1
        if(this.contacts.contacts.length==10){
          this.total_page=(this.contacts.contacts.length*page)
        }
        else{
          this.total_page=(this.contacts.contacts.length+((page-1)*10))

        }
        this.overall_totals=this.contacts.totalCount
      }
    }
   
    ngAfterViewInit():void{
      this.SearchSubcription=fromEvent(
        this.search.nativeElement,
        'keyup'
      ).pipe(
        filter(Boolean),
        debounceTime(1000),
        distinctUntilChanged(),
        tap(()=>{
          this.page=1
          this.sort=1
          this.contactLoading=true
          this.getContacts(this.page,this.sort,this.search.nativeElement.value);
          setTimeout(()=>{
            this.contactLoading=false
          },1000)
        })
      ).subscribe();

    }
    sortData(sort:number){
      console.log("sort",sort)
      this.sort=sort
      this.page=1
      this.getContacts(this.page,sort,this.search.nativeElement.value);

    }

    pageChanged(event:any){
      this.page=event
      this.getContacts(this.page,this.sort,this.search.nativeElement.value)
  
    }
  

}
