// libs
import { Store } from '@ngrx/store';

// app
import { BaseComponent, Config, LogService, ILang } from 'frameworks/core';
import { ElectronEventService } from 'frameworks/electron';
import { MULTILINGUAL_ACTIONS, MultilingualService } from '../index';

@BaseComponent({
  selector: 'lang-switcher',
  templateUrl: 'lang-switcher.component.html',
  styleUrls: ['lang-switcher.component.scss']
})
export class LangSwitcherComponent {
  public lang: string;
  public supportedLanguages: Array<ILang> = MultilingualService.SUPPORTED_LANGUAGES;

  constructor(private log: LogService, private store: Store<any>) {
    store.take(1).subscribe((s: any) => {
      // s && s.18n - ensures testing works in all cases (since some tests dont use i18n state)
      this.lang = s && s.i18n ? s.i18n.lang : '';
    });

    if (Config.IS_DESKTOP()) {
      // allow electron menu to talk to component
      ElectronEventService.on('changeLang').subscribe((e: any) => {
        this.changeLang({ target: { value: e.detail.value } });
      });
    }
  }

  changeLang(e: any) {
    let lang = this.supportedLanguages[0].code; // fallback to default 'en'

    if (Config.IS_MOBILE_NATIVE()) {
      if (e) {
        lang = this.supportedLanguages[e.newIndex].code;
      }
    } else if (e && e.target) {
      lang = e.target.value;
    }
    this.log.debug(`Language change: ${lang}`);
    this.store.dispatch({ type: MULTILINGUAL_ACTIONS.CHANGE, payload: lang });
  }
}
