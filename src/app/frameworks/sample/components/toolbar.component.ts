// app
import { BaseComponent, LogService } from 'frameworks/core/index';

@BaseComponent({
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.template.html',
  styleUrls: ['toolbar.style.scss']
})
export class ToolbarComponent {

  constructor(private log: LogService) {}

  public openLanguages(e: any): void {
    this.log.debug('openLanguages');
  }
}
