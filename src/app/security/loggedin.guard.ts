import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import {Injectable} from '@angular/core'
import {LoginService} from './login/login.service'

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private loginService: LoginService,
              private router: Router){}

  checkAuthentication(path: string): boolean {
    const loggedIn = this.loginService.isLoggedIn()
    if (!loggedIn){
      this.router.navigate(['/login'])
    }
    return loggedIn
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
    return this.checkAuthentication(activatedRoute.routeConfig.path)
  }








}
