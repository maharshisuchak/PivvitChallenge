import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {PurchaseComponent} from "./purchase/purchase.component";
import {UserAuthComponent} from "./user-auth/user-auth.component";
import {AuthGaurd} from "./_guards/auth.gaurds";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {UtilityModule} from "./utility/utility.module";

@NgModule({
  declarations: [
    AppComponent,
    PurchaseComponent,
    UserAuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UtilityModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthGaurd],
  bootstrap: [AppComponent]
})
export class AppModule {
}
