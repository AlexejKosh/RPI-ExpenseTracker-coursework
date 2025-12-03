import { AbstractComponent } from '../framework/view/abstract-component.js';
import { CategoryLabel } from '../const.js';

function RecordComponentTemplate(record) {
  const {description, category, amount, datetime} = record;

  const div_class = category === 'earning' ? 'earning-record' : 'expense-record';

  return (
    `<div class="${div_class}">
        <p class="record-info"><b>Описание расхода:</b> ${description}</p>
        <p class="record-info"><b>Категория:</b> ${CategoryLabel[category]}</p>
        <p class="record-info"><b>Сумма:</b> ${amount}₽</p>
        <p class="record-info"><b>время:</b> ${datetime.slice(-5)}</p>
        <button class="record-delete-button">Удалить</button>
    </div>`
  );
}

export default class RecordComponent extends AbstractComponent{
  #handleDelete = null;

  constructor({ record, onDelete }) {
    super()
    this.record = record;
    this.#handleDelete = onDelete;
    this.element.querySelector('.record-delete-button').addEventListener('click', this.#deleteClickHandler);
  }

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDelete(this.record.id);
  }

  get template() {
    return RecordComponentTemplate(this.record);
  }
}