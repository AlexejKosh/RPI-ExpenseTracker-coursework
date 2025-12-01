import { AbstractComponent } from '../framework/view/abstract-component.js';

function ChartFieldComponentTemplate() {
  return (
    `<div class="chart-container">
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
            </div>`
  );
}

export default class ChartFieldComponent extends AbstractComponent{
  get template() {
    return ChartFieldComponentTemplate();
  }
}