import ApiService from './framework/view/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class LimitsApiService extends ApiService {
  get limits() {
    return this._load({url: 'limit'})
      .then(ApiService.parseResponse);
  }

  async addLimit(limit) {
    const response = await this._load({
      url: 'limit',
      method: Method.POST,
      body: JSON.stringify(limit),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });
    return ApiService.parseResponse(response)
  }

  async deleteLimit(limitId) {
    await this._load({
      url: `limit/${limitId}`,
      method: Method.DELETE
    });
  }
}