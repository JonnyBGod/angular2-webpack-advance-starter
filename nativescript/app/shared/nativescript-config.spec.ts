import {t} from 'frameworks/test.framework/index';
import {NativeScriptConfig} from './nativescript-config';

t.describe('nativescript.framework: NativeScriptConfig', () => {
  
  t.it('sanity', () => {   
    t.e(NativeScriptConfig.PAGE).toBeUndefined();
  });
});
