// libs
import { Store } from '@ngrx/store';

// app
import { BaseComponent, RouterExtensions } from 'frameworks/core';
import { NameListService } from 'frameworks/sample';

@BaseComponent({
  selector: 'sd-home',
  templateUrl: 'home.template.html',
  styleUrls: ['home.style.scss']
})
export class HomeComponent {
  public newName: string = '';
  constructor(
    private store: Store<any>,
    public nameListService: NameListService,
    public routerext: RouterExtensions
  ) {

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

  readAbout() {
    // Try this in the {N} app
    // {N} can use these animation options
    this.routerext.navigate(['/about'], {
      transition: {
        duration: 1000,
        name: 'slideTop',
      }
    });
  }
}
