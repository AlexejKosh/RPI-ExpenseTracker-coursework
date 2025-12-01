import { AbstractComponent } from '../framework/view/abstract-component.js';

function RecordComponentTemplate() {
  return (
    `<div class="expense-record">
        <p class="record-info"><b>Описание расхода:</b> Проезд на метро</p>
        <p class="record-info"><b>Категория:</b> Транспорт</p>
        <p class="record-info"><b>Сумма:</b> 43.00₽</p>
        <p class="record-info"><b>время:</b> 20:43</p>
        <button class="record-delete-button">Удалить</button>
    </div>`
  );
}

export default class RecordComponent extends AbstractComponent{
  get template() {
    return RecordComponentTemplate();
  }
}