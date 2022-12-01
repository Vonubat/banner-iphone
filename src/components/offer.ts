import { LocalizationService } from '../services/localizationService';
import { Localization } from '../types/localization';
import { createHTMLElement, createSVGElement } from '../utils/htmlElementFactory';
import {
  ANNUALLY_COST,
  ANNUALLY_ID,
  ANNUALLY_SUBSCRIBE_PRICE,
  APPLE_LINK,
  GOOGLE_LINK,
  MONTHLY_COST,
  MONTHLY_ID,
  MONTHLY_SUBSCRIBE_PRICE,
} from '../constants';
import { addPrice } from '../utils/priceHandler';
import { svgChangeSizesHelper } from '../utils/svgChangeSizesHelper';
import { Button } from './button';

export class Offer extends LocalizationService {
  sectionMonthly: HTMLDivElement | undefined;

  titleMonthly: HTMLSpanElement | undefined;

  subscribePriceMonthly: HTMLSpanElement | undefined;

  saleFeatureMonthly: HTMLDivElement | undefined;

  costMonthly: HTMLSpanElement | undefined;

  sectionAnnually: HTMLDivElement | undefined;

  titleAnnually: HTMLSpanElement | undefined;

  subscribePriceAnnually: HTMLSpanElement | undefined;

  saleFeatureAnnually: HTMLDivElement | undefined;

  costAnnually: HTMLSpanElement | undefined;

  private createOfferContainer(): HTMLDivElement {
    return createHTMLElement('div', {
      cssClassList: ['offer-container'],
    });
  }

  private createsectionMonthly(): HTMLDivElement {
    const sectionMonthly = createHTMLElement('div', {
      cssClassList: ['section', 'section__monthly', 'section__monthly_active'],
      id: MONTHLY_ID,
    });

    const bg = createSVGElement('../assets/shape-1.svg', {
      cssClassList: ['section-bg'],
      boxWidth: '151px',
      boxHeight: '180px',
    });

    sectionMonthly.appendChild(bg);
    return sectionMonthly;
  }

  private createSectionAnnually(): HTMLDivElement {
    const sectionAnnually = createHTMLElement('div', {
      cssClassList: ['section', 'section__annually'],
      id: ANNUALLY_ID,
    });

    const bg = createSVGElement('../assets/shape-2.svg', {
      cssClassList: ['section-bg'],
      boxWidth: '137px',
      boxHeight: '164px',
    });

    const saleBadge = createHTMLElement('div', {
      cssClassList: ['sale-badge'],
    });

    const badgeText = createHTMLElement('span', {
      innerHtml: this.langData['-83%'],
    });

    saleBadge.appendChild(badgeText);
    sectionAnnually.append(bg, saleBadge);

    return sectionAnnually;
  }

  private createSectionTitle(innerHtml: Localization[keyof Localization], active: boolean): HTMLSpanElement {
    return createHTMLElement('span', {
      cssClassList: active ? ['section-title', 'section-title_active'] : ['section-title'],
      innerHtml,
    });
  }

  private createSectionSubscribePrice(
    innerHtml: Localization[keyof Localization],
    active: boolean,
    price: string
  ): HTMLSpanElement {
    const modifiedInnerHtml = addPrice(innerHtml, price);
    return createHTMLElement('span', {
      cssClassList: active
        ? ['section-subscribe-price', 'section-subscribe-price_active']
        : ['section-subscribe-price'],
      innerHtml: modifiedInnerHtml,
    });
  }

  private createSectionSaleFeature(innerHtml: Localization[keyof Localization], active: boolean): HTMLDivElement {
    const saleFeatureContainer = createHTMLElement('div', {
      cssClassList: active
        ? ['section-sale-feature-container', 'section-sale-feature-container_active']
        : ['section-sale-feature-container'],
    });

    const saleFeatureText = createHTMLElement('span', {
      cssClassList: active
        ? ['section-sale-feature-text', 'section-sale-feature-text_active']
        : ['section-sale-feature-text'],
      innerHtml,
    });

    saleFeatureContainer.appendChild(saleFeatureText);
    return saleFeatureContainer;
  }

  private createSectionCost(
    innerHtml: Localization[keyof Localization],
    active: boolean,
    price: string
  ): HTMLSpanElement {
    const modifiedInnerHtml = addPrice(innerHtml, price);
    return createHTMLElement('span', {
      cssClassList: active ? ['section-cost', 'section-cost_active'] : ['section-cost'],
      innerHtml: modifiedInnerHtml,
    });
  }

  private buildSectionMonthly(): HTMLDivElement {
    this.sectionMonthly = this.createsectionMonthly();
    this.titleMonthly = this.createSectionTitle(this.langData.Monthly, true);
    this.subscribePriceMonthly = this.createSectionSubscribePrice(
      this.langData['<strong>{{price}}</strong><br>per month'],
      true,
      MONTHLY_SUBSCRIBE_PRICE
    );
    this.saleFeatureMonthly = this.createSectionSaleFeature(this.langData['3 DAYS FREE'], true);
    this.costMonthly = this.createSectionCost(this.langData['{{price}}/month'], true, MONTHLY_COST);

    this.sectionMonthly.append(
      this.titleMonthly,
      this.subscribePriceMonthly,
      this.saleFeatureMonthly,
      this.costMonthly
    );
    return this.sectionMonthly;
  }

