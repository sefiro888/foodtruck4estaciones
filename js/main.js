/**
 * FULL TRACK 4 ESTACIONES — MAIN JAVASCRIPT
 * Lógica interactiva: navegación, estado de apertura en vivo,
 * filtros de carta y generadores de mensajes para WhatsApp.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initLiveScheduleStatus();
  initMenuFilters();
  initEventForm();
  initContactForm();
  // Inicializar componentes interactivos avanzados
  initEmbersCanvas();
  init3DTilt();
  initScrollReveal();
});

/* ==========================================================================
   1. NAVBAR & MENÚ MÓVIL
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  // Scroll effect on header
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }

  // Mobile menu toggle
  if (menuToggle && mainNav) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', menuToggle.classList.contains('active') ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', menuToggle.classList.contains('active') ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    });

    // Close when clicking nav links
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mainNav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        menuToggle.focus();
      }
    });
  }
}

/* ==========================================================================
   2. ESTADO DE APERTURA EN VIVO (HORARIO SANTANDER)
   Horario:
   Lunes: 11:00–23:00
   Martes: CERRADO
   Miércoles: 11:00–23:00
   Jueves: 11:00–23:00
   Viernes: 11:00–23:00
   Sábado: 11:00–23:00
   Domingo: 11:00–23:00
   ========================================================================== */
function initLiveScheduleStatus() {
  const statusBadges = document.querySelectorAll('.live-status-container');
  const scheduleRows = document.querySelectorAll('.schedule-table tr');

  const santanderNow = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Madrid',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(new Date()).reduce((parts, item) => {
    parts[item.type] = item.value;
    return parts;
  }, {});
  const dayOfWeekMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const dayOfWeek = dayOfWeekMap[santanderNow.weekday];
  const hours = Number(santanderNow.hour);
  const minutes = Number(santanderNow.minute);
  const currentTime = hours + minutes / 60;

  // Martes (day 2) cerrado; Otros días 11:00 a 23:00
  let isOpen = false;
  if (dayOfWeek !== 2) {
    if (currentTime >= 11.0 && currentTime < 23.0) {
      isOpen = true;
    }
  }

  // Actualizar badges en las páginas
  statusBadges.forEach(container => {
    if (isOpen) {
      container.innerHTML = `
        <div class="live-status-badge open">
          <span class="status-dot"></span>
          <span>¡Abierto ahora! (11:00 - 23:00)</span>
        </div>
      `;
    } else {
      const nextOpenText = (dayOfWeek === 2) ? 'Abrimos mañana a las 11:00' : (currentTime < 11 ? 'Abrimos hoy a las 11:00' : 'Abrimos mañana a las 11:00');
      container.innerHTML = `
        <div class="live-status-badge closed">
          <span class="status-dot"></span>
          <span>Cerrado ahora • ${nextOpenText}</span>
        </div>
      `;
    }
  });

  // Resaltar día actual en la tabla de contacto
  if (scheduleRows.length > 0) {
    // Mapeo de getDay(): 0: Domingo, 1: Lunes, 2: Martes, 3: Mié, 4: Jue, 5: Vie, 6: Sáb
    const dayIndexMap = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };
    const targetRowIndex = dayIndexMap[dayOfWeek];
    if (scheduleRows[targetRowIndex]) {
      scheduleRows[targetRowIndex].classList.add('current-day');
      const dayCell = scheduleRows[targetRowIndex].querySelector('.day-name');
      if (dayCell) {
        dayCell.innerHTML += ' <span style="font-size:0.75rem; color:var(--color-yellow); font-weight:bold;">(Hoy)</span>';
      }
    }
  }
}

/* ==========================================================================
   3. FILTRADO Y BÚSQUEDA EN CARTA (carta.html)
   ========================================================================== */
function initMenuFilters() {
  const catButtons = document.querySelectorAll('.cat-btn');
  const menuCards = document.querySelectorAll('.menu-item-card');
  const searchInput = document.querySelector('.menu-search-input');
  const noResultsMsg = document.getElementById('noResultsMessage');
  const resultCount = document.getElementById('menuResultCount');

  if (!catButtons.length && !searchInput) return;

  let activeCategory = 'all';
  let searchTerm = '';

  function applyFilters() {
    let visibleCount = 0;

    menuCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardName = (card.querySelector('.product-name')?.textContent || '').toLowerCase();
      const cardDesc = (card.querySelector('.product-desc')?.textContent || '').toLowerCase();

      const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
      const matchesSearch = (!searchTerm || cardName.includes(searchTerm) || cardDesc.includes(searchTerm));

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResultsMsg) {
      noResultsMsg.style.display = (visibleCount === 0) ? 'block' : 'none';
    }

    if (resultCount) {
      resultCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'producto' : 'productos'}`;
    }
  }

  // Pestañas
  catButtons.forEach(btn => {
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');
    btn.addEventListener('click', () => {
      catButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      activeCategory = btn.getAttribute('data-filter');
      applyFilters();
    });
  });

  // Buscador
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }
}

/* ==========================================================================
   4. FORMULARIO DE EVENTOS CON ENVÍO A WHATSAPP (eventos.html)
   ========================================================================== */
function initEventForm() {
  const eventForm = document.getElementById('eventQuoteForm');
  if (!eventForm) return;

  eventForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('eventNombre')?.value.trim() || 'Cliente';
    const telefono = document.getElementById('eventTelefono')?.value.trim() || '';
    const tipoEvento = document.getElementById('eventTipo')?.value || 'Evento';
    const fecha = document.getElementById('eventFecha')?.value || 'A determinar';
    const localidad = document.getElementById('eventLocalidad')?.value.trim() || 'Santander/Cantabria';
    const personas = document.getElementById('eventPersonas')?.value.trim() || 'Por definir';
    const mensaje = document.getElementById('eventMensaje')?.value.trim() || 'Deseo información sobre el servicio de Food Truck.';

    const waText = 
      `¡Hola Full Track 4 Estaciones! 👋\n` +
      `Me gustaría solicitar información y presupuesto para un evento con vuestro Food Truck:\n\n` +
      `👤 *Nombre:* ${nombre}\n` +
      `📞 *Teléfono:* ${telefono}\n` +
      `🎉 *Tipo de evento:* ${tipoEvento}\n` +
      `📅 *Fecha prevista:* ${fecha}\n` +
      `📍 *Localidad:* ${localidad}\n` +
      `👥 *N.º de personas estimado:* ${personas}\n` +
      `💬 *Detalles adicionales:* ${mensaje}\n\n` +
      `¡Quedo a la espera de vuestra propuesta! Gracias.`;

    const waUrl = `https://wa.me/34678766196?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');
  });
}

