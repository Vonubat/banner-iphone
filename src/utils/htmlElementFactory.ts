import { HTMLElementProps } from '../types/utilTypes';

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
}
