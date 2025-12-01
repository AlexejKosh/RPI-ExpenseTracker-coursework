import RecordListBoardComponent from '../view/record-list-board-component.js';
import RecordComponent from '../view/record-component.js';
import { render } from '../framework/render.js';

export default class RecordsLogPresenter {
  #boardContainer = null;
  #recordModel = null;
  #currentDate = null;
  #recordsBoardComponent = new RecordListBoardComponent();
  #boardRecords = [];

  constructor({ boardContainer, recordModel }) {
    this.#boardContainer = boardContainer;
    this.#recordModel = recordModel;
    this.#currentDate = document.querySelector('.log-date .date-picker').value;
    this.#recordModel.addObserver(() => this.#handleModelChange(this.#currentDate));
  }

  init() {
    this.#boardRecords = [...this.#recordModel.records];
    this.#renderBoard(document.querySelector('.log-date .date-picker').value);
  }

  #handleModelChange(date) {
    this.#clearBoard();
    this.#renderBoard(date);
  }

  #clearBoard() {
    this.#recordsBoardComponent.element.innerHTML = '';
  }

  #renderBoard(date) {
    render(this.#recordsBoardComponent, this.#boardContainer);
    let filteredRecords = [];
    filteredRecords = this.records.filter((r) => r.datetime.slice(0, 10) === date);

    if (filteredRecords.length === 0) {
      this.#recordsBoardComponent.element.innerHTML = '<p>Записей за этот день нет</p>';
      return;
    }

    for (const record of filteredRecords) {
      this.#renderRecord(record, this.#recordsBoardComponent.element);
    }
  }

  #renderRecord(record, container) {
    const recordComponent = new RecordComponent({ record: record, onDelete: this.deleteRecord.bind(this) });
    render(recordComponent, container);
  }

  deleteRecord(record) {
    this.#recordModel.deleteRecord(record);
    this.#handleModelChange(this.#currentDate);
  }

  changeLogByDate() {
    this.#currentDate = document.querySelector('.log-date .date-picker').value;
    this.#handleModelChange(this.#currentDate);
  }

  get records() {
    return this.#recordModel.records;
  }
}