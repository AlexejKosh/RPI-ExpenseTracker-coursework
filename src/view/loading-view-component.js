import { AbstractComponent } from '../framework/view/abstract-component.js';

function LoadingViewCompnonentTemplate() {
  return (
    `<p class="loading">
        <i>Загрузка...</i>
    </p>`
  );
}

export default class LoadingViewCompnonent extends AbstractComponent{
  get template() {
    return LoadingViewCompnonentTemplate();
  }
}