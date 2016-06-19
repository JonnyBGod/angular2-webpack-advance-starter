import { DecoratorUtils } from './utils';

import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

export function FormComponent(metadata: any = {}) {
  return function(cls: any) {
    return DecoratorUtils.annotateComponent(cls, metadata, {
      directives: REACTIVE_FORM_DIRECTIVES
    });
  };
}
