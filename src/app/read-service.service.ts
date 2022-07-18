import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReadServiceService {

  data = 'assets/data.csv';

constructor(private http: HttpClient) { }

getInfo() {

return this.http.get(this.data, {responseType: 'text'});

}
}
