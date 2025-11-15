// QuickServe IT - Main JavaScript

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initParticles();
  initNavigation();
  initLanguage();
  initTypewriter();
  initStatusChip();
  initScrollEffects();
});

// Cursor Glow Effect
function initCursorGlow() {
  const cursorGlow = document.createElement('div');
  cursorGlow.id = 'cursor-glow';
  document.body.appendChild(cursorGlow);
  
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
}

// Particle System
function initParticles() {
  const container = document.createElement('div');
  container.id = 'particles-container';
  document.body.appendChild(container);
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    createParticle(container);
  }
  
  // Create new particles periodically
  setInterval(() => {
    if (container.children.length < particleCount) {
      createParticle(container);
    }
  }, 2000);
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  const startX = Math.random() * window.innerWidth;
  const duration = 10 + Math.random() * 20;
  const size = 1 + Math.random() * 2;
  
  particle.style.left = startX + 'px';
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  particle.style.animationDuration = duration + 's';
  
  container.appendChild(particle);
  
  // Remove particle after animation
  setTimeout(() => {
    particle.remove();
  }, duration * 1000);
}

// Navigation
function initNavigation() {
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdowns = document.querySelectorAll('.dropdown');
  
  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  mobileToggle?.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu?.classList.toggle('active');
  });
  
  // Mobile dropdown toggle
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    toggle?.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && navMenu?.classList.contains('active')) {
      mobileToggle?.classList.remove('active');
      navMenu?.classList.remove('active');
    }
  });
  
  // Set active nav link
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath || 
        (currentPath === '/' && link.getAttribute('href') === '/index.html')) {
      link.classList.add('active');
    }
  });
}

// Language System
let currentLang = localStorage.getItem('language') || 'en';
let translations = {};

async function initLanguage() {
  // Load translations
  try {
    const response = await fetch(`/data/${currentLang}.json`);
    translations = await response.json();
    updateContent();
  } catch (error) {
    console.error('Error loading translations:', error);
  }
  
  // Language toggle buttons
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    if (btn.dataset.lang === currentLang) {
      btn.classList.add('active');
    }
    
    btn.addEventListener('click', () => {
      currentLang = btn.dataset.lang;
      localStorage.setItem('language', currentLang);
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      location.reload();
    });
  });
}

function updateContent() {
  // Update navigation
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (value) {
      element.textContent = value;
    }
  });
}

// Typewriter Effect
function initTypewriter() {
  const container = document.querySelector('.typewriter-text');
  if (!container) return;
  
  const sentences = translations.hero?.typewriter || [
    "We provide professional IT services at your doorstep",
    "Expert computer repair and maintenance solutions",
    "Fast, reliable, and affordable tech support"
  ];
  
  let sentenceIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;
  
  function type() {
    const currentSentence = sentences[sentenceIndex];
    
    if (!isDeleting && charIndex <= currentSentence.length) {
      container.textContent = currentSentence.substring(0, charIndex);
      charIndex++;
      
      if (charIndex > currentSentence.length) {
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          isDeleting = true;
        }, 3000);
      }
    } else if (isDeleting && charIndex >= 0) {
      container.textContent = currentSentence.substring(0, charIndex);
      charIndex--;
      
      if (charIndex < 0) {
        isDeleting = false;
        sentenceIndex = (sentenceIndex + 1) % sentences.length;
        charIndex = 0;
        setTimeout(type, 500);
        return;
      }
    }
    
    if (!isPaused) {
      const speed = isDeleting ? 30 : 50;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Status Chip (Online/Offline)
function initStatusChip() {
  const statusDot = document.querySelector('.status-dot');
  const statusText = document.querySelector('.status-text');
  
  if (!statusDot || !statusText) return;
  
  function checkStatus() {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;
    
    let isOnline = false;
    
    // Weekdays (Monday-Friday): 9:00 - 21:00
    if (day >= 1 && day <= 5) {
      isOnline = currentTime >= 540 && currentTime < 1260; // 9:00 - 21:00
    }
    // Saturday: 10:00 - 18:00
    else if (day === 6) {
      isOnline = currentTime >= 600 && currentTime < 1080; // 10:00 - 18:00
    }
    // Sunday: 10:00 - 16:00
    else if (day === 0) {
      isOnline = currentTime >= 600 && currentTime < 960; // 10:00 - 16:00
    }
    
    if (isOnline) {
      statusDot.classList.remove('offline');
      statusDot.classList.add('online');
      statusText.textContent = translations.status?.online || "We're Online";
    } else {
      statusDot.classList.remove('online');
      statusDot.classList.add('offline');
      statusText.textContent = translations.status?.offline || "Currently Offline";
    }
  }
  
  checkStatus();
  setInterval(checkStatus, 60000); // Check every minute
}

// Dynamic Greeting
function getGreeting() {
  const hour = new Date().getHours();
  const greetings = translations.hero?.greeting || {
    morning: "Good Morning",
    afternoon: "Good Afternoon",
    evening: "Good Evening",
    night: "Good Night"
  };
  
  if (hour >= 5 && hour < 12) return greetings.morning;
  if (hour >= 12 && hour < 17) return greetings.afternoon;
  if (hour >= 17 && hour < 21) return greetings.evening;
  return greetings.night;
}

// Update greeting
const greetingElement = document.querySelector('.hero-greeting');
if (greetingElement) {
  greetingElement.textContent = getGreeting();
}

// Scroll Effects
function initScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.card, .service-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Export functions for use in other scripts
window.QuickServeIT = {
  getGreeting,
  currentLang,
  translations
};
