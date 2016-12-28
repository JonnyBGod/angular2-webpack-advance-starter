// app
import { BaseComponent } from '../../core/index';
import { LogService } from '../../core/services/index';

@BaseComponent({
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private log: LogService) {}

  public openLanguages(e: any): void {
    this.log.debug('openLanguages');
  }
}
