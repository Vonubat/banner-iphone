import { LocalizationService } from '../services/localizationService';
import { createHTMLElement } from '../utils/htmlElementFactory';

export class Title extends LocalizationService {
  private createTitle(): HTMLHeadingElement {
    return createHTMLElement('h1', {
      cssClassList: ['title'],
      innerHtml: this.langData['Unlimited Access<br>to All Features'],
    });
  }

  public render(): HTMLHeadingElement {
    return this.createTitle();
  }
}
