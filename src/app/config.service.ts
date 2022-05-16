import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private _http: HttpClient) { }
  private _config!: any

  loadAppConfig() {
    return this._http.get('../../configuration.json')
      .toPromise()
      .then(data => {
        this._config = data;
      });
  }

  get maxResultByPage() {
    if (!this._config) {
      this.loadAppConfig()
    }
    return this._config.maxResultByPage;
  }

}
