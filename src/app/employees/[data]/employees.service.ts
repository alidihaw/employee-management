import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AppData } from '../../app.data';
import { Store } from '@ngxs/store';
import { EmployeesAction } from './employees.action';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "apikey": environment.nyAPIKey
  })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  isActive = false;
  constructor(private _http: HttpClient, private appData: AppData, private store: Store) {}

  setLoad() {
    if (!this.isActive) {
      console.log("changesIsLoadingAPI");
      this.appData.changesIsLoadingAPI(true);
      this.isActive = true;
    }
  }

  setUnload() {
    setTimeout(() => {
      if (this.isActive) {
        this.appData.changesIsLoadingAPI(false);
        this.isActive = false;
      }
    }, 1000);
  }

  public getEmployees(): Observable<any> {
    console.log("getEmployees");
    this.setLoad();
    return this._http
      .get("assets/data/MOCK_DATA.json", {
      }).pipe(
        map((data: any) => {
          console.log("data", data);
          this.store.dispatch(new EmployeesAction.SetAll(data));
          this.setUnload();
          return data;
        }));
  }
}
