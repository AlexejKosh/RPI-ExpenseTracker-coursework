import { AbstractComponent } from '../framework/view/abstract-component.js';
import { Month } from '../const.js';

function LimitAddInnerTemplate(date) {
  const year = date.slice(0,4);
  const month = date.slice(5,7);

  return (
    `<div class="limit-add-container">
        <h2><b>Добавить лимит</b><br>(${Month[month]} ${year})</h2>
        <form class="limit-add-form">
            <label class="form-label">
                Сумма (₽)
                <input type="number" id="limit-amount" class="form-input" placeholder="Введите '0' чтобы убрать лимит" min="0" required>
            </label>
            <button type="submit" class="form-button">Добавить</button>
        </form>
    </div>`
  );
}

function LimitAddComponentTemplate(date) {
  return `<div class="modal-overlay-limit hidden">${LimitAddInnerTemplate(date)}</div>`;
}

export default class LimitAddComponent extends AbstractComponent {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;

    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) {
        this.hide();
      }
    });

    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      this.#handleClick();
      this.hide();
    });
  }

  updateDate() {
    const date = document.querySelector('.log-date .date-picker').value;
    this.element.innerHTML = LimitAddInnerTemplate(date);
  }

  show() {
    this.updateDate();
    this.element.classList.remove('hidden');
  }

  hide() {
    this.element.classList.add('hidden');
  }

  get template() {
    return LimitAddComponentTemplate('2025-12');
  }
}
