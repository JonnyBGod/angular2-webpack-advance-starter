// angular
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';

// app
import { LogService } from '../../core/services/index';

@Component({
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {

  constructor(private log: LogService) {}

  public openLanguages(e: any): void {
    this.log.debug('openLanguages');
  }
}
