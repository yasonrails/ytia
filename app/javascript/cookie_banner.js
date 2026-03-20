(function() {
  var CONSENT_KEY = 'ytia_cookie_consent';
  var banner = document.getElementById('cookie-banner');
  if(!banner) return;
  var consent = localStorage.getItem(CONSENT_KEY);
  if(!consent){ banner.style.display = 'flex'; }

  function dismiss(val){
    localStorage.setItem(CONSENT_KEY, val);
    banner.style.display = 'none';
    window.dispatchEvent(new CustomEvent('ytia:cookie-consent', { detail: { value: val } }));
  }

  var btnAccept = document.getElementById('cookieAccept');
  var btnRefuse = document.getElementById('cookieRefuse');
  if(btnAccept) btnAccept.addEventListener('click', function(){ dismiss('accepted'); });
  if(btnRefuse) btnRefuse.addEventListener('click', function(){ dismiss('refused'); });
})();
