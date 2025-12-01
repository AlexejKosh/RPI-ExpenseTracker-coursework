import { AbstractComponent } from '../framework/view/abstract-component.js';

function HeaderComponentTemplate() {
  return (
    `<header class="header">
        <img src="media/logo.png" class="logo">
        <nav class="navigation">
            <ul class="nav-buttons">
                <li><button>Лимит месяца</button></li>
                <li><button>Добавить доход</button></li>
                <li><button>Добавить расход</button></li>
            </ul>
        </nav>
    </header>`
  );
}

export default class HeaderComponent extends AbstractComponent{
  
  constructor() {
    super();
    const navButtons = this.element.querySelectorAll('.nav-buttons button');

    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const modal_text = btn.textContent;
        var modal;
        switch (modal_text) {
          case 'Добавить расход':
            modal = document.querySelector('.modal-overlay-expense');
            break;
          case 'Добавить доход':
            modal = document.querySelector('.modal-overlay-earning');
            break;
          case 'Лимит месяца':
            modal = document.querySelector('.modal-overlay-limit');
            break;
        }
        if (modal) {
          modal.classList.remove('hidden');
        }
      });
    });
  }

  get template() {
    return HeaderComponentTemplate();
  }
}