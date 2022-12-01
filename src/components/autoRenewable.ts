import { LocalizationService } from '../services/localizationService';
import { createHTMLElement } from '../utils/htmlElementFactory';

export class AutoRenewable extends LocalizationService {
  private createAutoRenewable(): HTMLSpanElement {
    return createHTMLElement('span', {
      cssClassList: ['auto-renewable'],
      innerHtml: this.langData['Auto-renewable. Cancel anytime.'],
    });
  }

  public render(): HTMLSpanElement {
    return this.createAutoRenewable();
  }
}
