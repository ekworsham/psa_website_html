(function(){
  function renderFooter(data){
    var target = document.getElementById('site-footer');
    if(!target){ return; }

    var fragment = document.createDocumentFragment();
    var clearDiv = document.createElement('div');
    clearDiv.className = 'clear';

    var container = document.createElement('div');
    container.className = (data.classes && data.classes.container) || '';
    container.id = (data.classes && data.classes.id) || 'footer';

    var links = (data.nav && data.nav.links) || [];
    var linksHtml = links.map(function(l){ return '<a href="' + l.href + '">' + l.label + '</a>'; }).join(' | ');

    var contact = data.contact || {};
    var contactHtml = '<p>' + (contact.company || '') + ' | ' + (contact.phone || '') + ' | <a href="' + (contact.emailHref || '#') + '">' + (contact.emailLabel || '') + '</a>';

    container.innerHTML = linksHtml + '\n' + contactHtml;

    fragment.appendChild(clearDiv);
    fragment.appendChild(container);
    target.appendChild(fragment);

    if(data.scripts && data.scripts.banner){
      var bannerSlideIndex = 1;
      var bannerAutoPlayTimeout;

      function showBannerSlides(n){
        requestAnimationFrame(function(){
          var slides = document.getElementsByClassName('banner-slide');
          var dots = document.getElementsByClassName('dot');
          if(!slides.length){ return; }
          if(n > slides.length){ bannerSlideIndex = 1; }
          if(n < 1){ bannerSlideIndex = slides.length; }
          for(var i=0;i<slides.length;i++){ slides[i].classList.remove('active'); }
          for(var j=0;j<dots.length;j++){ dots[j].classList.remove('active'); }
          var s = slides[bannerSlideIndex - 1];
          if(s){ s.classList.add('active'); }
          var d = dots[bannerSlideIndex - 1];
          if(d){ d.classList.add('active'); }
        });
      }

      function startBannerAutoPlay(){
        clearTimeout(bannerAutoPlayTimeout);
        bannerAutoPlayTimeout = setTimeout(function(){
          bannerSlideIndex++;
          showBannerSlides(bannerSlideIndex);
          startBannerAutoPlay();
        }, data.scripts.intervalMs || 5000);
      }

      window.changeBannerSlide = function(n){
        clearTimeout(bannerAutoPlayTimeout);
        showBannerSlides(bannerSlideIndex += n);
        startBannerAutoPlay();
      };

      window.currentBannerSlide = function(n){
        clearTimeout(bannerAutoPlayTimeout);
        showBannerSlides(bannerSlideIndex = n + 1);
        startBannerAutoPlay();
      };

      showBannerSlides(bannerSlideIndex);
      startBannerAutoPlay();
    }
  }

  fetch('/public/components/footer.json')
    .then(function(r){ return r.json(); })
    .then(function(data){ 
      requestAnimationFrame(function(){ renderFooter(data); });
    })
    .catch(function(err){ console.error('Footer load error:', err); });
})();
