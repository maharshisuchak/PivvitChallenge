import {Injectable} from "@angular/core";
import {HttpService} from "../utility/http-service";
import {Observable} from "rxjs";
import {API} from "../utility/constants/api";
import {Response} from "@angular/http";

@Injectable()
export class UserAuthService {

  constructor(private httpService: HttpService) {
  }

  login(body): Observable<any> {
    return this.httpService.post(API.LOGIN, body)
      .map(resp => this.extractData(resp))
      .catch(err=>this.extractData(err));
  }

  private extractData(res: Response) {
    let data = res.json();
    return data || {};
  }

}
