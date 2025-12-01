import { AbstractComponent } from '../framework/view/abstract-component.js';

function LogComponentTemplate() {
  return (
    `<section class="log-section">
        <h2>Журнал расходов/доходов</h2>
        <p class="limit-message">Лимит в этом месяце: 4765/25000₽</p>
        <label class="log-date">
            Выберите дату:
            <input type="date" class="date-picker" value="2025-10-10">
        </label>
        <div class="records-container">
            
        </div>
    </section>`
  );
}

export default class LogComponent extends AbstractComponent{
  get template() {
    return LogComponentTemplate();
  }
}