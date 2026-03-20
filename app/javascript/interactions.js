(function(){
  var globalsBound = false;

  function bindGlobalScroll(){
    if(globalsBound) return;
    globalsBound = true;

    window.addEventListener('scroll', function(){
      var nav = document.getElementById('nav');
      if(nav){
        nav.classList.toggle('bg', window.scrollY > 40);
      }

      var backTop = document.getElementById('backTop');
      if(backTop){
        backTop.classList.toggle('visible', window.scrollY > 400);
      }
    }, { passive: true });
  }

  function initInteractions(){
    bindGlobalScroll();

    var logo = document.querySelector('.nav-logo');
    if(logo && !logo.dataset.bound){
      logo.dataset.bound = 'true';
      logo.addEventListener('click', function(event){
        if(logo.getAttribute('href') !== '#') return;
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if(window.location.hash === '#'){
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      });
    }

    var burger = document.getElementById('burger');
    var mobile = document.getElementById('mobile');
    if(burger && mobile && !burger.dataset.bound){
      burger.dataset.bound = 'true';

      burger.addEventListener('click', function(){
        var open = burger.classList.toggle('open');
        mobile.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', String(open));
      });

      mobile.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click', function(){
          burger.classList.remove('open');
          mobile.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        });
      });
    }

    var ro = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add('on');
          ro.unobserve(e.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('[data-r]').forEach(function(el){ ro.observe(el); });

    var countEls = document.querySelectorAll('.stat-n[data-count]');
    var cro = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        cro.unobserve(e.target);
        var el = e.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var prefix = el.getAttribute('data-prefix') || '';
        var suffix = el.getAttribute('data-suffix') || '';
        var t0 = null;

        (function tick(ts){
          if(!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1500, 1);
          var ease = 1 - Math.pow(1 - p, 3);
          el.textContent = prefix + Math.round(ease * target) + suffix;
          if(p < 1) requestAnimationFrame(tick);
        })(performance.now());
      });
    }, { threshold: 0.6 });
    countEls.forEach(function(el){ cro.observe(el); });

    var backTop = document.getElementById('backTop');
    if(backTop && !backTop.dataset.bound){
      backTop.dataset.bound = 'true';
      backTop.addEventListener('click', function(){
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  document.addEventListener('turbo:load', initInteractions);
  document.addEventListener('DOMContentLoaded', initInteractions);
})();
