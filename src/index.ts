import './sass/index.scss';

// for testing
import { createHTMLElement, createSVGElement } from './utils/htmlElementFactory';
import { Header } from './layout/header';

const h1 = createHTMLElement('h1', {
  innerHtml: `Unlimited Access
to All Features`,
});

const svg = createSVGElement('./assets/shape-1.svg', 'shape-1');

const header = new Header().render();

document.body.appendChild(header);
document.body.appendChild(svg);
document.body.appendChild(h1);

document.body.style.background = 'red';
