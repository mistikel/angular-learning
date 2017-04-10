import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MenuService } from "../service/menuService";

@Component({
  selector: 'mw-home',
  templateUrl: 'app/home/home.component.html',
  styleUrls:['app/home/home.component.css']
})
export class HomeComponent {
  type =""; 
  menus = [];
  paramsSubscription;

  constructor(
    private menuService: MenuService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params
      .subscribe(params => {
        let menu = params['menu'];
        if(!menu){
          menu = '';
        }else if(menu.toLowerCase() === 'list') {
          menu = '';
        }
        this.getMediaItems(menu);
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  onMediaItemDelete(menu) {
    this.menuService.delete(menu)
      .subscribe(() => {
        this.getMediaItems(this.type);
      });
  }

  getMediaItems(type) {
    this.type = type;
    this.menuService.get(type)
      .subscribe(menu => {
        this.menus = menu;
      });
  }
}
