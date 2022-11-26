import { SVG_NS, XLINK_NS } from '../constants';
import { HTMLElementProps, SVGElementProps } from '../types/utilTypes';

export class HTMLElementFactory {
  public static createHTMLElement(tagName: keyof HTMLElementTagNameMap, props: HTMLElementProps = {}): HTMLElement {
    const { cssClassList, attributes, innerHtml, id } = props;
    const element: HTMLElement = document.createElement(tagName);

    if (cssClassList) {
      element.classList.add(...cssClassList);
    }

    if (attributes) {
      attributes.forEach(([qualifiedName, value]: [string, string]): void => {
        element.setAttribute(qualifiedName, value);
      });
    }

    if (innerHtml) {
      element.innerHTML = innerHtml;
    }

    if (id) {
      element.id = id;
    }

    return element;
  }

  public static createSVGElement(url: string, type: string, props: SVGElementProps = {}): SVGSVGElement {
    const { cssClassList, boxWidth = '100%', boxHeight = '100%', attributes, color, id } = props;

    const svg: SVGSVGElement = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, 'width', `${boxWidth}`);
    svg.setAttributeNS(null, 'height', `${boxHeight}`);
    svg.style.fill = `${color}`;

    const use: SVGUseElement = document.createElementNS(SVG_NS, 'use');
    use.setAttributeNS(XLINK_NS, 'xlink:href', `${url}#${type}`);

    svg.appendChild(use);

    if (cssClassList) {
      svg.classList.add(...cssClassList);
    }

    if (attributes) {
      attributes.forEach(([qualifiedName, value]: [string, string]): void => {
        svg.setAttribute(qualifiedName, value);
      });
    }

    if (id) {
      svg.id = id;
    }

    return svg;
  }
}

export const { createHTMLElement, createSVGElement } = HTMLElementFactory;
