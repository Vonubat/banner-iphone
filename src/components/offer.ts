import { LocalizationService } from '../services/localizationService';
import { Localization } from '../types/localization';
import { createHTMLElement, createSVGElement } from '../utils/htmlElementFactory';

export class Offer extends LocalizationService {
  private createOfferContainer(): HTMLDivElement {
    return createHTMLElement('div', {
      cssClassList: ['offer-container'],
    });
  }

  private createMonthlySection(): HTMLDivElement {
    const monthlySection = createHTMLElement('div', {
      cssClassList: ['monthly-section'],
    });

    const bg = createSVGElement('../assets/shape-1.svg', {
      boxWidth: '151px',
      boxHeight: '178px',
    });

    monthlySection.appendChild(bg);
    return monthlySection;
  }

  private createAnnuallySection(): HTMLDivElement {
    const annuallySection = createHTMLElement('div', {
      cssClassList: ['annually-section'],
    });

    const bg = createSVGElement('../assets/shape-2.svg', {
      boxWidth: '151px',
      boxHeight: '178px',
    });

    annuallySection.appendChild(bg);
    return annuallySection;
  }

  private createSectionTitle(innerHtml: Localization[keyof Localization]): HTMLSpanElement {
    return createHTMLElement('span', {
      cssClassList: ['section-title'],
      innerHtml,
    });
  }

  private createSectionSubscribePrice(innerHtml: Localization[keyof Localization]): HTMLSpanElement {
    return createHTMLElement('span', {
      cssClassList: ['section-subscribe-price'],
      innerHtml,
    });
  }

  private createSectionSaleFeature(innerHtml: Localization[keyof Localization]): HTMLSpanElement {
    const saleFeatureContainer = createHTMLElement('div', {
      cssClassList: ['section-sale-feature-container'],
    });

    const saleFeatureText = createHTMLElement('span', {
      cssClassList: ['section-sale-feature-text'],
      innerHtml,
    });

    saleFeatureContainer.appendChild(saleFeatureText);
    return saleFeatureContainer;
  }

  private createSectionCost(innerHtml: Localization[keyof Localization]): HTMLSpanElement {
    return createHTMLElement('span', {
      cssClassList: ['section-cost'],
      innerHtml,
    });
  }

  private buildMonthlySection(): HTMLDivElement {
    const section = this.createMonthlySection();
    const title = this.createSectionTitle(this.langData.Monthly);
    const subscribePrice = this.createSectionSubscribePrice(this.langData['<strong>{{price}}</strong><br>per month']);
    const saleFeature = this.createSectionSaleFeature(this.langData['3 DAYS FREE']);
    const cost = this.createSectionCost(this.langData['{{price}}/month']);

    section.append(title, subscribePrice, saleFeature, cost);
    return section;
  }

  private buildAnnuallySection(): HTMLDivElement {
    const section = this.createAnnuallySection();
    const title = this.createSectionTitle(this.langData.Annually);
    const subscribePrice = this.createSectionSubscribePrice(this.langData['<strong>{{price}}</strong><br>per month']);
    const saleFeature = this.createSectionSaleFeature(this.langData['MOST POPULAR']);
    const cost = this.createSectionCost(this.langData['{{price}}/month']);

    section.append(title, subscribePrice, saleFeature, cost);
    return section;
  }

  public render(): HTMLDivElement {
    const offerContainer = this.createOfferContainer();
    const monthlySection = this.buildMonthlySection();
    const annuallySection = this.buildAnnuallySection();

    offerContainer.append(monthlySection, annuallySection);
    return offerContainer;
  }
}
