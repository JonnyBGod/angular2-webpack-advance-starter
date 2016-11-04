// app
import { BaseComponent, LogService } from 'frameworks/core';

@BaseComponent({
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private log: LogService) {}

  public openLanguages(e: any): void {
    this.log.debug('openLanguages');
  }
}
