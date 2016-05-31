import {RouteComponent} from 'frameworks/core.framework';

@RouteComponent({
  selector: 'sd-navbar',
  template: require('./navbar.component.html'),
  styles: [require('./navbar.component.scss')]
})
export class NavbarComponent {
}
