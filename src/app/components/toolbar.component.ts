// app
import {BaseComponent, LogService} from 'frameworks/core.framework';
import {LangSwitcherComponent} from 'frameworks/i18n.framework';
import {NavbarComponent} from './navbar.component';

@BaseComponent({
  selector: 'sd-toolbar',
  template: require('./toolbar.component.html'),
  styles: [require('./toolbar.component.scss')],
  directives: [LangSwitcherComponent, NavbarComponent]
})
export class ToolbarComponent {
  
  constructor(private log: LogService) {}
  
  public openLanguages(e: any): void {
    this.log.debug('openLanguages');
  }
}
