import HeaderComponent from './view/header-component.js';
import MainContainerComponent from './view/main-container-component.js';
import LogComponent from './view/log-component.js';
import RecordComponent from './view/record-component.js';
import ChartComponent from './view/chart-component.js';
import ExpenseAddComponent from './view/expense-add-component.js';
import EarningAddComponent from './view/earning-add-component.js';
import LimitAddComponent from './view/limit-add-component.js';
import {render, RenderPosition} from './framework/render.js';

const bodyContainer = document.querySelector('.app');
const mainContainer = new MainContainerComponent();
const logContainer = new LogComponent();

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(mainContainer, bodyContainer)
render(logContainer, mainContainer.element);

const recordsContainer = logContainer.element.querySelector('.records-container');
render(new RecordComponent, recordsContainer)

render(new ChartComponent(), mainContainer.element)
render(new ExpenseAddComponent(), mainContainer.element)
render(new EarningAddComponent(), mainContainer.element)
render(new LimitAddComponent(), mainContainer.element)