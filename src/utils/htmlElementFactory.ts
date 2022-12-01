import { SVG_NS, XLINK_NS } from '../constants';
import { HTMLElementProps, SVGElementProps } from '../types/utilTypes';
import { svgFileNameHandler } from './svgFileNameHandler';

export class HTMLElementFactory {
  public static createHTMLElement<Tag extends keyof HTMLElementTagNameMap>(
    tagName: Tag,
    props: HTMLElementProps = {}
  ): HTMLElementTagNameMap[Tag] {
    const { cssClassList, attributes, innerHtml, id } = props;
    const element: HTMLElementTagNameMap[Tag] = document.createElement(tagName);

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

  public static createSVGElement(url: string, props: SVGElementProps = {}): SVGSVGElement {
    const { cssClassList, boxWidth = '100%', boxHeight = '100%', attributes, color, id } = props;

    const svg: SVGSVGElement = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, 'width', `${boxWidth}`);
    svg.setAttributeNS(null, 'height', `${boxHeight}`);
    svg.style.fill = `${color}`;

    const use: SVGUseElement = document.createElementNS(SVG_NS, 'use');
    use.setAttributeNS(XLINK_NS, 'xlink:href', svgFileNameHandler(url));

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
