/* ========================================
   MENU MOBILE
   ======================================== */

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Abrir/fechar menu mobile
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
  const isClickInsideNav = navMenu.contains(e.target) || hamburger.contains(e.target);
  if (!isClickInsideNav && navMenu.classList.contains('active')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

/* ========================================
   SCROLL SUAVE
   ======================================== */

const scrollButtons = document.querySelectorAll('.scroll-btn');

scrollButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = button.getAttribute('data-target');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = document.querySelector('.navbar').offsetHeight;
      const elementPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll suave para todos os links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const headerHeight = document.querySelector('.navbar').offsetHeight;
      const targetElement = document.querySelector(href);
      const elementPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  });
});

/* ========================================
   FILTRO DE CATEGORIAS
   ======================================== */

const categoryButtons = document.querySelectorAll('.categoria-btn');
const productCards = document.querySelectorAll('.produto-card');

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedCategory = button.getAttribute('data-category');
    
    // Atualizar botão ativo
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Filtrar produtos com animação
    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      
      if (selectedCategory === 'todos' || cardCategory === selectedCategory) {
        card.style.display = 'block';
        // Trigger reflow para reiniciar animação
        setTimeout(() => {
          card.style.animation = 'none';
          setTimeout(() => {
            card.style.animation = '';
          }, 10);
        }, 10);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ========================================
   INTERSECTION OBSERVER - ANIMAÇÕES AO SCROLL
   ======================================== */

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar elementos com animações
document.querySelectorAll('.produto-card, .depoimento-card').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(element);
});

/* ========================================
   SCROLL NAVBAR BACKGROUND
   ======================================== */

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  
  // Adicionar sombra ao scroll
  if (scrollTop > 50) {
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  
  lastScrollTop = scrollTop;
});

/* ========================================
   CONTADOR ANIMADO
   ======================================== */

const stats = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateCounters = () => {
  if (hasAnimated) return;
  
  stats.forEach(stat => {
    const finalValue = stat.textContent;
    const numericValue = parseInt(finalValue);
    
    if (!isNaN(numericValue)) {
      let currentValue = 0;
      const increment = numericValue / 50;
      
      const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
          stat.textContent = finalValue;
          clearInterval(counter);
        } else {
          stat.textContent = Math.floor(currentValue) + (finalValue.includes('K') ? 'K' : finalValue.includes('★') ? '★' : '');
        }
      }, 30);
    }
  });
  
  hasAnimated = true;
};

// Ativar contadores quando section está visível
const statsSection = document.querySelector('.sobre-stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObserver.unobserve(statsSection);
    }
  }, { threshold: 0.5 });
  
  statsObserver.observe(statsSection);
}

/* ========================================
   ADICIONAR AO CARRINHO
   ======================================== */

const addToCartButtons = document.querySelectorAll('.produto-overlay .btn');

addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Efeito visual de feedback
    const card = button.closest('.produto-card');
    const productName = card.querySelector('.produto-nome').textContent;
    
    // Criar notificação
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: #2d2d2d;
      color: white;
      padding: 1rem 2rem;
      border-radius: 50px;
      font-weight: 600;
      z-index: 1001;
      animation: slideIn 0.3s ease-out;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = `✓ ${productName} adicionado ao carrinho!`;
    
    document.body.appendChild(notification);
    
    // Remover notificação após 3 segundos
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  });
});

/* ========================================
   ANIMAÇÕES DE NOTIFICAÇÃO
   ======================================== */

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100px);
    }
  }
`;
document.head.appendChild(style);

/* ========================================
   EFEITO PARALLAX SUAVE (OPCIONAL)
   ======================================== */

let ticking = false;
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

function updateParallax() {
  const heroImages = document.querySelectorAll('.hero-image img, .marca-image img, .sobre-image img, .promocao-image img');
  
  heroImages.forEach(img => {
    const rect = img.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const windowCenter = window.innerHeight / 2;
    const distance = (elementCenter - windowCenter) * 0.3;
    
    img.style.transform = `translateY(${distance * 0.1}px)`;
  });
  
  ticking = false;
}

/* ========================================
   FORMULÁRIO DE CONTATO (EXEMPLO)
   ======================================== */

// Você pode adicionar um formulário real aqui
// Por enquanto, apenas exemplo básico

const contactLinks = document.querySelectorAll('.social-link, [href^="mailto:"], [href^="https://wa.me"], [href^="https://instagram"]');

contactLinks.forEach(link => {
  if (link.title) {
    link.addEventListener('mouseenter', function() {
      const tooltip = document.createElement('div');
      tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.85rem;
        white-space: nowrap;
        pointer-events: none;
        z-index: 1000;
      `;
      tooltip.textContent = this.title;
      this.appendChild(tooltip);
      
      this.addEventListener('mouseleave', () => {
        tooltip.remove();
      }, { once: true });
    });
  }
});

/* ========================================
   DARK MODE TOGGLE (OPCIONAL)
   ======================================== */

// Você pode adicionar um botão para dark mode aqui
// Por enquanto, mantemos o design claro premium

console.log('✓ ELEVATE - E-commerce iniciado com sucesso!');
console.log('✓ Todas as funcionalidades foram carregadas');
