/* =====================================================
   125 Pedidos Estratégicos - Landing Page Script
   All animations, interactivity and micro-interactions
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {



  /* ───────────────────────── NAVBAR SCROLL ───────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ───────────────────────── REVEAL ON SCROLL ───────────────────────── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => {
    // Stagger children if multiple delay siblings
    revealObserver.observe(el);
  });

  // Trigger hero reveals immediately (already in view)
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach(el => {
      el.classList.add('revealed');
    });
  }, 100);

  /* ───────────────────────── FLOATING PARTICLES ───────────────────────── */
  const particleContainer = document.getElementById('heroParticles');
  const createParticle = () => {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const duration = Math.random() * 8 + 6;
    const delay = Math.random() * 10;
    const hue = Math.random() > 0.5 ? '#FACC15' : '#22D3EE';
    p.style.cssText = `
      left: ${x}%;
      width: ${size}px;
      height: ${size}px;
      background: ${hue};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;
    particleContainer.appendChild(p);
  };

  for (let i = 0; i < 24; i++) createParticle();

  /* ───────────────────────── HERO BOOK PARALLAX ───────────────────────── */
  const bookWrapper = document.getElementById('bookWrapper');
  const book3d = document.getElementById('book3d');
  let bookRX = -15, bookRY = 5;
  let targetRX = -15, targetRY = 5;

  document.addEventListener('mousemove', (e) => {
    if (!bookWrapper) return;
    const rect = bookWrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) / window.innerWidth;
    const dy = (e.clientY - centerY) / window.innerHeight;
    targetRY = -15 + dx * 25;
    targetRX = 5 - dy * 15;
  });

  const animateBook = () => {
    bookRX += (targetRX - bookRX) * 0.06;
    bookRY += (targetRY - bookRY) * 0.06;
    if (book3d) {
      book3d.style.transform = `rotateY(${bookRY}deg) rotateX(${bookRX}deg)`;
    }
    requestAnimationFrame(animateBook);
  };
  animateBook();

  /* ───────────────────────── ANIMATED COUNTERS ───────────────────────── */
  const counterEls = document.querySelectorAll('.stat-number[data-target]');

  const animateCounter = (el) => {
    const target = +el.dataset.target;
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease-out-quart
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObserver.observe(el));

  /* ───────────────────────── 3D TILT CARDS ───────────────────────── */
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -8;
      const rotateY = ((x - cx) / cx) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  /* ───────────────────────── MAGNETIC BUTTONS ───────────────────────── */
  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  magneticBtns.forEach(btn => {
    const strength = 0.4;

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.05)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0) scale(1)';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.1s linear';
    });
  });

  /* ───────────────────────── SMOOTH ANCHOR SCROLL ───────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ───────────────────────── BENTO GRID GLOW ON HOVER ───────────────────────── */
  document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ───────────────────────── SCROLL PROGRESS GLOW ───────────────────────── */
  const heroRadial = document.querySelector('.hero-radial-glow');

  window.addEventListener('scroll', () => {
    const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (heroRadial) {
      heroRadial.style.opacity = Math.max(0, 1 - window.scrollY / 400);
    }

    // Change gradient hue on scroll
    const hue = 40 + scrollPct * 60;
    document.documentElement.style.setProperty('--accent-yellow', `hsl(${hue}, 95%, 55%)`);
  });

  /* ───────────────────────── HERO SECTION TEXT STAGGER ───────────────────────── */
  // Animate words in hero title one by one
  const heroWords = document.querySelectorAll('.hero-title .word');
  heroWords.forEach((word, i) => {
    word.style.opacity = '0';
    word.style.transform = 'translateY(20px)';
    word.style.display = 'inline-block';
    setTimeout(() => {
      word.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
      word.style.opacity = '1';
      word.style.transform = 'translateY(0)';
    }, 200 + i * 120);
  });

  /* ───────────────────────── MARQUEE PAUSE ON HOVER ───────────────────────── */
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  /* ───────────────────────── PRICE BLOCK GLOW ───────────────────────── */
  const priceBlock = document.querySelector('.price-block');
  if (priceBlock) {
    setInterval(() => {
      priceBlock.style.boxShadow = '0 0 40px rgba(250,204,21,0.12), 0 0 0 1px rgba(250,204,21,0.2)';
      setTimeout(() => {
        priceBlock.style.boxShadow = '0 0 20px rgba(250,204,21,0.05), 0 0 0 1px rgba(250,204,21,0.1)';
      }, 600);
    }, 2500);
  }

  /* ───────────────────────── BENTO CARDS STAGGER REVEAL ───────────────────────── */
  const bentoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.bento-card');
        cards.forEach((card, idx) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, idx * 80);
        });
        bentoObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const bentoGrid = document.querySelector('.bento-grid');
  if (bentoGrid) bentoObserver.observe(bentoGrid);

  /* ───────────────────────── FAQ ACCORDION ───────────────────────── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Fechar todos antes de abrir o novo (opcional, para foco)
      faqItems.forEach(i => i.classList.remove('active'));

      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  console.log('%c⚖ 125 Pedidos Estratégicos ', 'background:#FACC15;color:#000;font-weight:900;font-size:14px;padding:4px 8px;border-radius:4px;');
  console.log('%cDesenvolvido com 🔥 por Antigravity', 'color:#94A3B8;font-size:11px;');

});
