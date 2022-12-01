import { LocalizationService } from '../services/localizationService';
import { Localization } from '../types/localization';
import { createHTMLElement } from '../utils/htmlElementFactory';

export class Footer extends LocalizationService {
  private createFooter(): HTMLElement {
    return createHTMLElement('footer', {
      cssClassList: ['footer'],
    });
  }

  private createAutoRenewable(): HTMLSpanElement {
    return createHTMLElement('span', {
      cssClassList: ['auto-renewable'],
      innerHtml: this.langData['Auto-renewable. Cancel anytime.'],
    });
  }

  private createAnchor(innerHtml: Localization[keyof Localization]): HTMLAnchorElement {
    return createHTMLElement('a', {
      attributes: [['href', '#']],
      cssClassList: ['anchor-footer'],
      innerHtml,
    });
  }

  public render(): HTMLElement {
    const footer = this.createFooter();
    const anchorTerms = this.createAnchor(this.langData['Terms of Use']);
    const autoRenewable = this.createAutoRenewable();
    const anchorPrivacy = this.createAnchor(this.langData['Privacy Policy']);
    footer.append(anchorTerms, autoRenewable, anchorPrivacy);
    return footer;
  }
}
