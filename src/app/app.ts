export class App {
  private body: HTMLElement = document.body;

  private elements: HTMLElement[];

  constructor(...arg: HTMLElement[]) {
    this.elements = arg;
  }

  public start(): HTMLElement {
    this.body.append(...this.elements);
    return this.body;
  }
}
