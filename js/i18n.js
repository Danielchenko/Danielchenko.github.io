// =====================================================================
// Idiomas: inglês (padrão), espanhol e português
// O HTML já vem em inglês. Este script troca os textos antes das animações
// começarem, porque o SplitText e o ScrambleText usam o texto que está na página.
// Para trocar de idioma, a página recarrega com ?lang=xx (assim as animações
// são montadas de novo com o texto certo, e o link pode ser compartilhado).
// =====================================================================
const I18N = {
  en: {
    "nav.about": "About",
    "nav.services": "Services",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "hero.eyebrow": "<span class=\"dot\"></span> Open to opportunities and projects",
    "hero.lead": "I build features, customizations and integrations with React, TypeScript and Node.js, focused on performance and user experience.",
    "hero.loc": "Cachoeiras de Macacu, RJ · Brazil",
    "hero.scroll": "Scroll <span>↓</span>",
    "skills.integrations": "System integrations",
    "skills.ai": "AI-assisted development",
    "about.label": "<span>01</span> About me",
    "about.p1": "I'm a Software Engineer with 5+ years of experience in web development, building interfaces, integrations and services with React, TypeScript and Node.js. Much of that journey has been in e-commerce, where I became the VTEX technical reference on my team, supporting technical decisions, implementations and troubleshooting in production.",
    "about.p2": "Before development, I spent years in IT infrastructure, which gave me a complete view of systems, integrations and troubleshooting. My focus is building solutions that solve real business problems, and I'm especially interested in using Artificial Intelligence to build and automate faster and more efficiently.",
    "services.label": "<span>02</span> What I do",
    "services.title": "Where I add the most value to a project.",
    "s1.t": "Web applications",
    "s1.d": "Interfaces and features with React, Next.js and TypeScript, including stores and custom apps on platforms like VTEX IO.",
    "s2.t": "Integrations & APIs",
    "s2.d": "System integrations via REST and GraphQL, process automation and Node.js services.",
    "s3.d": "Optimizing Core Web Vitals and user experience in responsive interfaces.",
    "s3.t": "Performance",
    "s4.t": "AI in development",
    "s4.d": "Using Artificial Intelligence as a tool to build and automate solutions faster.",
    "s4.tag1": "AI",
    "s4.tag2": "Automation",
    "exp.label": "<span>03</span> Experience",
    "exp.title": "My journey so far.",
    "job1.date": "Jun 2026 — present",
    "job1.desc": "Developing and evolving e-commerce solutions on VTEX IO: features, platform customizations, integrations and continuous improvements. VTEX technical reference on the team.",
    "job2.date": "Oct 2024 — Mar 2026",
    "job2.desc": "End-to-end e-commerce solutions with VTEX IO, React, Node.js and TypeScript. Custom features, API integrations, process automation and performance optimization.",
    "job3.date": "Apr 2021 — Sep 2023",
    "job3.desc": "Built VTEX IO e-commerce stores with interactive, responsive interfaces, custom solutions and a focus on performance.",
    "job4.date": "Nov 2018 — Nov 2020",
    "job4.desc": "Planning, supervision and support of IT resources, information systems and technology solutions.",
    "job5.date": "Jun 2013 — Feb 2017",
    "job5.desc": "Hardware and software maintenance, networks, structured cabling and fiber optics.",
    "job4.role": "IT Analyst",
    "job5.role": "Network Technician",
    "edu.label": "<span>04</span> Education &amp; certifications",
    "edu.degree.t": "Information Systems",
    "edu.degree.d": "Bachelor's in Information Systems, Systems Networks and Telecommunications · Cefet/RJ (2016 — 2020)",
    "edu.certs.t": "Certifications",
    "edu.langs.t": "Languages",
    "edu.langs.d": "Portuguese (native) · English (full professional) · Spanish (limited working)",
    "contact.label": "<span>05</span> Contact",
    "contact.title": "Let's<br>talk<span class=\"accent\">?</span>",
    "contact.sub": "Open to opportunities, projects and connections in web development, integrations, e-commerce and AI-assisted development.",
    "footer.made": "Built with HTML, CSS and GSAP",
    "footer.top": "Back to top ↑",
    "meta.description": "Portfolio of Daniel Carvalho, full-stack Software Engineer: web applications, integrations and performance with React, TypeScript and Node.js.",
    "aria.theme": "Toggle light/dark theme",
    "alt.photo": "Photo of Daniel Carvalho",
    "aria.scroll": "Scroll to About me",
    "aria.tech": "Technologies",
  },
  es: {
    "nav.about": "Sobre mí",
    "nav.services": "Servicios",
    "nav.experience": "Experiencia",
    "nav.contact": "Contacto",
    "hero.eyebrow": "<span class=\"dot\"></span> Abierto a oportunidades y proyectos",
    "hero.lead": "Desarrollo funcionalidades, personalizaciones e integraciones con React, TypeScript y Node.js, con foco en rendimiento y experiencia de usuario.",
    "hero.loc": "Cachoeiras de Macacu, RJ · Brasil",
    "hero.scroll": "Desliza <span>↓</span>",
    "skills.integrations": "Integración de sistemas",
    "skills.ai": "IA aplicada al desarrollo",
    "about.label": "<span>01</span> Sobre mí",
    "about.p1": "Soy Software Engineer con más de 5 años de experiencia en desarrollo web, construyendo interfaces, integraciones y servicios con React, TypeScript y Node.js. Gran parte de esa trayectoria fue en e-commerce, donde me convertí en la referencia técnica en VTEX de mi equipo, apoyando decisiones técnicas, implementaciones y resolución de problemas en producción.",
    "about.p2": "Antes del desarrollo, pasé años en infraestructura de TI, lo que me dio una visión completa de sistemas, integraciones y troubleshooting. Mi foco es construir soluciones que resuelvan problemas reales de negocio, y tengo especial interés en usar Inteligencia Artificial para desarrollar y automatizar de forma más rápida y eficiente.",
    "services.label": "<span>02</span> Qué hago",
    "services.title": "Donde más valor aporto a un proyecto.",
    "s1.t": "Aplicaciones web",
    "s1.d": "Interfaces y funcionalidades con React, Next.js y TypeScript, incluyendo tiendas y apps personalizadas en plataformas como VTEX IO.",
    "s2.t": "Integraciones y APIs",
    "s2.d": "Integración entre sistemas vía REST y GraphQL, automatización de procesos y servicios en Node.js.",
    "s3.d": "Optimización de Core Web Vitals y de la experiencia de usuario en interfaces responsivas.",
    "s3.t": "Rendimiento",
    "s4.t": "IA en el desarrollo",
    "s4.d": "Uso de Inteligencia Artificial como herramienta para construir y automatizar soluciones con más velocidad.",
    "s4.tag1": "IA",
    "s4.tag2": "Automatización",
    "exp.label": "<span>03</span> Experiencia",
    "exp.title": "Mi trayectoria hasta ahora.",
    "job1.date": "jun 2026 — actual",
    "job1.desc": "Desarrollo y evolución de soluciones de e-commerce en VTEX IO: funcionalidades, personalizaciones, integraciones y mejoras continuas. Referencia técnica en VTEX del equipo.",
    "job2.date": "oct 2024 — mar 2026",
    "job2.desc": "Soluciones completas de e-commerce con VTEX IO, React, Node.js y TypeScript. Funcionalidades personalizadas, integraciones con APIs, automatización de procesos y optimización de rendimiento.",
    "job3.date": "abr 2021 — sep 2023",
    "job3.desc": "Desarrollo de tiendas e-commerce en VTEX IO con interfaces interactivas y responsivas, soluciones personalizadas y foco en rendimiento.",
    "job4.date": "nov 2018 — nov 2020",
    "job4.desc": "Planificación, supervisión y soporte de los recursos de TI, sistemas de información y soluciones tecnológicas.",
    "job5.date": "jun 2013 — feb 2017",
    "job5.desc": "Mantenimiento de hardware y software, redes, cableado estructurado y fibra óptica.",
    "job4.role": "Analista de TI",
    "job5.role": "Técnico de Redes",
    "edu.label": "<span>04</span> Formación y certificaciones",
    "edu.degree.t": "Sistemas de Información",
    "edu.degree.d": "Licenciatura en Sistemas de Información, Redes de Sistemas y Telecomunicaciones · Cefet/RJ (2016 — 2020)",
    "edu.certs.t": "Certificaciones",
    "edu.langs.t": "Idiomas",
    "edu.langs.d": "Portugués (nativo) · Inglés (profesional completo) · Español (profesional básico)",
    "contact.label": "<span>05</span> Contacto",
    "contact.title": "¿Hablamos<span class=\"accent\">?</span>",
    "contact.sub": "Abierto a oportunidades, proyectos y conexiones en desarrollo web, integraciones, e-commerce e IA aplicada al desarrollo.",
    "footer.made": "Hecho con HTML, CSS y GSAP",
    "footer.top": "Volver arriba ↑",
    "meta.description": "Portafolio de Daniel Carvalho, Software Engineer full-stack: aplicaciones web, integraciones y rendimiento con React, TypeScript y Node.js.",
    "aria.theme": "Cambiar tema claro/oscuro",
    "alt.photo": "Foto de Daniel Carvalho",
    "aria.scroll": "Desplazarse a Sobre mí",
    "aria.tech": "Tecnologías",
  },
  pt: {
    "nav.about": "Sobre",
    "nav.services": "Serviços",
    "nav.experience": "Experiência",
    "nav.contact": "Contato",
    "hero.eyebrow": "<span class=\"dot\"></span> Aberto a oportunidades e projetos",
    "hero.lead": "Desenvolvo funcionalidades, customizações e integrações com React, TypeScript e Node.js, com foco em performance e experiência do usuário.",
    "hero.loc": "Cachoeiras de Macacu, RJ · Brasil",
    "hero.scroll": "Role <span>↓</span>",
    "skills.integrations": "Integrações de sistemas",
    "skills.ai": "IA aplicada ao desenvolvimento",
    "about.label": "<span>01</span> Sobre mim",
    "about.p1": "Sou Software Engineer com mais de 5 anos de experiência em desenvolvimento web, construindo interfaces, integrações e serviços com React, TypeScript e Node.js. Boa parte dessa trajetória foi em e-commerce, onde me tornei referência técnica em VTEX no meu time, apoiando decisões técnicas, implementações e resolução de problemas em produção.",
    "about.p2": "Antes do desenvolvimento, passei anos em infraestrutura e TI, o que me deu uma visão completa de sistemas, integrações e troubleshooting. Meu foco é construir soluções que resolvam problemas reais de negócio, e tenho interesse especial em usar Inteligência Artificial para desenvolver e automatizar de forma mais rápida e eficiente.",
    "services.label": "<span>02</span> O que eu faço",
    "services.title": "Onde mais gero valor em um projeto.",
    "s1.t": "Aplicações web",
    "s1.d": "Interfaces e funcionalidades com React, Next.js e TypeScript, incluindo lojas e apps customizados em plataformas como a VTEX IO.",
    "s2.t": "Integrações e APIs",
    "s2.d": "Integração entre sistemas via REST e GraphQL, automação de processos e serviços em Node.js.",
    "s3.d": "Otimização de Core Web Vitals e da experiência do usuário em interfaces responsivas.",
    "s3.t": "Performance",
    "s4.t": "IA no desenvolvimento",
    "s4.d": "Uso de Inteligência Artificial como ferramenta para construir e automatizar soluções com mais velocidade.",
    "s4.tag1": "IA",
    "s4.tag2": "Automação",
    "exp.label": "<span>03</span> Experiência",
    "exp.title": "Minha trajetória até aqui.",
    "job1.date": "jun 2026 — atual",
    "job1.desc": "Desenvolvimento e evolução de soluções de e-commerce em VTEX IO: funcionalidades, customizações, integrações e melhorias contínuas. Referência técnica em VTEX no time.",
    "job2.date": "out 2024 — mar 2026",
    "job2.desc": "Soluções completas para e-commerce com VTEX IO, React, Node.js e TypeScript. Funcionalidades personalizadas, integrações com APIs, automação de processos e otimização de performance.",
    "job3.date": "abr 2021 — set 2023",
    "job3.desc": "Desenvolvimento de lojas e-commerce em VTEX IO com interfaces interativas e responsivas, soluções personalizadas e foco em desempenho.",
    "job4.date": "nov 2018 — nov 2020",
    "job4.desc": "Planejamento, supervisão e suporte dos recursos de TI, sistemas de informação e soluções tecnológicas.",
    "job5.date": "jun 2013 — fev 2017",
    "job5.desc": "Manutenção de hardware e software, redes, cabeamento estruturado e fibra óptica.",
    "job4.role": "Analista de TI",
    "job5.role": "Técnico de Redes",
    "edu.label": "<span>04</span> Formação e certificações",
    "edu.degree.t": "Sistemas de Informação",
    "edu.degree.d": "Bacharelado em Sistemas da Informação, Redes de Sistemas e Telecomunicações · Cefet/RJ (2016 — 2020)",
    "edu.certs.t": "Certificações",
    "edu.langs.t": "Idiomas",
    "edu.langs.d": "Português (nativo) · Inglês (profissional completo) · Espanhol (básico profissional)",
    "contact.label": "<span>05</span> Contato",
    "contact.title": "Vamos<br>conversar<span class=\"accent\">?</span>",
    "contact.sub": "Aberto a oportunidades, projetos e conexões em desenvolvimento web, integrações, e-commerce e IA aplicada ao desenvolvimento.",
    "footer.made": "Feito com HTML, CSS e GSAP",
    "footer.top": "Voltar ao topo ↑",
    "meta.description": "Portfólio de Daniel Carvalho, Software Engineer full-stack: aplicações web, integrações e performance com React, TypeScript e Node.js.",
    "aria.theme": "Alternar tema claro/escuro",
    "alt.photo": "Foto de Daniel Carvalho",
    "aria.scroll": "Rolar para Sobre mim",
    "aria.tech": "Tecnologias",
  },
};

