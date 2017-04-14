import {Injectable} from "@angular/core";
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Headers,
  ResponseContentType,
  Request
} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {CommonFunctions} from "./common-functions";
import {SharedService} from "./shared-service/shared.service";
import {API} from "./constants/api";

@Injectable()
export class HttpService extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private sharedService: SharedService) {
    super(backend, defaultOptions);
  }

  /**
   * Performs any type of http request.
   * @param url
   * @param options
   * @returns {Observable<Response>}
   */

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options);
  }

  /**
   * Performs a request with `get` http method.
   * @param url
   * @param options
   * @returns {Observable<>}
   */

  get(url: string, options?: RequestOptionsArgs, showLoader: boolean = true): Observable<any> {
    if (showLoader) {
      this.requestInterceptor();
    }
    return super.get(this.getFullUrl(url), this.requestOptions())
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  getLocal(url: string, options?: RequestOptionsArgs): Observable<any> {
    return super.get(url, options);
  }

  /**
   * Performs a request with `post` http method.
   * @param url
   * @param body
   * @param options
   * @returns {Observable<>}
   */

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.requestInterceptor();
    return super.post(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  postWithDownloadFile(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.requestInterceptor();
    return super.post(this.getFullUrl(url), body, this.requestOptions1(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  postWithFile(url: string, postData: any, filesObj: any, options?: RequestOptionsArgs): Observable<any> {
    this.requestInterceptor();
    let headers = new Headers();
    let formData: FormData = new FormData();
    for (var obj of filesObj) {
      let imgFilesObj: File[] = obj['files'];
      for (let i = 0; i < imgFilesObj.length; i++) {
        formData.append(obj["reqKey"], imgFilesObj[i], imgFilesObj[i].name);
      }
    }
    if (postData !== "" && postData !== undefined && postData !== null) {
      for (var property in postData) {
        if (postData.hasOwnProperty(property)) {
          formData.append(property, postData[property]);
        }
      }
    }
    return super.post(this.getFullUrl(url), formData, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  /**
   * Performs a request with `put` http method.
   * @param url
   * @param body
   * @param options
   * @returns {Observable<>}
   */

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
    this.requestInterceptor();
    return super.put(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  /**
   * Performs a request with `put` http method.
   * @param url
   * @param body
   * @param options
   * @returns {Observable<>}
   */

  putWithFile(url: string, postData: any, filesObj: any, options?: RequestOptionsArgs): Observable<any> {
    let headers = new Headers();
    let formData: FormData = new FormData();
    for (var obj of filesObj) {
      let imgFilesObj: File[] = obj['files'];
      for (let i = 0; i < imgFilesObj.length; i++) {
        formData.append(obj["reqKey"], imgFilesObj[i], imgFilesObj[i].name);
      }
    }
    if (postData !== "" && postData !== undefined && postData !== null) {
      for (var property in postData) {
        if (postData.hasOwnProperty(property)) {
          formData.append(property, postData[property]);
        }
      }
    }
    return super.put(this.getFullUrl(url), formData, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  /**
   * Performs a request with `delete` http method.
   * @param url
   * @param options
   * @returns {Observable<>}
   */

  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.requestInterceptor();
    return super.delete(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  /**
   * Request options.
   * @param options
   * @returns {RequestOptionsArgs}
   */

  // Generate Headers.

  createHeaders() {
    const token = this.sharedService.getToken();
    let headers = new Headers(token ? {'Authorization': `bearer ${token}`} : null);
    headers.append("Accept", 'application/json');
    return headers
  }

  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = this.createHeaders();
    }
    return options;
  }

  private requestOptions1(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = this.createHeaders();
      options.responseType = ResponseContentType.ArrayBuffer;
    }
    return options;
  }

  /**
   * Build API url.
   * @param url
   * @returns {string}
   */

  private getFullUrl(url: string): string {
    let reqUrl = API.BASE_URL + url;
    CommonFunctions.Logger("URL", reqUrl);
    return reqUrl;
  }

  /**
   * Request interceptor.
   */

  private requestInterceptor(): void {
    this.sharedService.setLoader(true);
  }

  /**
   * Response interceptor.
   */

  private responseInterceptor(): void {
    this.sharedService.setLoader(false);
  }

  /**
   * Error handler.
   * @param error
   * @param caught
   * @returns {ErrorObservable}
   */

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.throw(error);
  }

  /**
   * onSubscribeSuccess
   * @param res
   */

  private onSubscribeSuccess(res: Response): void {
    CommonFunctions.Logger("Response", res);
  }

  /**
   * onSubscribeError
   * @param error
   */

  private onSubscribeError(error: any): void {
    CommonFunctions.Logger("Error", error);
    let message: string = "Connection interrupted. Please try again."
    if (error.json().payload) {
      message = error.json().payload.error;
    }
    /*if (error.status == HttpStatusConstants.UNAUTHORIZED) {
     this.userService.logout();
     }
     this.toastManager.clearAllToasts();
     this.toastManager.error(message);*/
  }

  /**
   * onFinally
   */

  private onFinally(): void {
    this.responseInterceptor();
  }

}

