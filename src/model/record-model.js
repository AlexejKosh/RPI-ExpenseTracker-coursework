import { generateID } from '../utils.js';
import { UpdateType, UserAction } from '../const.js';
import Observable from '../framework/observable.js';

export default class RecordModel extends Observable {
  #boardRecords = [];
  #recordsApiService = null;

  constructor({recordsApiService}) {
    super();
    this.#recordsApiService = recordsApiService;
  }

  get records() {
    return this.#boardRecords;
  }

  async addRecord(description, amount, category, datetime) {
    const newRecord = {
      description: description,
      amount: amount,
      category: category,
      datetime: datetime,
      id: generateID()
    };
    try {
      const createdRecord = await this.#recordsApiService.addRecord(newRecord);
      this.#boardRecords.push(createdRecord);
      this._notify(UserAction.ADD_RECORD, createdRecord);
      return newRecord;
    } catch (err) {
      console.error('Ошибка при добавлении записи на сервер:', err);
      throw err;
    }
  }

  async deleteRecord(recordId) {
    try {
      await this.#recordsApiService.deleteRecord(recordId);
      const leftRecords = this.#boardRecords.filter(r => r.id !== recordId);
      this.#boardRecords = leftRecords;
      this._notify(UserAction.DELETE_RECORD, recordId);
    } catch {
      console.error('Ошибка при удалении записи с сервера:', err);
      throw err;
    }
  }

  async init() {
    try {
      const records = await this.#recordsApiService.records
      this.#boardRecords = records;
    } catch(err) {
      this.#boardRecords = []
    }
    this._notify(UpdateType.INIT);
  }
}