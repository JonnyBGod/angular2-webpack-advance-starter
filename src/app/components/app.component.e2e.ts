import { t } from '../shared/test/index';

declare var browser: any;
declare var element: any;
declare var by: any;

t.describe('App', () => {

  t.be(() => {
    browser.get('/');
  });

  t.it('should have a title', () => {
    t.e(browser.getTitle()).toEqual('Angular2 Webpack Advance Starter');
  });

  t.it('should have <nav>', () => {
    t.e(element(by.css('app sd-navbar nav')).isPresent()).toEqual(true);
  });

  t.it('should have correct nav text for Home', () => {
    t.e(element(by.css('app sd-navbar nav a:first-child')).getText()).toEqual('Home');
  });

  t.it('should have correct nav text for About', () => {
    t.e(element(by.css('app sd-navbar nav a:last-child')).getText()).toEqual('About');
  });

  t.it('should contain a language switcher', () => {
    t.e(element(by.css('app sd-toolbar lang-switcher')).isPresent()).toEqual(true);
    t.e(element.all(by.css('app sd-toolbar lang-switcher option')).count()).toEqual(5);
  });

});
