(function () {
  const body = document.body;
  const savedTheme = localStorage.getItem('bgTheme');
  if (savedTheme === 'light') body.classList.add('light-mode');

  const themeBtns = document.querySelectorAll('[data-theme-toggle]');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      localStorage.setItem('bgTheme', body.classList.contains('light-mode') ? 'light' : 'dark');
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => revealObserver.observe(el));

  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('[data-category]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.filter;
      portfolioCards.forEach(card => {
        card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
      });
    });
  });

  const form = document.getElementById('testimonialForm');
  const list = document.getElementById('testimonialList');
  const defaultTestimonials = [
    { name: 'A Fashion Brand Owner', role: 'Client', message: 'BG Graphics Concept gave my brand a clean and premium design that made my advert stand out online.' },
    { name: 'Restaurant Business Owner', role: 'Client', message: 'The flyer design was bold, attractive, and helped us promote our menu professionally.' },
    { name: 'Church Media Team', role: 'Client', message: 'Fast delivery, quality design, and smooth communication from start to finish.' }
  ];

  function getTestimonials() {
    const saved = localStorage.getItem('bgTestimonials');
    return saved ? JSON.parse(saved) : defaultTestimonials;
  }

  function saveTestimonials(items) {
    localStorage.setItem('bgTestimonials', JSON.stringify(items));
  }

  function renderTestimonials() {
    if (!list) return;
    const items = getTestimonials();
    list.innerHTML = items.map(item => `
      <div class="testimonial-card reveal visible">
        <h3>${item.name}</h3>
        <p>${item.message}</p>
        <small>${item.role || 'Website Visitor'}</small>
      </div>
    `).join('');
  }

  if (form) {
    renderTestimonials();
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('tName').value.trim();
      const role = document.getElementById('tRole').value.trim();
      const message = document.getElementById('tMessage').value.trim();
      if (!name || !message) return;
      const items = getTestimonials();
      items.unshift({ name, role, message });
      saveTestimonials(items);
      renderTestimonials();
      form.reset();
      alert('Thank you. Your testimonial has been added on this browser.');
    });
  } else if (list) {
    renderTestimonials();
  }
})();
