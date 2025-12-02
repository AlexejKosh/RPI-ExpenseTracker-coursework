import HeaderComponent from './view/header-component.js';
import MainContainerComponent from './view/main-container-component.js';
import LogComponent from './view/log-component.js';
import ChartComponent from './view/chart-component.js';
import ExpenseAddComponent from './view/expense-add-component.js';
import EarningAddComponent from './view/earning-add-component.js';
import LimitAddComponent from './view/limit-add-component.js';
import RecordsLogPresenter from './presenter/records-log-presenter.js';
import ChartPresenter from './presenter/chart-presenter.js'
import RecordModel from './model/record-model.js';
import {render, RenderPosition} from './framework/render.js';

const bodyContainer = document.querySelector('.app');
const mainContainer = new MainContainerComponent();
const logContainer = new LogComponent({
  onChange: handleLogDateChange
});
const chartContainer = new ChartComponent({
    onChange: handleChartUpdate
});

render(new ExpenseAddComponent({
  onClick: handleAddExpense
}), mainContainer.element);
render(new EarningAddComponent({
  onClick: handleAddEarning
}), mainContainer.element);
const limitAddComponent = new LimitAddComponent({
  onClick: handleAddLimit
});
render(limitAddComponent, mainContainer.element);

render(new HeaderComponent({
  limitModal: limitAddComponent
}), bodyContainer, RenderPosition.AFTERBEGIN)
render(mainContainer, bodyContainer)
render(logContainer, mainContainer.element);

const recordModel = new RecordModel();
const recordsLogPresenter = new RecordsLogPresenter({
  boardContainer: logContainer.element.querySelector('.records-container'),
  recordModel
});

render(chartContainer, mainContainer.element)
const chartPresenter = new ChartPresenter({
  boardContainer: chartContainer.element.querySelector('.chart-field'),
  recordModel
});

recordsLogPresenter.init();
chartPresenter.init();

function handleLogDateChange() {
  recordsLogPresenter.changeLogByDate();
}

function handleAddExpense() {
  recordsLogPresenter.addExpense();
}

function handleAddEarning() {
  recordsLogPresenter.addEarning();
}

function handleAddLimit() {
  recordsLogPresenter.addLimit();
}

function handleChartUpdate() {
  chartPresenter.chartUpdate();
}