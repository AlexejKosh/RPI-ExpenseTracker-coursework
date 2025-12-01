import { AbstractComponent } from '../framework/view/abstract-component.js';

function LimitAddComponentTemplate() {
  return (
    `<div class="modal-overlay-limit hidden">
        <div class="limit-add-container">
            <h2><b>Добавить лимит</b><br>(октябрь 2025)</h2>
            <form class="limit-add-form">
                <label class="form-label">
                    Сумма (₽)
                    <input type="number" class="form-input" placeholder="Например: 25000" min="0">
                </label>
                <button type="submit" class="form-button">Добавить</button>
            </form>
        </div>
    </div>`
  );
}

export default class LimitAddComponent extends AbstractComponent{

  constructor() {
    super();

    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) {
        this.element.classList.add('hidden');
      }
    });

    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      this.element.classList.add('hidden');
    });
  }

  get template() {
    return LimitAddComponentTemplate();
  }
}