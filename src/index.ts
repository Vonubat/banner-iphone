import './sass/index.scss';

// for testing
import { createHTMLElement, createSVGElement } from './utils/htmlElementFactory';

const h1 = createHTMLElement('h1', {
  innerHtml: `Unlimited Access
to All Features`,
});

const svg = createSVGElement('./assets/shape-1.svg', 'shape-1');

document.body.appendChild(svg);
document.body.appendChild(h1);
