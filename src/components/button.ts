import { APPLE_LINK } from '../constants';
import { LocalizationService } from '../services/localizationService';
import { ActiveLink } from '../types/button';
import { createHTMLElement } from '../utils/htmlElementFactory';

export class Button extends LocalizationService {
  private static anchor: HTMLAnchorElement | undefined;

  public static set activeLink(link: ActiveLink) {
    if (Button.anchor) {
      Button.anchor.href = link;
    }
  }

  private createButton(): HTMLAnchorElement {
    Button.anchor = createHTMLElement('a', {
      attributes: [['href', APPLE_LINK]],
    });
    const btn = createHTMLElement('button', {
      cssClassList: ['button'],
      innerHtml: this.langData.Continue,
    });

    Button.anchor.appendChild(btn);
    return Button.anchor;
  }

  public render(): HTMLAnchorElement {
    return this.createButton();
  }
}
