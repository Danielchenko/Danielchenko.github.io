// =====================================================================
// Ano no rodapé e alternância de tema claro/escuro
// =====================================================================
const root = document.documentElement;
document.getElementById('y').textContent = new Date().getFullYear();

try { const saved = localStorage.getItem('theme'); if (saved) root.dataset.theme = saved; } catch (e) {}
document.getElementById('theme').addEventListener('click', () => {
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
});

// =====================================================================
// Animações (GSAP + ScrollTrigger + ScrollSmoother + SplitText + ScrambleText)
// =====================================================================
(() => {
  // Se algum plugin não carregar (offline, CDN fora), mostra tudo sem animação.
  const needed = ['gsap', 'ScrollTrigger', 'ScrollSmoother', 'SplitText', 'ScrambleTextPlugin'];
  if (needed.some((name) => !window[name])) { root.classList.remove('js'); return; }
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrambleTextPlugin);

  let smoother = null;
  const finePointer = matchMedia('(pointer: fine)').matches;

  // Links internos (#sobre, #contato...) rolam suavemente também com o ScrollSmoother ativo
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link || !smoother) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    smoother.scrollTo(target, true, 'top top');
  });

  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', (context) => {
    smoother = ScrollSmoother.create({ wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: 1.1, smoothTouch: false });
    root.classList.add('has-smoother');
    smoother.paused(true); // trava a rolagem durante o preloader

    // ---------- Preloader: contador de 0 a 100 enquanto as fontes carregam ----------
    const countEl = document.querySelector('.preloader-count');
    const counter = { value: 0 };
    const counting = gsap.to(counter, {
      value: 100, duration: 1.6, ease: 'power2.inOut',
      onUpdate: () => { countEl.textContent = Math.round(counter.value); },
    });

    // Marquee precisa de uma cópia da lista para o loop ficar contínuo
    const marqueeTrack = document.querySelector('.marquee-track');
    const marqueeClone = marqueeTrack.querySelector('.marquee-list').cloneNode(true);
    marqueeClone.setAttribute('aria-hidden', 'true');
    marqueeTrack.appendChild(marqueeClone);

    Promise.all([document.fonts.ready, counting.then()]).then(() => context.add(() => {
      try {
        build();
      } catch (err) {
        // Se algo der errado, não deixa a página escondida
        console.error(err);
        root.classList.remove('js');
        gsap.set('.preloader', { display: 'none' });
        smoother && smoother.paused(false);
      }
    }));

    return () => {
      marqueeClone.remove();
      root.classList.remove('has-smoother', 'has-cursor');
      smoother && smoother.kill();
      smoother = null;
    };
  });

  function build() {
    // ---------- Entrada do topo ----------
    const heroSplit = SplitText.create('.hero-word', { type: 'chars', mask: 'chars' });

    gsap.timeline({
      defaults: { ease: 'power4.out' },
      onComplete: () => smoother && smoother.paused(false),
    })
      .to('.preloader', { yPercent: -100, duration: 1, ease: 'power4.inOut' })
      .set('.preloader', { display: 'none' })
      .set('.hero-word', { autoAlpha: 1 }, 0)
      .from(heroSplit.chars, { yPercent: 110, duration: 1.1, stagger: 0.035 }, 0.55)
      .fromTo('.hero-photo', { autoAlpha: 0, scale: 0, rotation: -40 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 1.1, ease: 'back.out(1.7)' }, 0.9)
      .fromTo('.eyebrow, .hero-bottom > *, .scroll-hint', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }, 1)
      .to('[data-scramble]', { duration: 1.6, scrambleText: { text: '{original}', chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/_', speed: 0.6 } }, 1);

    // Ao rolar, as duas linhas do nome se afastam em direções opostas e a foto inclina de leve
    gsap.utils.toArray('.hero-line').forEach((line) => {
      gsap.to(line, { xPercent: 12 * Number(line.dataset.dir), ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    });
    gsap.fromTo('.hero-photo', { rotation: 0, scale: 1 }, { rotation: 15, scale: 0.9, ease: 'none', immediateRender: false, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    // ---------- Barra de progresso e header ----------
    gsap.to('#progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
    ScrollTrigger.create({
      start: 'top -120', end: 'max',
      onUpdate: (self) => gsap.to('.header', { yPercent: self.direction === 1 ? -100 : 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' }),
    });

    // ---------- Marquee: gira sem parar, acelera e inverte conforme a rolagem ----------
    const loop = gsap.to('.marquee-track', { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
    loop.totalTime(loop.duration() * 100); // margem para poder tocar de trás para frente
    let speed;
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (self) => {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 6);
        if (speed) speed.kill();
        speed = gsap.timeline()
          .to(loop, { timeScale: self.direction * boost, duration: 0.2 })
          .to(loop, { timeScale: self.direction, duration: 1 });
      },
    });

    // ---------- Rótulos e textos que entram ao aparecer ----------
    gsap.utils.toArray('.label, .reveal').forEach((el) => {
      gsap.fromTo(el, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });

    // ---------- Sobre: as palavras "acendem" conforme a rolagem ----------
    const fill = SplitText.create('[data-fill]', { type: 'words' });
    gsap.fromTo(fill.words, { opacity: 0.15 }, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: '[data-fill]', start: 'top 80%', end: 'bottom 45%', scrub: true },
    });

    // ---------- Serviços ----------
    gsap.matchMedia()
      // Desktop: seção fica fixa e os cards correm na horizontal
      .add('(min-width: 900px)', () => {
        const track = document.querySelector('.services-track');
        const distance = () => track.offsetLeft + track.scrollWidth - window.innerWidth + 48;
        gsap.set('.service', { autoAlpha: 1 });
        gsap.from('.service', { y: 120, rotation: 4, duration: 1, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '#servicos', start: 'top 70%' } });
        gsap.to(track, {
          x: () => -distance(), ease: 'none',
          scrollTrigger: { trigger: '#servicos', start: 'top top', end: () => '+=' + distance(), pin: true, scrub: 1, invalidateOnRefresh: true, refreshPriority: 1 },
        });
      })
      // Celular: cards empilhados entram um a um
      .add('(max-width: 899px)', () => {
        gsap.utils.toArray('.service').forEach((card) => {
          gsap.fromTo(card, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%' } });
        });
      });

    // ---------- Experiência: a linha de cada cargo "desenha" e o conteúdo sobe ----------
    gsap.utils.toArray('.job').forEach((job) => {
      gsap.fromTo(job, { autoAlpha: 0, y: 40, '--line': 0 }, { autoAlpha: 1, y: 0, '--line': 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: job, start: 'top 88%' } });
    });

    // ---------- Formação ----------
    gsap.fromTo('.edu-item', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.edu', start: 'top 85%' } });

    // ---------- Contato: título gigante letra por letra ----------
    const contactSplit = SplitText.create('.contact-title', { type: 'chars', mask: 'chars' });
    gsap.set('.contact-title', { autoAlpha: 1 });
    gsap.from(contactSplit.chars, { yPercent: 110, duration: 1, stagger: 0.03, ease: 'power4.out', scrollTrigger: { trigger: '.contact-title', start: 'top 80%' } });

    // ---------- Interações só com mouse ----------
    if (finePointer) {
      root.classList.add('has-cursor');
      const cursor = document.querySelector('.cursor');
      gsap.set(cursor, { xPercent: -50, yPercent: -50 });
      const cx = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
      const cy = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });
      window.addEventListener('mousemove', (e) => { cx(e.clientX); cy(e.clientY); });

      // O cursor cresce sobre links, botões e cards
      const hoverables = 'a, button, .service, .job';
      document.addEventListener('mouseover', (e) => { if (e.target.closest(hoverables)) gsap.to(cursor, { scale: 4, duration: 0.3 }); });
      document.addEventListener('mouseout', (e) => { if (e.target.closest(hoverables)) gsap.to(cursor, { scale: 1, duration: 0.3 }); });

      // Botões "magnéticos"
      document.querySelectorAll('.btn').forEach((b) => {
        const bx = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3.out' });
        const by = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3.out' });
        b.addEventListener('mousemove', (e) => {
          const r = b.getBoundingClientRect();
          bx((e.clientX - r.left - r.width / 2) * 0.35);
          by((e.clientY - r.top - r.height / 2) * 0.35);
        });
        b.addEventListener('mouseleave', () => { bx(0); by(0); });
      });
    }

    ScrollTrigger.refresh();
  }
})();
