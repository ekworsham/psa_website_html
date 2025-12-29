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
        "src": "/public/images/logo2.png"
      }
    },
    "topnav": [
      { "text": "404-514-6254" },
      // { "text": "Billing", "href": "/view/billing" },
      { "text": "Contact Us", "href": "/view/contact_us" }
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
          "href": "/view/estimate",
          "title": "Contact",
          "label": "Get a Free Estimate"
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
    
    var logoSrc = (data.branding && data.branding.logo && data.branding.logo.src) ? data.branding.logo.src : '/public/images/logo2.png';
    var logoHref = (data.branding && data.branding.logo && data.branding.logo.href) ? data.branding.logo.href : '/';
    var logoFile = logoSrc.split('/').pop();
    var logoBase = logoFile.replace(/\.[^.]+$/, '');
    var logoSize = logoBase === 'logo1' ? '450' : '150';
    var optimizedPrefix = '/public/images/optimized/' + logoBase + '-' + logoSize;

    container.innerHTML = ''+
      '<div id="header-logo"><a href="'+logoHref+'">'+
          '<img src="'+logoSrc+'" alt="ProScapes of Atlanta Logo" width="450" height="150" decoding="async" loading="eager" fetchpriority="high" />'+
      '</a></div>'+
      '<div class="topnav">'+topnav+'</div>'+
      '<div class="clear-right"></div>'+
      '<div class="nav">'+
        '<ul class="cssmenu">'+navItems+'</ul>'+
      '</div>';
    
    fragment.appendChild(container);
    
    var target = document.getElementById('site-header');
    if(target){
      target.innerHTML = '';
      target.appendChild(fragment);
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
