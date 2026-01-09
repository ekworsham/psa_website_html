(function(){
  // Inlined header data to avoid additional network request
  var headerData = {
    "meta": {
      "title": "ProScapes of Atlanta",
      "charset": "utf-8"
    },
    "styles": [
      "public/css/style2.css"
    ],
    "analytics": {
      "gaAccount": "UA-1811627-18"
    },
    "branding": {
      "logo": {
        "href": "/",
        "src": "/public/images/optimized/logo2-150.avif",
        "srcWebp": "/public/images/optimized/logo2-150.webp",
        "srcPng": "/public/images/optimized/logo2-150.png"
      }
    },
    "topnav": [
      // { "text": "404-514-6254" },
      // // { "text": "Billing", "href": "/view/billing" },
      // { "text": "Contact Us", "href": "/view/contact_us" }
    ],
    "nav": {
      "items": [
        {
          "class": "home",
          "href": "/index.html",
          "title": "Home",
          "label": "Home"
        },
        {
          "class": "about_us",
          "href": "/view/about_us",
          "title": "About Us",
          "label": "About Us"
        },
        {
          "class": "services",
          "href": "/view/services",
          "title": "Services",
          "label": "Services"
        },
        {
          "class": "contact",
          "href": "/view/contact_us",
          "title": "Contact",
          "label": "Contact Us"
        },
        {
          "class": "careers",
          "href": "/view/careers",
          "title": "Careers",
          "label": "Career"
        },
        {
          "class": "estimate",
          "href": "/view/estimate",
          "title": "Estimate",
          "label": "Free Estimate"
        }
      ]
    },
  };

  function renderHeader(data){
    var fragment = document.createDocumentFragment();
    var container = document.createElement('div');
    container.className = 'container_12';
    
    var topnav = (data.topnav||[]).map(function(i){
      return i.href ? '<a href="'+i.href+'">'+i.text+'</a>' : i.text;
    }).join(' | ');
    
    var navItems = (data.nav && data.nav.items ? data.nav.items : []).map(function(i){
      return '<li class="'+i.class+'"><a href="'+i.href+'" title="'+i.title+'"><span class="displace">'+i.label+'</span></a></li>';
    }).join('');
    
    var logoSrc = (data.branding && data.branding.logo && data.branding.logo.src) ? data.branding.logo.src : '/public/images/logo3.webp';
    var logoHref = (data.branding && data.branding.logo && data.branding.logo.href) ? data.branding.logo.href : '/';
    var logoFile = logoSrc.split('/').pop();
    var logoBase = logoFile.replace(/\.[^.]+$/, '');
    var logoSize = logoBase === 'logo1' ? '450' : '150';

    container.innerHTML = ''+
      '<div id="header-logo"><a href="'+logoHref+'">'+
          '<picture>'+
            '<source type="image/avif" srcset="/public/images/optimized/' + logoBase + '-' + logoSize + '.avif" />'+
            '<source type="image/webp" srcset="/public/images/optimized/' + logoBase + '-' + logoSize + '.webp" />'+
            '<img src="'+logoSrc+'" alt="ProScapes of Atlanta Logo" width="450" height="150" decoding="async" loading="eager" fetchpriority="high" />'+
          '</picture>'+
      '</a></div>'+
      '<div class="topnav">'+topnav+'</div>'+
      '<div class="clear-right"></div>'+
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-label="Toggle navigation">'+
        '<span></span><span></span><span></span>'+
        '<span class="menu-text">Menu</span>'+
      '</button>'+
      '<div class="nav">'+
        '<ul class="cssmenu">'+navItems+'</ul>'+
      '</div>';
    
    fragment.appendChild(container);
    
    var target = document.getElementById('site-header');
    if(target){
      target.innerHTML = '';
      target.appendChild(fragment);

      var navToggle = container.querySelector('.nav-toggle');
      if(navToggle){
        navToggle.addEventListener('click', function(){
          var isOpen = container.classList.toggle('nav-open');
          navToggle.setAttribute('aria-expanded', isOpen);
        });
      }
    }
  }
  
  function load(){
    requestAnimationFrame(function(){ renderHeader(headerData); });
  }
  
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
