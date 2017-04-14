import {Injectable} from "@angular/core";
import {SharedUser} from "../shared-model/shared-user.model";

@Injectable()

export class SharedUserService {
  private _user: SharedUser;

  constructor() {
  }

  getUser(): SharedUser {
    return JSON.parse(localStorage.getItem("user"));
  }

  setUser(value: SharedUser) {
    localStorage.setItem("user", JSON.stringify(value));
    this._user = value;
  }
}
