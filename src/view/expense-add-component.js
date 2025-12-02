import { AbstractComponent } from '../framework/view/abstract-component.js';
import { CategoryLabel } from '../const.js';

function ExpenseAddComponentTemplate() {
  const options = Object.entries(CategoryLabel)
    .slice(0, -1)
    .map(([value, label]) => {
      return `<option value="${value}">${label}</option>`;
    })
    .join('');

  return (
    `<div class="modal-overlay-expense hidden">
        <div class="expense-add-container">
            <h2>Добавить расход</h2>
            <form class="expense-add-form">
                <label class="form-label">
                    Сумма (₽)
                    <input type="number" id="amount-field" class="form-input" placeholder="Например: 150" min="0" required>
                </label>
                <label class="form-label">
                    Дата и время расхода
                    <input type="datetime-local" id="datetime-field" class="form-input" required>
                </label>
                <label class="form-label">
                    Описание (до 40 символов)
                    <input type="text" id="description-field" class="form-input" maxlength="40" placeholder="Кратко опишите расход" required>
                </label>
                <label class="form-label">
                    Категория
                    <select id="category-field" class="form-input" required>
                        <option value="">Выберите категорию</option>
                        ${options}
                    </select>
                </label>
                <button type="submit" class="form-button">Добавить</button>
            </form>
        </div>
    </div>`
  );
}

export default class ExpenseAddComponent extends AbstractComponent{
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
    return ExpenseAddComponentTemplate();
  }
}