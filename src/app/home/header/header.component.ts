import { Component, EventEmitter, Output,Input } from '@angular/core';
import { IUser } from '../../security/models/iuser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() user: IUser | null = null;
  @Output() viewChange = new EventEmitter<string>();

  changeView(view: string) {
    this.viewChange.emit(view);
  }
}