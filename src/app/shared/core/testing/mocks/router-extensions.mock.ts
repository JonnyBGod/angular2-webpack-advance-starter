// angular
import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';

// module
import { IRouterExtensions, ExtendedNavigationExtras } from '../../index';

@Injectable()
export class RouterExtensionsMock implements IRouterExtensions {
  public navigate(commands: any[], extras?: ExtendedNavigationExtras): Promise<boolean> {
    return Promise.resolve(true);
  }

  public navigateByUrl(
    url: string | UrlTree,
    options?: ExtendedNavigationExtras
  ): Promise<boolean> {
    return Promise.resolve(true);
  }

  public back(): void {
    return;
  }
}
