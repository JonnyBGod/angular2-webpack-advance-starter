import { BaseComponent } from 'frameworks/core.framework';

@BaseComponent({
  selector: 'sd-about',
  template: require('./about.component.html'),
  styles: [require('./about.component.scss')]
})
export class AboutComponent {

}
