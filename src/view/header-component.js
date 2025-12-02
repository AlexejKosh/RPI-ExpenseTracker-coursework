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

export default class HeaderComponent extends AbstractComponent {

  constructor({ limitModal }) {
    super();
    const navButtons = this.element.querySelectorAll('.nav-buttons button');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        switch (btn.textContent) {
          case 'Добавить расход':
            document.querySelector('.modal-overlay-expense').classList.remove('hidden');
            break;
          case 'Добавить доход':
            document.querySelector('.modal-overlay-earning').classList.remove('hidden');
            break;
          case 'Лимит месяца':
            limitModal.show();
            break;
        }
      });
    });
  }

  get template() {
    return HeaderComponentTemplate();
  }
}