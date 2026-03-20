(function(){
  var root = document.documentElement;
  var THEME_KEY = 'ytia-theme';
  var CONSENT_KEY = 'ytia_cookie_consent';
  var mediaTheme = window.matchMedia('(prefers-color-scheme: light)');
  var mediaBound = false;
  var consentBound = false;

  function hasThemeConsent(){
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  }

  function preferredTheme(){
    if(!hasThemeConsent()){
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    var saved = localStorage.getItem(THEME_KEY);
    if(saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function syncThemeButtons(theme){
    var labels = document.querySelectorAll('.theme-toggle-label');
    var toggles = document.querySelectorAll('.theme-toggle');
    var nextLabel = theme === 'dark' ? 'Mode clair' : 'Mode sombre';
    toggles.forEach(function(btn){ btn.setAttribute('aria-pressed', String(theme === 'light')); });
    labels.forEach(function(el){ el.textContent = nextLabel; });
  }

  function applyTheme(theme){
    root.setAttribute('data-theme', theme);
    if(hasThemeConsent()){
      localStorage.setItem(THEME_KEY, theme);
    } else {
      localStorage.removeItem(THEME_KEY);
    }
    syncThemeButtons(theme);
  }

  function toggleTheme(){
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  }

  function bindThemeButtons(){
    var themeToggle = document.getElementById('themeToggle');
    var themeToggleMobile = document.getElementById('themeToggleMobile');

    if(themeToggle && !themeToggle.dataset.bound){
      themeToggle.dataset.bound = 'true';
      themeToggle.addEventListener('click', toggleTheme);
    }

    if(themeToggleMobile && !themeToggleMobile.dataset.bound){
      themeToggleMobile.dataset.bound = 'true';
      themeToggleMobile.addEventListener('click', toggleTheme);
    }
  }

  function bindMediaTheme(){
    if(mediaBound) return;
    mediaBound = true;
    mediaTheme.addEventListener('change', function(event){
      if(hasThemeConsent() && localStorage.getItem(THEME_KEY)) return;
      applyTheme(event.matches ? 'light' : 'dark');
    });
  }

  function bindConsentEvents(){
    if(consentBound) return;
    consentBound = true;
    window.addEventListener('ytia:cookie-consent', function(event){
      if(!event || !event.detail) return;
      if(event.detail.value === 'accepted'){
        localStorage.setItem(THEME_KEY, root.getAttribute('data-theme') || preferredTheme());
      }
      if(event.detail.value === 'refused'){
        localStorage.removeItem(THEME_KEY);
      }
    });
  }

  function initParticles(){
    var fxParticles = document.getElementById('fx-particles');
    if(!fxParticles) return;
    if(fxParticles.dataset.ready === 'true') return;
    fxParticles.dataset.ready = 'true';

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var dots    = reduce ? 8 : (window.matchMedia('(max-width: 900px)').matches ? 14 : 22);
    var bubbles = reduce ? 3 : (window.matchMedia('(max-width: 900px)').matches ? 5  : 8);

    for(var i = 0; i < dots; i++){
      var p = document.createElement('span');
      p.className = 'fx-dot';
      p.style.setProperty('--x',     (Math.random() * 100).toFixed(2) + '%');
      p.style.setProperty('--d',     (10 + Math.random() * 12).toFixed(2) + 's');
      p.style.setProperty('--delay', (-Math.random() * 18).toFixed(2) + 's');
      p.style.setProperty('--size',  (2 + Math.random() * 5).toFixed(2) + 'px');
      fxParticles.appendChild(p);
    }

    for(var j = 0; j < bubbles; j++){
      var b = document.createElement('span');
      b.className = 'fx-bubble';
      b.style.setProperty('--x',     (Math.random() * 100).toFixed(2) + '%');
      b.style.setProperty('--d',     (20 + Math.random() * 22).toFixed(2) + 's');
      b.style.setProperty('--delay', (-Math.random() * 24).toFixed(2) + 's');
      b.style.setProperty('--size',  (60 + Math.random() * 180).toFixed(2) + 'px');
      fxParticles.appendChild(b);
    }
  }

  function initThemeParticles(){
    applyTheme(preferredTheme());
    bindThemeButtons();
    bindMediaTheme();
    bindConsentEvents();
    initParticles();
  }

  document.addEventListener('turbo:load', initThemeParticles);
  document.addEventListener('DOMContentLoaded', initThemeParticles);
})();
