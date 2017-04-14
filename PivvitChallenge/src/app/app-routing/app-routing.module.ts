import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {Route} from "../utility/constants/routes";
import {AuthGaurd} from "../_guards/auth.gaurds";
import {UserAuthComponent} from "../user-auth/user-auth.component";
import {PurchaseComponent} from "../purchase/purchase.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: Route.LOGIN,
    pathMatch: 'full'
  },
  {
    path: Route.LOGIN,
    component: UserAuthComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: Route.PURCHASE,
    component: PurchaseComponent,
    canActivate: [AuthGaurd]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
