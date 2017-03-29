// libs
import { TranslateService, TranslateLoader } from '@ngx-translate/core';

// module
import { MultilingualService } from '../index';

// mocks
import { TranslateMock } from './mocks/ng2-translate.mock';
import { TranslateLoaderMock } from './mocks/ng2-translate-loader.mock';

export function TEST_MULTILINGUAL_PROVIDERS(): any[] {

  let providers: any[] = [
    { provide: TranslateLoader, useClass: TranslateLoaderMock },
    { provide: TranslateService, useClass: TranslateMock },
    MultilingualService
  ];

  return providers;
}
