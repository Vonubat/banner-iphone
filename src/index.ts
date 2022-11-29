import './sass/index.scss';
import { App } from './app/app';
import { Header } from './layout/header';
import { Title } from './components/title';

const header = new Header().render();
const title = new Title().render();

const app = new App(header, title);
app.start();
