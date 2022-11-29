import './sass/index.scss';
import { App } from './app/app';
import { Header } from './layout/header';

const header = new Header().render();

const app = new App(header);
app.start();
