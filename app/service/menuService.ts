import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MenuService {
  constructor(private http: Http) {}

  get(type) {
    let searchParams = new URLSearchParams();
    searchParams.append('type', type);
    return this.http.get('menus', { search: searchParams })
      .map(response => {
        return response.json().menus;
      });
  }
  
  add(menus) {
    return this.http.post('menus', menus)
      .map(response => {});
  }
  
  delete(menus) {
    return this.http.delete(`menus/${menus.id}`)
      .map(response => {});
  }
}
