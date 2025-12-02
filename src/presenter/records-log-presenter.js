import RecordListBoardComponent from '../view/record-list-board-component.js';
import RecordComponent from '../view/record-component.js';
import { generateID } from '../utils.js';
import { limits } from '../mock/limits.js';
import { render } from '../framework/render.js';

export default class RecordsLogPresenter {
  #boardContainer = null;
  #recordModel = null;
  #currentDate = null;
  #currentLimit = null;
  #currentSummary = null;
  #limitsList = limits
  #recordsBoardComponent = new RecordListBoardComponent();
  #boardRecords = [];

  constructor({ boardContainer, recordModel }) {
    this.#boardContainer = boardContainer;
    this.#recordModel = recordModel;
    this.#currentDate = document.querySelector('.log-date .date-picker').value;
    this.#computeSummaryAndLimit(this.#currentDate);
    this.#recordModel.addObserver(() => {
      this.#handleModelChange(this.#currentDate, this.#currentSummary, this.#currentLimit);
    });
  }

  init() {
    this.#boardRecords = [...this.#recordModel.records];
    const date = document.querySelector('.log-date .date-picker').value;
    this.#computeSummaryAndLimit(date);
    this.#renderBoard(date, this.#currentSummary, this.#currentLimit);
  }

  #handleModelChange(date, summary, limit) {
    this.#clearBoard();
    this.#renderBoard(date, summary, limit);
  }

  #clearBoard() {
    this.#recordsBoardComponent.element.innerHTML = '';
  }

  #computeSummaryAndLimit(date) {
    const monthPrefix = date.slice(0, 7);
    const filteredRecords = this.records.filter((r) => r.datetime.slice(0, 7) === monthPrefix);
    let summary = 0;
    for (const record of filteredRecords) {
      if (record.category !== 'earning') {
        summary += Number(record.amount);
      }
    }
    this.#currentSummary = summary;
    const [year, month] = date.split('-');
    const foundLimit = this.#limitsList.find((limit) => limit.year === year && limit.month === month);
    this.#currentLimit = foundLimit ? foundLimit.amount : null;
  }

  #renderBoard(date, summary, limit) {
    render(this.#recordsBoardComponent, this.#boardContainer);

    if (limit) {
      if (limit >= summary) {
        this.#recordsBoardComponent.element.innerHTML += `<p class="limit-message">Лимит в этом месяце: ${summary}/${limit}₽</p>`;
      } else {
        this.#recordsBoardComponent.element.innerHTML += `<p class="limit-message red">Лимит в этом месяце: ${summary}/${limit}₽</p>`;
      }
    }

    let filteredRecords = [];
    filteredRecords = this.records.filter((r) => r.datetime.slice(0, 10) === date);

    if (filteredRecords.length === 0) {
      this.#recordsBoardComponent.element.innerHTML += '<p>Записей за этот день нет</p>';
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

  addExpense() {
    const form = document.querySelector('.expense-add-form');

    const description = form.elements['description-field'].value.trim();
    const amount = form.elements['amount-field'].value.trim();
    const category = form.elements['category-field'].value;
    const datetime = form.elements['datetime-field'].value;

    if (!amount || !category || !datetime || !description) {
      return;
    }

    this.#recordModel.addRecord(description, amount, category, datetime.slice(0,10)+' '+datetime.slice(-5));
    form.reset();
    this.#computeSummaryAndLimit(this.#currentDate);
    this.#handleModelChange(this.#currentDate, this.#currentSummary, this.#currentLimit);
  }

  addEarning() {
    const form = document.querySelector('.earning-add-form');

    const description = form.elements['description-field'].value.trim();
    const amount = form.elements['amount-field'].value.trim();
    const datetime = form.elements['datetime-field'].value;
    const category = 'earning';    

    if (!amount || !datetime || !description) {
      return;
    }

    this.#recordModel.addRecord(description, amount, category, datetime.slice(0,10)+' '+datetime.slice(-5));
    form.reset();
    this.#computeSummaryAndLimit(this.#currentDate);
    this.#handleModelChange(this.#currentDate, this.#currentSummary, this.#currentLimit);
  }

  addLimit() {
    const year = this.#currentDate.slice(0,4);
    const month = this.#currentDate.slice(5,7);
    const amountElem = document.querySelector('#limit-amount');
    const amountRaw = amountElem ? amountElem.value.trim() : '';

    this.#limitsList = this.#limitsList.filter((l) => !(l.year === year && l.month === month));

    const amountNum = Number(amountRaw);
    const shouldAdd = amountRaw !== '' && !Number.isNaN(amountNum) && amountNum !== 0;

    if (shouldAdd) {
      const newLimit = {
        id: generateID(),
        year: year,
        month: month,
        amount: String(amountNum)
      };

      this.#limitsList.push(newLimit);
    }
    this.#computeSummaryAndLimit(this.#currentDate);
    this.#handleModelChange(this.#currentDate, this.#currentSummary, this.#currentLimit);
  }

  deleteRecord(record) {
    this.#recordModel.deleteRecord(record);
    this.#computeSummaryAndLimit(this.#currentDate);
    this.#handleModelChange(this.#currentDate, this.#currentSummary, this.#currentLimit);
  }

  changeLogByDate() {
    this.#currentDate = document.querySelector('.log-date .date-picker').value;
    this.#computeSummaryAndLimit(this.#currentDate);
    this.#handleModelChange(this.#currentDate, this.#currentSummary, this.#currentLimit);
  }

  get records() {
    return this.#recordModel.records;
  }
}