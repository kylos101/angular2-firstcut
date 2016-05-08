
import {Injectable} from "angular2/core";  // TODO: Research me ... used as a decorater
import {Http, Headers, RequestOptions, Response} from "angular2/http";  // TODO: Research me
import {Observable, Subject} from "rxjs/Rx"; // TODO: Research me ... stream of data
import {Claimant} from "../classes/claimant";

// What does Injectable() do?
@Injectable()
export class ClaimantService {
  constructor (private http: Http) {
    this._claimantBaseUrl = "http://localhost:50299/";    
    this._claimantsUrl = this._claimantBaseUrl + "api/values";  // URL to web api
  }

  private _claimantBaseUrl: string;
  private _claimantsUrl: string;

  // https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#bidirectional-service
  // Observable Claimant streams
  private _claimantList = new Subject<Claimant[]>(); // Subject is an observer and observable
  claimantList$ = this._claimantList.asObservable();

  // Only works if the web client lives on the same domain as _claimantsUrl.
  // This is because of the Same-origin policy (a rule enforced by browsers).
  // https://angular.io/docs/ts/latest/guide/server-communication.html#!#jsonp
  getClaimants() {
    // let claimants: Claimant[];
    // let claimant: Claimant;
    // claimant.Id = "foo";
    // claimant.Name = "bar";
    // claimant.Nickname = "kylos";
    // claimants.push(claimant);
     return this.http.get(this._claimantsUrl)
                    .map(res => <Claimant[]> res.json()) // map is a RxJS  function
                    // .do(data => console.log(data)) // TODO: ditch me, this is just for inspection...do is a RxJS  function
                    .catch(this.handleError);
  }

  addClaimant (Name: string, Nickname: string): Observable<Claimant[]> {

    // relevant to web api receiving data, http://www.asp.net/web-api/overview/advanced/sending-html-form-data-part-1#sending_complex_types
    let theClaimant: Claimant = {
      Id: null,
      Name: Name,
      Nickname: Nickname
    };
    let body = JSON.stringify(theClaimant);
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
  // headers.append("Access-Control-Request-Method", "POST");
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._claimantsUrl, body, options)
                    .map(this.extractData = res => <Claimant[]> res.json())
                    .do(data => {
                      console.log(data);
                      this._claimantList.next(data);
                    })
                    .catch(this.handleError);


  }

  deleteClaimant (Id: string): Observable<Claimant[]> {

    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    options.body = JSON.stringify({ Id });

    return this.http.delete(this._claimantsUrl, options)
                    .map(this.extractData = res => <Claimant[]> res.json())
                    .do(data => {
                      console.log(data);
                      this._claimantList.next(data);
                    })
                    .catch(this.handleError);
  }

  // TODO: improve me
  private handleError (error: Response) {
    console.error("handling the error: " + error);
    return Observable.throw(error.json().error || "Server error");
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error("Bad response status: " + res.status);
    }
    let body = res.json();
    return body.data || { };
  }
}
