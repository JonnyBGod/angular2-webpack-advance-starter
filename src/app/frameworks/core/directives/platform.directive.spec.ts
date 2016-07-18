import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component, provide } from '@angular/core';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

import { PlatformDirective } from './platform.directive';
import { t } from 'frameworks/test';
import { WindowService } from 'frameworks/core';
import { WindowMock } from 'frameworks/core/testing';

@Component({
  viewProviders: [
    provide(WindowService, { useClass: WindowMock})
  ],
  selector: 'test',
  template: `<div platform></div>`,
  directives: [PlatformDirective]
})
class TestComponent {}

t.describe('core: PlatformDirective', () => {
  
  // specs
  t.it('should add platform class',
    t.inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      tcb.createAsync(TestComponent)
        .then((rootTC:any) => {
          rootTC.detectChanges();
          let compDOMEl = rootTC.debugElement.children[0].nativeElement;
          expect(getDOM().classList(compDOMEl)).toEqual(['web']);
        });
    }));
});
