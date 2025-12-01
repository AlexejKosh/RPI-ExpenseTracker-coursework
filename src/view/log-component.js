import { AbstractComponent } from '../framework/view/abstract-component.js';

function LogComponentTemplate(date) {
  return (
    `<section class="log-section">
        <h2>Журнал расходов/доходов</h2>
        <p class="limit-message">Лимит в этом месяце: 4765/25000₽</p>
        <label class="log-date">
            Выберите дату:
            <input type="date" class="date-picker" value="${date}">
        </label>
        <div class="records-container">
            
        </div>
    </section>`
  );
}

export default class LogComponent extends AbstractComponent{
  #handleChange = null;

  constructor({onChange}) {
    super()

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.date = `${year}-${month}-${day}`;
    
    this.#handleChange = onChange;
    this.element.addEventListener('change', this.#changeHandler);
  }

  #changeHandler = (evt) => {
    evt.preventDefault();
    this.#handleChange();
  }

  get template() {
    return LogComponentTemplate(this.date);
  }
}