import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class ServiceLogin {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.post('/api/auth', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                let user = response.json();
                if (user) {                    
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    register(data){
        return this.http.post('user', data)
      .map(response => {}); 
    }
}