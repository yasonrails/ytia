(function() {
  var banner = document.getElementById('cookie-banner');
  if(!banner) return;
  var consent = localStorage.getItem('ytia_cookie_consent');
  if(!consent){ banner.style.display = 'flex'; }

  function dismiss(val){
    localStorage.setItem('ytia_cookie_consent', val);
    banner.style.display = 'none';
  }

  var btnAccept = document.getElementById('cookieAccept');
  var btnRefuse = document.getElementById('cookieRefuse');
  if(btnAccept) btnAccept.addEventListener('click', function(){ dismiss('accepted'); });
  if(btnRefuse) btnRefuse.addEventListener('click', function(){ dismiss('refused'); });
})();
