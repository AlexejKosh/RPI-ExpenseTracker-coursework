import { AbstractComponent } from '../framework/view/abstract-component.js';

function createChartTemplate({ yLabels, bars, hasError }) {
  if (hasError) {
    return `<p class="chart-empty">Данных за выбранный период и категорию нет</p>`;
  }

  const yLabelsHtml = yLabels.map((y) => `<span>${y}₽</span>`).join('');

  const barsHtml = bars
    .map(
      (bar) => `
        <div class="bar" style="height: ${bar.height}%;" title="${bar.sum}₽">
          <span class="x-label">${bar.label}</span>
        </div>`
    )
    .join('');

  return `
    <div class="chart-container">
      <div class="y-labels">${yLabelsHtml}</div>
      <div class="chart">${barsHtml}</div>
    </div>`;
}

export default class ChartFieldComponent extends AbstractComponent {
  #startDate = null;
  #endDate = null;
  #category = null;
  #records = null;

  constructor(startDateInput, endDateInput, categoryInput, records) {
    super();

    this.#startDate = startDateInput?.value || '';
    this.#endDate = endDateInput?.value || '';
    this.#category = categoryInput?.value || '';
    this.#records = records || [];
  }

  get template() {
    const data = this.prepareChartData();
    return createChartTemplate(data);
  }

  prepareChartData() {
  if (!this.#startDate || !this.#endDate || !this.#category) {
    return { hasError: true };
  }

  const start = new Date(this.#startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(this.#endDate);
  end.setHours(23, 59, 59, 999);

  if (isNaN(start) || isNaN(end) || start > end) {
    return { hasError: true };
  }

  const filtered = this.#records.filter((r) => {
    if (r.category !== this.#category) return false;

    const d = new Date(r.datetime.replace(' ', 'T'));
    return d >= start && d <= end;
  });

  if (filtered.length === 0) {
    return { hasError: true };
  }

  const ONE_DAY = 86400000;
  const totalDays = Math.ceil((end - start) / ONE_DAY);

  const periods = [];

  if (totalDays <= 20) {
    for (let i = 0; i < totalDays; i++) {
      const dayStart = new Date(start.getTime() + i * ONE_DAY);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      const dateKey = this.formatDate(dayStart);

      const sum = filtered
        .filter((r) => {
          const d = new Date(r.datetime.replace(' ', 'T'));
          return d >= dayStart && d <= dayEnd;
        })
        .reduce((s, r) => s + Number(r.amount), 0);

      periods.push({
        label: `${dateKey.split('-').reverse().join('.')}`,
        sum,
      });
    }

  } else {
    for (let i = 0; i < 12; i++) {

      const startOffset = Math.floor((totalDays / 12) * i);
      const endOffset = Math.floor((totalDays / 12) * (i + 1));

      const pStart = new Date(start.getTime() + startOffset * ONE_DAY);
      pStart.setHours(0, 0, 0, 0);

      let pEnd = new Date(start.getTime() + endOffset * ONE_DAY - 1);
      pEnd.setHours(23, 59, 59, 999);

      if (pEnd > end) pEnd = new Date(end);

      const sum = filtered.reduce((s, r) => {
        const d = new Date(r.datetime.replace(' ', 'T'));
        return d >= pStart && d <= pEnd ? s + Number(r.amount) : s;
      }, 0);

      periods.push({
        label: `${this.formatDate(pStart).split('-').reverse().join('.')} - ${this.formatDate(pEnd).split('-').reverse().join('.')}`,
        sum,
      });
    }
  }

  const maxSum = Math.max(...periods.map((p) => p.sum));
  const roundedMax = Math.ceil(maxSum / 1000) * 1000 || 1000;

  const yLabels = Array.from({ length: 11 }, (_, i) => {
    let v = (roundedMax / 10) * i;
    return roundedMax > 1000 ? Math.round(v / 100) * 100 : Math.round(v / 10) * 10;
  });

  const bars = periods.map((p) => ({
    label: p.label,
    sum: p.sum,
    height: roundedMax ? (p.sum / roundedMax) * 100 : 0,
  }));

  return { yLabels, bars, hasError: false };
}

  formatDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const da = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${da}`;
  }
}