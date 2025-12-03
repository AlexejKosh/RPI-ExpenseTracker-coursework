import { generateID } from '../utils.js';
import { UserAction, UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class LimitModel extends Observable {
  #listLimits = [];
  #limitsApiService = null;

  constructor({limitsApiService}) {
    super();
    this.#limitsApiService = limitsApiService;
  }

  get limits() {
    return this.#listLimits;
  }

  async addLimit(year, month, amount) {
    const newLimit = {
      year: year,
      month: month,
      amount: amount,
      id: generateID()
    };
    try {
      const createdLimit = await this.#limitsApiService.addLimit(newLimit);
      this.#listLimits.push(createdLimit);
      this._notify(UserAction.ADD_LIMIT, createdLimit);
      return newLimit;
    } catch (err) {
      console.error('Ошибка при добавлении лимита на сервер:', err);
      throw err;
    }
  }

  async deleteLimit(limitId) {
    try {
      await this.#limitsApiService.deleteLimit(limitId)
      const leftLimits = this.#listLimits.filter(l => l.id !== limitId);
      this.#listLimits = leftLimits;
      this._notify(UserAction.DELETE_LIMIT, limitId);
    } catch (err) {
      console.error('Ошибка при удаления лимита с сервера:', err);
      throw err;
    }
  }

  async init() {
    try {
      const limits = await this.#limitsApiService.limits
      this.#listLimits = limits;
    } catch(err) {
      this.#listLimits = []
    }
    this._notify(UpdateType.INIT);
  }
}