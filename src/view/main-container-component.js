import { AbstractComponent } from '../framework/view/abstract-component.js';

function MainContainerComponentTemplate() {
  return (
    `<main>
    
    </main>`
  );
}

export default class MainContainerComponent extends AbstractComponent{
  get template() {
    return MainContainerComponentTemplate();
  }
}