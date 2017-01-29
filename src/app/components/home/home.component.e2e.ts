import { t, selectDropdownByValue } from 'shared/test';

declare var browser: any;
declare var element: any;
declare var by: any;

t.describe('Home', () => {

  t.be(() => {
    browser.get('/');
  });

  t.it('should have correct h2', () => {
      t.e(element(by.css('app sd-home h2')).getText()).toEqual('I love technology!');
  });

  t.it('should have an input', () => {
    t.e(element(by.css('app sd-home form input')).isPresent()).toEqual(true);
  });

  t.it('should have a list of computer scientists', () => {
    t.e(element(by.css('app sd-home ul')).getText())
      .toEqual('Edsger Dijkstra\nDonald Knuth\nAlan Turing\nGrace Hopper');
  });

  t.it('should add a name to the list using the form', () => {
    element(by.css('app sd-home form input')).sendKeys('Tim Berners-Lee');
    element(by.css('app sd-home form button')).click();
    t.e(element(by.css('app sd-home ul')).getText())
      .toEqual('Edsger Dijkstra\nDonald Knuth\nAlan Turing\nGrace Hopper\nTim Berners-Lee');
  });

  t.it('language switcher should change language', () => {
    t.e(element(by.css('app sd-home h2')).getText()).toEqual('I love technology!');
    selectDropdownByValue('app sd-toolbar lang-switcher select', 'fr', 500);
    t.e(element(by.css('app sd-home h2')).getText()).toEqual(`J'adore la technologie !`);
    t.e(element(by.css('app sd-home')).all(by.tagName('p')).first().getText())
      .toEqual(`En récompense, voici une liste de géniaux informaticiens :`);
  });

});
