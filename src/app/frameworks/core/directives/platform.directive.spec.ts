import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

import { PlatformDirective } from './platform.directive';
import { t } from 'frameworks/test/index';
import { WindowService } from 'frameworks/core/index';
import { WindowMock } from 'frameworks/core/testing/index';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    declarations: [PlatformDirective, TestComponent]
  });
};

@Component({
  viewProviders: [
    { provide: WindowService, useClass: WindowMock }
  ],
  selector: 'test-cmp',
  template: `<div platform></div>`
})
class TestComponent { }

t.describe('core: PlatformDirective', () => {

  t.be(testModuleConfig);

  t.it('should add platform class',
    async(() => {
      TestBed.compileComponents()
        .then(() => {
          let fixture = TestBed.createComponent(TestComponent);
          fixture.detectChanges();
          let compDOMEl = fixture.debugElement.children[0].nativeElement;
          t.e(getDOM().classList(compDOMEl)).toEqual(['web']);
        });
    }));
});
