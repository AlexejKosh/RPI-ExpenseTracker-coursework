import ApiService from './framework/view/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class RecordsApiService extends ApiService {
  get records() {
    return this._load({url: 'records'})
      .then(ApiService.parseResponse);
  }

  async addRecord(record) {
    const response = await this._load({
      url: 'records',
      method: Method.POST,
      body: JSON.stringify(record),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });
    return ApiService.parseResponse(response)
  }

  async deleteRecord(recordId) {
    await this._load({
      url: `records/${recordId}`,
      method: Method.DELETE
    });
  }
}