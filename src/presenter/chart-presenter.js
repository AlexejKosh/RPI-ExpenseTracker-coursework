import ChartFieldComponent from '../view/chart-field-component.js';
import { render } from '../framework/render.js';

export default class ChartPresenter {
  #boardContainer = null;
  #startDate = null;
  #endDate = null;
  #currentCategory = null;
  #recordModel = null;
  #chartFieldComponent = null;

  constructor({ boardContainer, recordModel }) {
    this.#boardContainer = boardContainer;
    this.#recordModel = recordModel;
    this.#getData();
    this.#chartFieldComponent = new ChartFieldComponent(
      this.#startDate,
      this.#endDate,
      this.#currentCategory,
      this.records
    );
    this.#recordModel.addObserver(() => this.#handleModelChange());
  }

  init() {
    this.#renderBoard();
  }

  #handleModelChange() {
    this.#clearBoard();
    this.#renderBoard();
  }

  #clearBoard() {
    this.#boardContainer.innerHTML = '';
  }

  #renderBoard() {
    this.#getData();
    this.#chartFieldComponent = new ChartFieldComponent(
      this.#startDate,
      this.#endDate,
      this.#currentCategory,
      this.records
    );
    render(this.#chartFieldComponent, this.#boardContainer);
  }

  #getData() {
    this.#startDate = document.querySelector('#start-date-filter');
    this.#endDate = document.querySelector('#end-date-filter');
    this.#currentCategory = document.querySelector('#category-filter');
  }

  chartUpdate() {
    this.#handleModelChange();
  }

  get records() {
    return this.#recordModel.records;
  }
}