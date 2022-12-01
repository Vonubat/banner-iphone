import { LocalizationService } from '../services/localizationService';
import { CreateContentArgs } from '../types/content';
import { createHTMLElement, createSVGElement } from '../utils/htmlElementFactory';

export class Content extends LocalizationService {
  private readonly unlimDocsContentProps: CreateContentArgs = {
    iconProps: {
      url: '../assets/unlimitedDocs.svg',
      width: '26px',
      height: '15px',
    },
    titleProps: {
      cssClassList: ['content-title', 'content-title__unlim-docs'],
      innerHtml: this.langData['Unlimited documents'],
    },
  };

  private readonly exportContentProps: CreateContentArgs = {
    iconProps: {
      url: '../assets/export.svg',
      width: '20px',
      height: '22px',
    },
    titleProps: {
      cssClassList: ['content-title', 'content-title__export'],
      innerHtml: this.langData['Count mode'],
    },
  };

  private readonly ocrContentProps: CreateContentArgs = {
    iconProps: {
      url: '../assets/noAds.svg',
      width: '22px',
      height: '22px',
    },
    titleProps: {
      cssClassList: ['content-title', 'content-title__ocr'],
      innerHtml: this.langData['Text recognition (OCR)'],
    },
  };

  private createContentContainer(): HTMLDivElement {
    return createHTMLElement('div', {
      cssClassList: ['content-container'],
    });
  }

  private createContent(args: CreateContentArgs): HTMLDivElement {
    const { iconProps, titleProps } = args;

    const contentWrapper = createHTMLElement('div', {
      cssClassList: ['content-wrapper'],
    });

    const iconWrapper = createHTMLElement('div', {
      cssClassList: ['icon-wrapper'],
    });

    const icon = createSVGElement(iconProps.url, {
      boxWidth: iconProps.width,
      boxHeight: iconProps.height,
    });

    iconWrapper.appendChild(icon);

    const title = createHTMLElement('span', {
      cssClassList: [...titleProps.cssClassList],
      innerHtml: titleProps.innerHtml,
    });

    contentWrapper.append(iconWrapper, title);
    return contentWrapper;
  }

  public render(): HTMLDivElement {
    const contentContainer = this.createContentContainer();
    const unlimDocsContent = this.createContent(this.unlimDocsContentProps);
    const exportContent = this.createContent(this.exportContentProps);
    const ocrContent = this.createContent(this.ocrContentProps);

    contentContainer.append(unlimDocsContent, exportContent, ocrContent);
    return contentContainer;
  }
}
