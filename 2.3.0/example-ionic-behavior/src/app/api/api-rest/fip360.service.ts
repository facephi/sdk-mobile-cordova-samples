import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx'

@Injectable({
  providedIn: 'root'
})
export class Fip360Service {

  constructor( private http: HttpClient, private http2: HTTP ) { }
 
  url: string   = '';
  headers: any  = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    //'Content-type': 'application/json',
    //'Access-Control-Allow-Headers': 'Content-Type',
    //'Access-Control-Request-Headers': 'X-Custom-Header',
    //'Access-Control-Allow-Methods': 'POST',
    //'Access-Control-Allow-Origin' : '*',
    'client-id' : '', 
    'token-app' : '',
    'x-api-key' : '',
    //'app-name'  : ''  
  };

  getSessionId() 
  {
    return this.http.post<any[]>(
      this.url + '/api/init', {}, this.headers,
    );
  }
}