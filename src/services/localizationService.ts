import en from '../localization/en.json';
import es from '../localization/es.json';
import fr from '../localization/fr.json';
import ja from '../localization/ja.json';
import nl from '../localization/nl.json';
import ru from '../localization/ru.json';
import zh from '../localization/zh.json';
import { Localization } from '../types/localization';

export class LocalizationService {
  private _en: Localization = en;

  private _es: Localization = es;

  private _fr: Localization = fr;

  private _ja: Localization = ja;

  private _nl: Localization = nl;

  private _ru: Localization = ru;

  private _zh: Localization = zh;

  public get en() {
    return this._en;
  }

  public get es() {
    return this._es;
  }

  public get fr() {
    return this._fr;
  }

  public get ja() {
    return this._ja;
  }

  public get nl() {
    return this._nl;
  }

  public get ru() {
    return this._ru;
  }

  public get zh() {
    return this._zh;
  }
}
