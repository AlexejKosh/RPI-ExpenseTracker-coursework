import { AbstractComponent } from '../framework/view/abstract-component.js';

function recordListBoardComponentTemplate() {
  return (
    `<div class="records-board">
    
    </div>`
  );
}

export default class recordListBoardComponent extends AbstractComponent{
  get template() {
    return recordListBoardComponentTemplate();
  }
}