  private buildSectionAnnually(): HTMLDivElement {
    this.sectionAnnually = this.createSectionAnnually();
    this.titleAnnually = this.createSectionTitle(this.langData.Annually, false);
    this.subscribePriceAnnually = this.createSectionSubscribePrice(
      this.langData['<strong>{{price}}</strong><br>per month'],
      false,
      ANNUALLY_SUBSCRIBE_PRICE
    );
    this.saleFeatureAnnually = this.createSectionSaleFeature(this.langData['MOST POPULAR'], false);
    this.costAnnually = this.createSectionCost(this.langData['{{price}}/month'], false, ANNUALLY_COST);

    this.sectionAnnually.append(
      this.titleAnnually,
      this.subscribePriceAnnually,
      this.saleFeatureAnnually,
      this.costAnnually
    );
    return this.sectionAnnually;
  }

  private handleSectionState(id: typeof MONTHLY_ID | typeof ANNUALLY_ID): void {
    if (id === MONTHLY_ID) {
      this.sectionMonthly?.classList.add('section__monthly_active');
      this.sectionAnnually?.classList.remove('section__annually_active');

      svgChangeSizesHelper(this.sectionMonthly?.children[0] as SVGSVGElement, '151px', '180px');
      svgChangeSizesHelper(this.sectionAnnually?.children[0] as SVGSVGElement, '137px', '164px');

      this.sectionAnnually?.children[1]?.classList.remove('sale-badge_active');
    }

    if (id === ANNUALLY_ID) {
      this.sectionMonthly?.classList.remove('section__monthly_active');
      this.sectionAnnually?.classList.add('section__annually_active');

      svgChangeSizesHelper(this.sectionMonthly?.children[0] as SVGSVGElement, '137px', '164px');
      svgChangeSizesHelper(this.sectionAnnually?.children[0] as SVGSVGElement, '151px', '180px');

      this.sectionAnnually?.children[1]?.classList.add('sale-badge_active');
    }
  }

  private handleTitleState(id: typeof MONTHLY_ID | typeof ANNUALLY_ID): void {
    if (id === MONTHLY_ID) {
      this.titleMonthly?.classList.add('section-title_active');
      this.titleAnnually?.classList.remove('section-title_active');
    }

    if (id === ANNUALLY_ID) {
      this.titleMonthly?.classList.remove('section-title_active');
      this.titleAnnually?.classList.add('section-title_active');
    }
  }

  private handleSubscribePriceState(id: typeof MONTHLY_ID | typeof ANNUALLY_ID): void {
    if (id === MONTHLY_ID) {
      this.subscribePriceMonthly?.classList.add('section-subscribe-price_active');
      this.subscribePriceAnnually?.classList.remove('section-subscribe-price_active');
    }

    if (id === ANNUALLY_ID) {
      this.subscribePriceMonthly?.classList.remove('section-subscribe-price_active');
      this.subscribePriceAnnually?.classList.add('section-subscribe-price_active');
    }
  }

  private handleSaleFeatureState(id: typeof MONTHLY_ID | typeof ANNUALLY_ID): void {
    if (id === MONTHLY_ID) {
      this.saleFeatureMonthly?.classList.add('section-sale-feature-container_active');
      this.saleFeatureMonthly?.firstElementChild?.classList.add('section-sale-feature-text_active');
      this.saleFeatureAnnually?.classList.remove('section-sale-feature-container_active');
      this.saleFeatureAnnually?.firstElementChild?.classList.remove('section-sale-feature-text_active');
    }

    if (id === ANNUALLY_ID) {
      this.saleFeatureMonthly?.classList.remove('section-sale-feature-container_active');
      this.saleFeatureMonthly?.firstElementChild?.classList.remove('section-sale-feature-text_active');
      this.saleFeatureAnnually?.classList.add('section-sale-feature-container_active');
      this.saleFeatureAnnually?.firstElementChild?.classList.add('section-sale-feature-text_active');
    }
  }

  private handleCostState(id: typeof MONTHLY_ID | typeof ANNUALLY_ID): void {
    if (id === MONTHLY_ID) {
      this.costMonthly?.classList.add('section-cost_active');
      this.costAnnually?.classList.remove('section-cost_active');
    }

    if (id === ANNUALLY_ID) {
      this.costMonthly?.classList.remove('section-cost_active');
      this.costAnnually?.classList.add('section-cost_active');
    }
  }

  private handleState(e: MouseEvent): void {
    const { id } = e.currentTarget as HTMLDivElement;
    if (id === MONTHLY_ID || id === ANNUALLY_ID) {
      this.handleSectionState(id);
      this.handleTitleState(id);
      this.handleSubscribePriceState(id);
      this.handleSaleFeatureState(id);
      this.handleCostState(id);
    }

    if (id === MONTHLY_ID) {
      Button.activeLink = APPLE_LINK;
    }

    if (id === ANNUALLY_ID) {
      Button.activeLink = GOOGLE_LINK;
    }
  }

  public render(): HTMLDivElement {
    const offerContainer = this.createOfferContainer();
    const sectionMonthly = this.buildSectionMonthly();
    const sectionAnnually = this.buildSectionAnnually();

    sectionMonthly.addEventListener('click', (e: MouseEvent) => this.handleState(e));
    sectionAnnually.addEventListener('click', (e: MouseEvent) => this.handleState(e));

    offerContainer.append(sectionMonthly, sectionAnnually);
    return offerContainer;
  }
}
