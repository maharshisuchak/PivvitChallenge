import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NoDataComponent} from "./no-data/no-data.component";
import {ProgressHudComponent} from "./progress-hud/progress-hud.component";
import {ConnectionBackend, RequestOptions, XHRBackend} from "@angular/http";
import {HttpService} from "./http-service";
import {SharedService} from "./shared-service/shared.service";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ValidationComponent} from "./validation/validation.component";

export function callService(backend: ConnectionBackend, options: RequestOptions, sharedService: SharedService) {
  return new HttpService(backend, options, sharedService);
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NoDataComponent, ProgressHudComponent, PageNotFoundComponent,ValidationComponent],
  providers: [
    SharedService,
    {
      provide: HttpService,
      useFactory: callService,
      deps: [XHRBackend, RequestOptions, SharedService]
    }
  ],
  exports: [NoDataComponent, ProgressHudComponent, PageNotFoundComponent, ValidationComponent]
})

export class UtilityModule {
}