const LANGS = { en: 'en', es: 'es', pt: 'pt-BR' };

(() => {
  const params = new URLSearchParams(location.search);
  let lang = params.get('lang');
  if (!LANGS[lang]) {
    try { lang = localStorage.getItem('lang'); } catch (e) { lang = null; }
  }
  if (!LANGS[lang]) lang = 'en';

  const dict = I18N[lang];
  document.documentElement.lang = LANGS[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = dict[el.dataset.i18n]; });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = dict[el.dataset.i18nHtml]; });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', dict[el.dataset.i18nAria]));
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => el.setAttribute('alt', dict[el.dataset.i18nAlt]));
  document.querySelectorAll('[data-i18n-content]').forEach((el) => el.setAttribute('content', dict[el.dataset.i18nContent]));

  document.querySelectorAll('.lang button').forEach((btn) => {
    btn.setAttribute('aria-pressed', btn.dataset.lang === lang);
    btn.addEventListener('click', () => {
      if (btn.dataset.lang === lang) return;
      try { localStorage.setItem('lang', btn.dataset.lang); } catch (e) {}
      const url = new URL(location.href);
      if (btn.dataset.lang === 'en') url.searchParams.delete('lang');
      else url.searchParams.set('lang', btn.dataset.lang);
      url.hash = '';
      location.href = url.toString();
    });
  });
})();
