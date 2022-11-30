import { LocalizationService } from '../services/localizationService';
import { Localization } from '../types/localization';
import { createHTMLElement, createSVGElement } from '../utils/htmlElementFactory';
import { ANNUALLY_COST, ANNUALLY_SUBSCRIBE_PRICE, MONTHLY_COST, MONTHLY_SUBSCRIBE_PRICE } from '../constants';
import { addPrice } from '../utils/priceHandler';

export class Offer extends LocalizationService {
  private createOfferContainer(): HTMLDivElement {
    return createHTMLElement('div', {
      cssClassList: ['offer-container'],
    });
  }

  private createMonthlySection(): HTMLDivElement {
    const monthlySection = createHTMLElement('div', {
      cssClassList: ['section', 'section__monthly', 'section__monthly_active'],
    });

    const bg = createSVGElement('../assets/shape-1.svg', {
      cssClassList: ['section-bg', 'section-bg__monthly'],
      boxWidth: '151px',
      boxHeight: '180px',
    });

    monthlySection.appendChild(bg);
    return monthlySection;
  }

  private createAnnuallySection(): HTMLDivElement {
    const annuallySection = createHTMLElement('div', {
      cssClassList: ['section', 'section__annually', 'section__annually_passive'],
    });

    const bg = createSVGElement('../assets/shape-2.svg', {
      cssClassList: ['section-bg', 'section-bg__annually'],
      boxWidth: '137px',
      boxHeight: '164px',
    });

    const saleBadge = createHTMLElement('div', {
      cssClassList: ['sale-badge', 'sale-badge_passive'],
    });

    const badgeText = createHTMLElement('span', {
      innerHtml: this.langData['-83%'],
    });

    saleBadge.appendChild(badgeText);
    annuallySection.append(bg, saleBadge);
    return annuallySection;
  }

  private createSectionTitle(innerHtml: Localization[keyof Localization], cssClassList: string[]): HTMLSpanElement {
    return createHTMLElement('span', {
      cssClassList: [...cssClassList],
      innerHtml,
    });
  }

  private createSectionSubscribePrice(innerHtml: Localization[keyof Localization], price: string): HTMLSpanElement {
    const modifiedInnerHtml = addPrice(innerHtml, price);
    return createHTMLElement('span', {
      cssClassList: ['section-subscribe-price'],
      innerHtml: modifiedInnerHtml,
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

  private createSectionCost(innerHtml: Localization[keyof Localization], price: string): HTMLSpanElement {
    const modifiedInnerHtml = addPrice(innerHtml, price);
    return createHTMLElement('span', {
      cssClassList: ['section-cost'],
      innerHtml: modifiedInnerHtml,
    });
  }

  private buildMonthlySection(): HTMLDivElement {
    const section = this.createMonthlySection();
    const title = this.createSectionTitle(this.langData.Monthly, ['section-title', 'section-title_active']);
    const subscribePrice = this.createSectionSubscribePrice(
      this.langData['<strong>{{price}}</strong><br>per month'],
      MONTHLY_SUBSCRIBE_PRICE
    );
    const saleFeature = this.createSectionSaleFeature(this.langData['3 DAYS FREE']);
    const cost = this.createSectionCost(this.langData['{{price}}/month'], MONTHLY_COST);

    section.append(title, subscribePrice, saleFeature, cost);
    return section;
  }

  private buildAnnuallySection(): HTMLDivElement {
    const section = this.createAnnuallySection();
    const title = this.createSectionTitle(this.langData.Annually, ['section-title', 'section-title_passive']);
    const subscribePrice = this.createSectionSubscribePrice(
      this.langData['<strong>{{price}}</strong><br>per month'],
      ANNUALLY_SUBSCRIBE_PRICE
    );
    const saleFeature = this.createSectionSaleFeature(this.langData['MOST POPULAR']);
    const cost = this.createSectionCost(this.langData['{{price}}/month'], ANNUALLY_COST);

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
