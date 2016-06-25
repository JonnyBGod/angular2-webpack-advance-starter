import { t } from 'frameworks/test.framework/index';
import { CoreConfigService } from '../index';
import { keys } from 'lodash';

t.describe('core.framework: CoreConfigService', () => {
  t.be(() => CoreConfigService.RESET());

  t.it('PLATFORMS', () => {
    t.e(keys(CoreConfigService.PLATFORMS).length).toBe(4);
    t.e(CoreConfigService.PLATFORM_TARGET).toBeDefined();
    t.e(CoreConfigService.PLATFORMS.WEB).toBe('web');
    t.e(CoreConfigService.PLATFORMS.MOBILE_NATIVE).toBe('mobile_native');
    t.e(CoreConfigService.PLATFORMS.MOBILE_HYBRID).toBe('mobile_hybrid');
    t.e(CoreConfigService.PLATFORMS.DESKTOP).toBe('desktop');

    t.e(CoreConfigService.IS_WEB).toBeDefined();
    t.e(CoreConfigService.IS_MOBILE_NATIVE).toBeDefined();
    t.e(CoreConfigService.IS_MOBILE_HYBRID).toBeDefined();
    t.e(CoreConfigService.IS_DESKTOP).toBeDefined();
  });
  t.it('DEBUG', () => {
    t.e(CoreConfigService.DEBUG.LEVEL_1).toBe(false);
    t.e(CoreConfigService.DEBUG.LEVEL_2).toBe(false);
    t.e(CoreConfigService.DEBUG.LEVEL_3).toBe(false);
    t.e(CoreConfigService.DEBUG.LEVEL_4).toBe(false);
    t.e(CoreConfigService.IS_DEBUG_MODE()).toBe(false);
  });
});
