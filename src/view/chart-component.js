import { AbstractComponent } from '../framework/view/abstract-component.js';

function ChartComponentTemplate() {
  return (
    `<section class="chart-section">
        <h2>Диаграмма по категориям</h2>
        <div class="filters-row">
            <label class="chart-filter-start-date">
                Начальная дата:
                <input type="date" value="2025-08-07" class="date-picker">
            </label>
            <label class="chart-filter-end-date">
                Конечная дата:
                <input type="date" value="2025-08-19" class="date-picker">
            </label>
            <label class="chart-filter-category">
                Категория
                <select class="form-input">
                    <option value="">Выберите категорию</option>
                    <option value="products" selected>Продукты</option>
                    <option value="cafes_restaurants">Кафе и рестораны</option>
                    <option value="transport">Транспорт</option>
                    <option value="pharmacy_medicine">Аптека и медицина</option>
                    <option value="clothing_shoes">Одежда и обувь</option>
                    <option value="utilities">Коммунальные услуги</option>
                    <option value="online_shopping">Онлайн-покупки</option>
                    <option value="subscriptions">Подписки</option>
                    <option value="electronics">Электроника</option>
                    <option value="entertainment">Развлечения</option>
                    <option value="earning">Доходы</option>
                </select>
            </label>
        </div>
        <div class="chart-field">
            <div class="chart-container">
                <div class="y-labels">
                    <span>0₽</span>
                    <span>1000₽</span>
                    <span>2000₽</span>
                    <span>3000₽</span>
                    <span>4000₽</span>
                    <span>5000₽</span>
                    <span>6000₽</span>
                    <span>7000₽</span>
                    <span>8000₽</span>
                    <span>9000₽</span>
                    <span>10000₽</span>
                </div>
                <div class="chart">
                    <div class="bar" style="height: 4.5%;"></div>
                    <div class="bar" style="height: 6.5%;"></div>
                    <div class="bar" style="height: 0%;"></div>
                    <div class="bar" style="height: 24.5%;"></div>
                    <div class="bar" style="height: 2.75%;"></div>
                    <div class="bar" style="height: 4.5%;"></div>
                    <div class="bar" style="height: 2.75%;"></div>
                    <div class="bar" style="height: 11.5%;"></div>
                    <div class="bar" style="height: 91.5%;"></div>
                    <div class="bar" style="height: 0%;"></div>
                    <div class="bar" style="height: 0%;"></div>
                    <div class="bar" style="height: 2.75%;"></div>
                    <div class="bar" style="height: 4.5%;"></div>
                    <div class="x-labels">
                        <span>07.08</span>
                        <span>08.08</span>
                        <span>09.08</span>
                        <span>10.08</span>
                        <span>11.08</span>
                        <span>12.08</span>
                        <span>13.08</span>
                        <span>14.08</span>
                        <span>15.08</span>
                        <span>16.08</span>
                        <span>17.08</span>
                        <span>18.08</span>
                        <span>19.08</span>
                    </div>
                </div>
            </div>
        </div>
    </section>`
  );
}

export default class ChartComponent extends AbstractComponent{
  get template() {
    return ChartComponentTemplate();
  }
}