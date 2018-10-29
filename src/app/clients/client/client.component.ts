import { Component, OnInit, Input } from '@angular/core';

import { Client } from './client.model'

@Component({
  selector: 'mt-client',
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {

  @Input() client: Client

  constructor() { }

  ngOnInit() {
  }

}
