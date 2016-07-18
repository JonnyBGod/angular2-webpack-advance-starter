// app
import { BaseComponent, LogService } from 'frameworks/core';
import { LangSwitcherComponent } from 'frameworks/i18n';
import { NavbarComponent } from './navbar.component';

@BaseComponent({
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.template.html',
  styleUrls: ['toolbar.style.scss'],
  directives: [LangSwitcherComponent, NavbarComponent]
})
export class ToolbarComponent {

  constructor(private log: LogService) {}

  public openLanguages(e: any): void {
    this.log.debug('openLanguages');
  }
}
