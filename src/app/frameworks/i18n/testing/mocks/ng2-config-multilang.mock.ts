export class ConfigMockMultilang {
  public init(): any {
    return null;
  }

  public getSettings(group?: string, key?: string): any {
    return {
      i18n: {
        defaultLanguage: {
          code: 'en',
          title: 'English'
        },
        availableLanguages: [
          { code: 'en', title: 'English' },
          { code: 'es', title: 'Spanish' },
          { code: 'fr', title: 'French' },
          { code: 'ru', title: 'Russian' },
          { code: 'bg', title: 'Bulgarian' }
        ]
      },
      logging: {
        DEBUG: {
          LEVEL_1: false,
          LEVEL_2: false,
          LEVEL_3: false,
          LEVEL_4: false
        }
      }
    };
  }
}
