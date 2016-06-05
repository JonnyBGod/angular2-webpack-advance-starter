// libs
import { Store } from '@ngrx/store';

// app
import { FormComponent } from 'frameworks/core.framework';
import { NameListService } from 'frameworks/app.framework';

@FormComponent({
  selector: 'sd-home',
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')]
})
export class HomeComponent {
  public newName: string = '';
  constructor(private store: Store<any>, public nameListService: NameListService) {

  }

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.nameListService.add(this.newName);
    this.newName = '';
    return false;
  }
}
