import { AbstractComponent } from '../framework/view/abstract-component.js';
import { CategoryLabel } from '../const.js';

function ChartComponentTemplate() {
  const options = Object.entries(CategoryLabel)
    .map(([value, label]) => {
      return `<option value="${value}">${label}</option>`;
    })
    .join('');

  return (
    `<section class="chart-section">
        <h2>Диаграмма по категориям</h2>
        <div class="filters-row">
            <label class="chart-filter-start-date">
                Начальная дата:
                <input type="date" value="" class="date-picker">
            </label>
            <label class="chart-filter-end-date">
                Конечная дата:
                <input type="date" value="" class="date-picker">
            </label>
            <label class="chart-filter-category">
                Категория
                <select class="form-input">
                    <option value="">Выберите категорию</option>
                    ${options}
                </select>
            </label>
        </div>
        <div class="chart-field">
            
        </div>
    </section>`
  );
}

export default class ChartComponent extends AbstractComponent{
  #handleChange = null;
  
  constructor({onChange}) {
    super()
    this.#handleChange = onChange;
    this.element.addEventListener('change', this.#changeHandler);
  }

  #changeHandler = (evt) => {
    evt.preventDefault();
    this.#handleChange();
  }

  get template() {
    return ChartComponentTemplate();
  }
}