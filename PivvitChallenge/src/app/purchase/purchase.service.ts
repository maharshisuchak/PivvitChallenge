import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpService} from "../utility/http-service";
import {Response} from "@angular/http";

@Injectable()
export class PurchaseService {

  constructor(private httpService: HttpService) {
  }


  getListAPICall(endPoint: string, searchParam?: any, pageIndex?: number, recordsPerPage?: number): Observable<any> {
    let queryString = "?";
    if (pageIndex) {
      queryString += "recordsPerPage=" + recordsPerPage + "&pageNumber=" + pageIndex;
      if (searchParam) {
        queryString = queryString + '&search=' + JSON.stringify(searchParam);
      }
    } else {
      queryString += "records=all";
      for (var key in searchParam) {
        if (searchParam.hasOwnProperty(key)) {
          queryString += "&" + key + "=" + searchParam[key];
        }
      }
    }
    return this.httpService.get(endPoint + queryString).map(res => this.extractData(res));
  }

  addAPICall(endPoint: string, params): Observable<any> {
    return this.httpService.post(endPoint, params)
      .map(resp => this.extractData(resp))
      .catch(err=>this.extractData(err));
  }

  private extractData(res: Response) {
    let data = res.json();
    return data || {};
  }

}
