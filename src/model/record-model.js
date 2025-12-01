import { records } from '../mock/records.js';
import { generateID } from '../utils.js';

export default class RecordModel {
  #boardRecords = records;
  #observers = [];

  get records() {
    return this.#boardRecords;
  }

  deleteRecord(record) {
    const leftRecords = this.#boardRecords.filter(r => r.id !== record.id);
    this.#boardRecords = leftRecords;
    this._notifyObservers();
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }
}