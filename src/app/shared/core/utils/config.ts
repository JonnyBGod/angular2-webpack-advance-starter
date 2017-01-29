// Feel free to extend this interface
// depending on your app specific config.
export interface EnvConfig {
  API?: string;
  ENV?: string;
}

export interface IPlatforms {
  WEB: string;
  MOBILE_NATIVE: string;
  MOBILE_HYBRID: string;
  DESKTOP: string;
}

declare var ENV;

export class Config {

  public static pageClass: any;

  // supported platforms
  public static PLATFORMS: IPlatforms = {
    WEB: 'web',
    MOBILE_NATIVE: 'mobile_native',
    MOBILE_HYBRID: 'mobile_hybrid',
    DESKTOP: 'desktop'
  };

  // current target (defaults to web)
  public static PLATFORM_TARGET: string = Config.PLATFORMS.WEB;

  // convenient platform checks
  public static IS_WEB(): boolean {
    return Config.PLATFORM_TARGET === Config.PLATFORMS.WEB;
  }

  public static IS_MOBILE_NATIVE(): boolean {
    return Config.PLATFORM_TARGET === Config.PLATFORMS.MOBILE_NATIVE;
  }

  public static IS_MOBILE_HYBRID(): boolean {
    return Config.PLATFORM_TARGET === Config.PLATFORMS.MOBILE_HYBRID;
  }

  public static IS_DESKTOP(): boolean {
    return Config.PLATFORM_TARGET === Config.PLATFORMS.DESKTOP;
  }

  public static ENVIRONMENT(): EnvConfig {
    if (Config.IS_MOBILE_NATIVE()) {
      return {
        API: 'your api endpoint',
        ENV: 'nativescript'
      };
    } else {
      // return JSON.parse('<%= ENV_CONFIG %>');
      return {
        API: 'your api endpoint',
        ENV
      };
    }
  }
}
