import { AbstractComponent } from '../framework/view/abstract-component.js';

function EarningAddComponentTemplate() {
  return (
    `<div class="modal-overlay-earning hidden">
        <div class="earning-add-container">
            <h2>Добавить доход</h2>
            <form class="earning-add-form">
                <label class="form-label">
                    Сумма (₽)
                    <input type="number" id="amount-field" class="form-input" placeholder="Например: 150" min="0" required>
                </label>
                <label class="form-label">
                    Дата и время дохода
                    <input type="datetime-local" id="datetime-field" class="form-input" required>
                </label>
                <label class="form-label">
                    Описание (до 40 символов)
                    <input type="text" id="description-field" class="form-input" name="description" maxlength="40" placeholder="Кратко опишите доход" required>
                </label>
                <button type="submit" class="form-button">Добавить</button>
            </form>
        </div>
    </div>`
  );
}

export default class EarningAddComponent extends AbstractComponent{
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;

    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) {
        this.element.classList.add('hidden');
      }
    });

    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      this.#handleClick();
      this.element.classList.add('hidden');
    });
  }

  get template() {
    return EarningAddComponentTemplate();
  }
}