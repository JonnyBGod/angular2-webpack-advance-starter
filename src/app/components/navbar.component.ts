// libs
import {Store} from '@ngrx/store';
import {RouterState} from 'ngrx-store-router';

// app
import {AppStoreI} from 'frameworks/app.framework';
import {RouteComponent} from 'frameworks/core.framework';

@RouteComponent({
  selector: 'sd-navbar',
  template: require('./navbar.component.html'),
  styles: [require('./navbar.component.scss')]
})
export class NavbarComponent {
  // TODO: remove when {N} router supports active states
  public activeLink: any = {
    home: true,
    about: false
  };
  
  constructor(public store: Store<AppStoreI>) {  
    store.select('router').subscribe((router: RouterState) => {
      if (!router.navigating) {
        switch (router.url) {
          case '':
            this.activeLink.home = true;
            this.activeLink.about = false;
            break;
          case '/about':
            this.activeLink.home = false;
            this.activeLink.about = true;
            break;
        }
      }
    });
  }
}
