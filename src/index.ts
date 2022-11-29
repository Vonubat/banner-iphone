import './sass/index.scss';
import { App } from './app/app';
import { Header } from './layout/header';
import { Title } from './components/title';
import { Content } from './components/content';

const header = new Header().render();
const title = new Title().render();
const content = new Content().render();

const app = new App(header, title, content);
app.start();
