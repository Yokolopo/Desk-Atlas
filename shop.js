(() => {
  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.shop-card')];
  const count = document.querySelector('#shop-count');
  function setFilter(filter) {
    let visible = 0;
    cards.forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visible += 1;
    });
    filters.forEach((button) => {
      const selected = button.dataset.filter === filter;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    count.textContent = `Showing ${visible} considered ${visible === 1 ? 'pick' : 'picks'}`;
  }
  filters.forEach((button) => button.addEventListener('click', () => setFilter(button.dataset.filter)));
})();
