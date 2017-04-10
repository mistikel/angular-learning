import { Request, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class MockXHRBackend {
  constructor() {
  }

  createConnection(request: Request) {
    var response = new Observable((responseObserver: Observer<Response>) => {
      var responseData;
      var responseOptions;
      switch (request.method) {
        case RequestMethod.Get:
          if (request.url.indexOf('menus?type=') >= 0 || request.url === 'menus') {
            var type;
            if (request.url.indexOf('?') >= 0) {
              type = request.url.split('=')[1];
              if (type === 'undefined') type = '';
            }
            var menus;
            if (type) {
              menus = this._menus.filter(menu => menu.type === type);
            } else {
              menus = this._menus;
            }
            responseOptions = new ResponseOptions({
              body: { menus: JSON.parse(JSON.stringify(menus)) },
              status: 200
            });
          } else if(request.url.endsWith("api/auth")){
              let params = JSON.parse(request.getBody());
              console.log("MOCK :"+params);
              let filterUsers = this._users.filter(user =>{
                  return user.password === params.username && user.password === params.password;
              });
              if(filterUsers.length){
                   let user = filterUsers[0];
                   responseOptions = new ResponseOptions({
                    body : {username:user.username},
                    status:200
                   });   
              }else{
                responseOptions = new ResponseOptions({status:400});
              }
          }
          else{
            var id = parseInt(request.url.split('/')[1]);
            menus = this._menus.filter(mediaItem => mediaItem.id === id);
            responseOptions = new ResponseOptions({
              body: JSON.parse(JSON.stringify(menus[0])),
              status: 200
            });
          }
          break;
        case RequestMethod.Post:
          if(request.url.endsWith("api/auth")){
              let params = JSON.parse(request.getBody());
              let filterUsers = this._users.filter(user =>{
                  return user.password === params.username && user.password === params.password;
              });
              if(filterUsers.length){
                   let user = filterUsers[0];
                   responseOptions = new ResponseOptions({
                    body : {username:user.username},
                    status:200
                   });   
              }else{
                responseOptions = new Error("Username or password not valid");
                return;
              }
          }else if(request.url.endsWith('user')){
              var user = JSON.parse(request.text().toString());
              this._users.push(user);
              responseOptions = new ResponseOptions({ status: 201 });
          }
          break;
        case RequestMethod.Delete:
          var id = parseInt(request.url.split('/')[1]);
          this._deleteMediaItem(id);
          responseOptions = new ResponseOptions({ status: 200 });
      }

      var responseObject = new Response(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return;
    });
    return { response };
  }

  _deleteMediaItem(id) {
    var menus = this._menus.find(menu => menu.id === id);
    var index = this._menus.indexOf(menus);
    if (index >= 0) {
      this._menus.splice(index, 1);
    }
  }

  _getNewId() {
    if (this._menus.length > 0) {
      return Math.max.apply(Math, this._menus.map(menu => menu.id)) + 1;
    }
  }

  _users = [
    {
      username : "agus",
      password : "agus"
    }
  ];

  _menus = [
    {
      id: 1,
      name: "Firebug",
      type:"lunch",
      isFavorite: false
    },
    {
      id: 2,
      name: "Fried Rice",
      type:"dinner",
      isFavorite: true
    }, {
      id: 3,
      name: "Ikan",
      type:"lunch",
      isFavorite: false
    }, {
      id: 4,
      name: "Nasi Padang",
      type:"lunch",
      isFavorite: true
    }, {
      id: 5,
      name: "Pempek",
      type:"breakfast",
      watchedOn: 1457166565384,
      isFavorite: false
    }
  ];
}