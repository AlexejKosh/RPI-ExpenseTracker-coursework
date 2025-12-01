import { AbstractComponent } from '../framework/view/abstract-component.js';

function ExpenseAddComponentTemplate() {
  return (
    `<div class="modal-overlay-expense hidden">
        <div class="expense-add-container">
            <h2>Добавить расход</h2>
            <form class="expense-add-form">
                <label class="form-label">
                    Сумма (₽)
                    <input type="number" class="form-input" placeholder="Например: 150" min="0">
                </label>
                <label class="form-label">
                    Дата и время расхода
                    <input type="datetime-local" class="form-input">
                </label>
                <label class="form-label">
                    Описание (до 40 символов)
                    <input type="text" class="form-input" name="description" maxlength="40" placeholder="Кратко опишите расход">
                </label>
                <label class="form-label">
                    Категория
                    <select class="form-input">
                        <option value="">Выберите категорию</option>
                        <option value="products">Продукты</option>
                        <option value="cafes_restaurants">Кафе и рестораны</option>
                        <option value="transport">Транспорт</option>
                        <option value="pharmacy_medicine">Аптека и медицина</option>
                        <option value="clothing_shoes">Одежда и обувь</option>
                        <option value="utilities">Коммунальные услуги</option>
                        <option value="online_shopping">Онлайн-покупки</option>
                        <option value="subscriptions">Подписки</option>
                        <option value="electronics">Электроника</option>
                        <option value="entertainment">Развлечения</option>
                    </select>
                </label>
                <button type="submit" class="form-button">Добавить</button>
            </form>
        </div>
    </div>`
  );
}

export default class ExpenseAddComponent extends AbstractComponent{
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
    return ExpenseAddComponentTemplate();
  }
}