/* ==========================================================================
   5. FORMULARIO DE CONTACTO CON ENVÍO A WHATSAPP (contacto.html)
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('quickContactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('contactNombre')?.value.trim() || 'Cliente';
    const motivo = document.getElementById('contactMotivo')?.value || 'Consulta general';
    const mensaje = document.getElementById('contactMensaje')?.value.trim() || '';

    const waText = 
      `¡Hola Full Track 4 Estaciones! 👋\n` +
      `Mi nombre es *${nombre}* y os escribo desde vuestra web.\n\n` +
      `📌 *Motivo:* ${motivo}\n` +
      `💬 *Mensaje:* ${mensaje}`;

    const waUrl = `https://wa.me/34678766196?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');
  });
}

/* ==========================================================================
   6. SISTEMA DE PARTÍCULAS: BRASAS CÁLIDAS FLOTANTES (EMBERS)
   ========================================================================== */
function initEmbersCanvas() {
  const canvas = document.getElementById('embersCanvas');
  if (!canvas || !canvas.parentElement) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  const particles = [];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const particleCount = 20;

  class Ember {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.5 + 1;
      this.speedY = Math.random() * 0.8 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.7 + 0.3;
      this.fade = Math.random() * 0.005 + 0.002;
      this.color = Math.random() > 0.3 ? '#F5B51B' : '#E97917';
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.opacity -= this.fade;

      if (this.opacity <= 0 || this.y < -10) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Ember());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* ========================================================================== 
   8. EFECTO 3D TILT EN TARJETAS CON EL MOVIMIENTO DEL RATÓN
   ========================================================================== */
function init3DTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(hover: none)').matches) return;
  const cards = document.querySelectorAll('.hero-visual-card, .traveler-express-card, .special-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const tiltX = (y / (rect.height / 2)) * -5;
      const tiltY = (x / (rect.width / 2)) * 5;

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==========================================================================
   9. CONFIGURADOR INTERACTIVO DE COMBOS EN VIVO (COMBO MAKER)
   ========================================================================== */
function initComboMaker() {
  const comboMaker = document.getElementById('comboMaker');
  if (!comboMaker) return;

  let baseItem = { name: 'Perrito Monstruo', price: 7.50 };
  let drinkItem = { name: 'Inca Kola 300ml', price: 2.20 };
  let dessertItem = { name: 'Helado Casero', price: 2.80 };

  const cards = comboMaker.querySelectorAll('.combo-option-card');
  const totalPriceEl = document.getElementById('comboTotalPrice');
  const previewEl = document.getElementById('comboSelectedPreview');
  const whatsappBtn = document.getElementById('comboWhatsappBtn');

  function updateCombo() {
    const total = baseItem.price + drinkItem.price + (dessertItem ? dessertItem.price : 0);
    if (totalPriceEl) totalPriceEl.textContent = `${total.toFixed(2)}€`;
    
    let summary = `👉 <strong>Principal:</strong> ${baseItem.name} + <strong>Bebida:</strong> ${drinkItem.name}`;
    if (dessertItem) summary += ` + <strong>Postre:</strong> ${dessertItem.name}`;
    if (previewEl) previewEl.innerHTML = summary;

    if (whatsappBtn) {
      const msg = encodeURIComponent(`¡Hola Full Track! Quiero pedir este Combo Express (${total.toFixed(2)}€):\n- Principal: ${baseItem.name}\n- Bebida: ${drinkItem.name}\n- Postre: ${dessertItem ? dessertItem.name : 'Sin postre'}\n¿Cuándo puedo pasar a recogerlo?`);
      whatsappBtn.href = `https://wa.me/34678766196?text=${msg}`;
    }
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const group = card.dataset.group;
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);

      comboMaker.querySelectorAll(`.combo-option-card[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      if (group === 'main') baseItem = { name, price };
      if (group === 'drink') drinkItem = { name, price };
      if (group === 'dessert') dessertItem = name === 'none' ? null : { name, price };

      updateCombo();
    });
  });

  updateCombo();
}

/* ==========================================================================
   10. SCROLL REVEAL SUAVE PARA SECCIONES
   ========================================================================== */
function initScrollReveal() {
  // Nunca animamos la sección completa: una sección de carta muy alta puede no
  // alcanzar el porcentaje visible del observer y dejar todos sus hijos ocultos.
  const reveals = document.querySelectorAll('.section-header, .special-card, .traveler-express-card, .review-card, .product-card, .feature-card, .service-fact, .value-card');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => {
      el.classList.add('reveal-on-scroll');
      observer.observe(el);
    });
  }
}
