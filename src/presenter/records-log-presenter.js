import RecordListBoardComponent from '../view/record-list-board-component.js';
import RecordComponent from '../view/record-component.js';
import LoadingViewComponent from '../view/loading-view-component.js';
import { render } from '../framework/render.js';

export default class RecordsLogPresenter {
  #boardContainer = null;
  #recordModel = null;
  #limitModel = null;
  #currentDate = null;
  #currentLimit = null;
  #currentSummary = null;
  #recordsBoardComponent = new RecordListBoardComponent();

  constructor({ boardContainer, recordModel, limitModel }) {
    this.#boardContainer = boardContainer;
    this.#recordModel = recordModel;
    this.#limitModel = limitModel;
    this.#currentDate = document.querySelector('.log-date .date-picker').value;
    this.#computeSummaryAndLimit(this.#currentDate);
    this.#recordModel.addObserver(() => {
      this.#handleModelChange(this.#currentDate, this.#currentSummary, this.#currentLimit);
    });
  }

  async init() {
    render(this.#recordsBoardComponent, this.#boardContainer);

    const loadingComponent = new LoadingViewComponent();
    render(loadingComponent, this.#recordsBoardComponent.element);

    try {
      await this.#recordModel.init();
      await this.#limitModel.init();
    } finally {
      if (loadingComponent.element && loadingComponent.element.parentNode) {
        loadingComponent.element.remove();
        loadingComponent.removeElement();
      }
    }

    const date = document.querySelector('.log-date .date-picker').value;
    this.#computeSummaryAndLimit(date);
    this.#handleModelChange(this.#currentDate, this.#currentSummary, this.#currentLimit);
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
    const foundLimit = this.limits.find((l) => l.year === year && l.month === month);
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

  async addExpense() {
    const form = document.querySelector('.expense-add-form');

    const description = form.elements['description-field'].value.trim();
    const amount = form.elements['amount-field'].value.trim();
    const category = form.elements['category-field'].value;
    const datetime = form.elements['datetime-field'].value;

    if (!amount || !category || !datetime || !description) {
      return;
    }

    try {
      await this.#recordModel.addRecord(description, amount, category, datetime.slice(0,10)+' '+datetime.slice(-5));
      form.reset();
      this.#computeSummaryAndLimit(this.#currentDate);
      this.#handleModelChange(this.#currentDate, this.#currentSummary, this.#currentLimit);
    } catch (err) {
      console.error(`Ошибка при добавлении записи: ${err}`);
    }
  }

  async addEarning() {
    const form = document.querySelector('.earning-add-form');

    const description = form.elements['description-field'].value.trim();
    const amount = form.elements['amount-field'].value.trim();
    const datetime = form.elements['datetime-field'].value;
    const category = 'earning';    

    if (!amount || !datetime || !description) {
      return;
    }

    try {
      this.#recordModel.addRecord(description, amount, category, datetime.slice(0,10)+' '+datetime.slice(-5));
      form.reset();
      this.#computeSummaryAndLimit(this.#currentDate);
      this.#handleModelChange(this.#currentDate, this.#currentSummary, this.#currentLimit);
    } catch (err) {
      console.error(`Ошибка при добавлении записи: ${err}`);
    }
  }

  async addLimit() {
    const year = this.#currentDate.slice(0,4);
    const month = this.#currentDate.slice(5,7);
    const amountElem = document.querySelector('#limit-amount');
    const amountRaw = amountElem ? amountElem.value.trim() : '';

    try {
      const limitToDelete = this.limits.filter((l) => (l.year === year && l.month === month));
      if (limitToDelete.length !== 0) {
        await this.#limitModel.deleteLimit(limitToDelete[0].id);
      }
    } catch  (err) {
      console.error(`Ошибка при удалении лимита: ${err}`);
      return;
    }

    const amountNum = Number(amountRaw);
    const shouldAdd = amountRaw !== '' && !Number.isNaN(amountNum) && amountNum !== 0;

    try {
      if (shouldAdd) {
        await this.#limitModel.addLimit(year, month, String(amountNum));
      }
      this.#computeSummaryAndLimit(this.#currentDate);
      this.#handleModelChange(this.#currentDate, this.#currentSummary, this.#currentLimit);
    } catch {
      console.error(`Ошибка при добавлении лимита: ${err}`);
    }
  }

  async deleteRecord(recordId) {
    try {
      await this.#recordModel.deleteRecord(recordId);
      this.#computeSummaryAndLimit(this.#currentDate);
      this.#handleModelChange(this.#currentDate, this.#currentSummary, this.#currentLimit);
    } catch {
      console.error(`Ошибка при удалении записи: ${err}`);
    }
  }

  changeLogByDate() {
    this.#currentDate = document.querySelector('.log-date .date-picker').value;
    this.#computeSummaryAndLimit(this.#currentDate);
    this.#handleModelChange(this.#currentDate, this.#currentSummary, this.#currentLimit);
  }

  get records() {
    return this.#recordModel.records;
  }

  get limits() {
    return this.#limitModel.limits;
  }
}