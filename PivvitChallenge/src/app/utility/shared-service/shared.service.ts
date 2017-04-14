import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {CommonFunctions} from "../common-functions";
import {SharedUserService} from "./shared-user.service";
import {Storage} from "../constants/storage";

@Injectable()
export class SharedService extends SharedUserService {

  constructor() {
    super();
  }

  /* Shared LoggedIn Param */

  private isLoginRequired: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getLoginRequired(): Observable<boolean> {
    return this.isLoginRequired.asObservable();
  }

  setLoginRequired(val: boolean): void {
    this.isLoginRequired.next(val);
  }

  /* Shared LoggedIn Param */

  /* Shared Loader Param */

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private taskCount: number = 0;

  getLoader(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  setLoader(val: boolean): void {
    if (val) {
      this.taskCount += 1
    } else {
      this.taskCount -= 1
      this.taskCount != 0 ? val = true : "";
    }
    this.isLoading.next(val);
  }

  /* Shared Loader Param */

  /* Shared User Token Param */

  getToken(): string {
    return localStorage.getItem(Storage.TOKEN);
  }

  setToken(value: string) {
    localStorage.setItem(Storage.TOKEN, value);
  }

  /* Shared User Token Param */

  isLoggedin(): boolean {
    return CommonFunctions.isValidString(this.getToken()) ? true : false;
  }

} 
