import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mw-menu-item',
  templateUrl: 'app/menu/menu.component.html',
  styleUrls: ['app/menu/menu.component.css']
})
export class MenuComponent {
  @Input() menu;
  @Output() delete = new EventEmitter();

  onDelete() {
    this.delete.emit(this.menu);
  }
}
