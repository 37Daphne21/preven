const menuButton = document.querySelector('.header__button');
const nav = document.querySelector('.header__nav');
const navLinks = document.querySelectorAll('.header__link');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');

  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '메뉴 열기');
  });
});

const processItems = document.querySelectorAll('.js-process-item');

const processObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    processItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('is-active');
      }, index * 180);
    });

    processObserver.disconnect();
  });
}, {
  threshold: 0.35,
});

if (processItems.length > 0) {
  processObserver.observe(processItems[0]);
}

const filterButtons = document.querySelectorAll('.gallery__button');
const galleryCards = document.querySelectorAll('.gallery-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');

    galleryCards.forEach((card) => {
      const isMatched = filter === 'all' || card.dataset.category === filter;

      card.classList.toggle('is-hidden', !isMatched);
    });
  });
});

const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal__image');
const modalTitle = document.querySelector('.modal__title');
const modalDesc = document.querySelector('.modal__desc');
const modalClose = document.querySelector('.modal__close');
const modalDim = document.querySelector('.modal__dim');
const galleryButtons = document.querySelectorAll('.gallery-card__button');

const openModal = (card) => {
  const image = card.querySelector('img');
  const title = card.querySelector('h3');
  const desc = card.querySelector('p');

  modalImage.src = image.src;
  modalImage.alt = image.alt;
  modalTitle.textContent = title.textContent;
  modalDesc.textContent = desc.textContent;

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-fixed');
};

const closeModal = () => {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-fixed');
};

galleryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openModal(button.closest('.gallery-card'));
  });
});

modalClose.addEventListener('click', closeModal);
modalDim.addEventListener('click', closeModal);

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) {
    closeModal();
  }
});

const parallaxTarget = document.querySelector('.js-parallax');

window.addEventListener('scroll', () => {
  if (!parallaxTarget) return;

  const moveY = window.scrollY * 0.04;

  parallaxTarget.style.transform = `translateY(${moveY}px)`;
});