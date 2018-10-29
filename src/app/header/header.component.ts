import { Component, OnInit } from '@angular/core';
import {LoginService} from '../security/login/login.service'

@Component({
  selector: 'mt-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn()
  }

}
