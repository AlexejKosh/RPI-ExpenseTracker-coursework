import ChartFieldComponent from '../view/chart-field-component.js';
import { render } from '../framework/render.js';

export default class RecordsLogPresenter {
  #boardContainer = null;
  #startDate = null;
  #endDate = null;
  #currentCategory = null;
  #chartModel = null;
  #chartFieldComponent = new ChartFieldComponent();

  constructor({ boardContainer, chartModel }) {
    this.#boardContainer = boardContainer;
    this.#chartModel = chartModel;
    this.#startDate = boardContainer.querySelector('.chart-filter-start-date .date-picker');
    this.#endDate = boardContainer.querySelector('.chart-filter-end-date .date-picker');
    this.#currentCategory = boardContainer.querySelector('chart-filter-category .form-input');
    this.#chartModel.addObserver(() => this.#handleModelChange(
        this.#startDate,
        this.#endDate,
        this.#currentCategory
    ));
  }

  init() {
    this.#renderBoard();
  }

  #handleModelChange(startDate, endDate, currentCategory) {
    this.#clearBoard();
    this.#renderBoard();
  }

  #clearBoard() {
    this.#chartFieldComponent.element.innerHTML = '';
  }

  #renderBoard(date) {
    render(this.#chartFieldComponent, this.#boardContainer);
  }

  chartUpdate() {
    
  }
}