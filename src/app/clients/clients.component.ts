import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations'
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'

import {Client} from './client/client.model'
import {ClientsService} from './clients.service'

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'
import {Observable} from 'rxjs/Observable'

@Component({
  selector: 'mt-clients',
  templateUrl: './clients.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        'max-height': '0px'
      })),
      state('visible', style({
        opacity: 1,
        'max-height': '70px',
        'margin-top': '20px'
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class ClientsComponent implements OnInit {

  searchBarState = 'hidden'
  clients: Client[]
  filteredStatusClients: Client[]
  filteredNameClients: Client[]
  active = 'all'

  searchForm: FormGroup

  constructor(private clientsService: ClientsService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: this.fb.control('')
    })

    this.searchForm.get('search').valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((searchWord: string) => {
        // if(searchWord.trim() === ''){
        //   this.filteredNameClients = this.filteredStatusClients
        // }
        this.filteredNameClients = this.filteredStatusClients
                                      .filter(client => client.name.toUpperCase().includes(searchWord.toUpperCase()))
      })

    this.clientsService.clients()
        .subscribe(clients => this.clients = this.filteredStatusClients = this.filteredNameClients = clients)
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

  filtrarPorStatus(status: string){
    this.active = status
    this.searchForm.controls['search'].setValue('')
    switch (status) {
      case 'all': {
        this.filteredNameClients = this.filteredStatusClients = this.clients
        break;
      }
      case 'active': {
        this.filteredNameClients = this.filteredStatusClients = this.clients.filter(client => client.status === 'true')
        break;
      }
      case 'inactive': {
        this.filteredNameClients = this.filteredStatusClients = this.clients.filter(client => client.status === 'false')
        break;
      }
    }
  }

}
