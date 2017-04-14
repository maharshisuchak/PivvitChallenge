import {Injectable} from "@angular/core";
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from "@angular/router";
import {SharedService} from "../utility/shared-service/shared.service";
import {Route} from "../utility/constants/routes";

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(private router: Router, private sharedService: SharedService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let activateRoute: boolean = true;
    if (this.sharedService.isLoggedin()) {
      if (state.url !== '/' + Route.LOGIN) {
        activateRoute = true;
      } else if (state.url == '/' + Route.LOGIN) {
        this.router.navigate(['/' + Route.PURCHASE]);
        activateRoute = false;
      }
    } else if (state.url !== '/' + Route.LOGIN) {
      this.router.navigate(['/' + Route.LOGIN]);
      activateRoute = false;
    }
    return activateRoute
  }
}
