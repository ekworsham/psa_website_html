(function(){
  // Determine the correct base path for assets
  // For file:// protocol, calculate relative path; for http(s), use absolute
  var basePath = '';
  if (window.location.protocol === 'file:') {
    // Count directory depth: split path, remove file name, count remaining dirs
    var pathParts = window.location.pathname.split('/').filter(function(p) { return p.length > 0; });
    // Remove the filename (last part)
    var dirDepth = pathParts.length - 1;
    // We need to go up to the root (psa_website_html), which is at index position 5 for nested pages
    // For /path/to/psa_website_html/view/careers/index.html: we're 2 levels deep (view/careers)
    // Count how many levels up from current file to project root
    var projectRootIndex = -1;
    for (var i = pathParts.length - 1; i >= 0; i--) {
      if (pathParts[i] === 'psa_website_html') {
        projectRootIndex = i;
        break;
      }
    }
    // Calculate distance from current directory to project root
    if (projectRootIndex >= 0) {
      var currentDirIndex = pathParts.length - 2; // -2 because we exclude filename
      var depth = currentDirIndex - projectRootIndex;
      basePath = depth > 0 ? '../'.repeat(depth) : '';
    } else {
      basePath = '';
    }
  } else {
    basePath = '/';
  }
  
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
        "href": basePath + "view/training/login.html",
        "src": basePath + "public/images/optimized/headerLogo.avif",
        "srcWebp": basePath + "public/images/optimized/headerLogo.webp",
        "srcPng": basePath + "public/images/optimized/headerLogo.png"
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
          "href": basePath + "index.html",
          "title": "Home",
          "label": "Home"
        },
        {
          "class": "about_us",
          "href": basePath + "view/about_us",
          "title": "About Us",
          "label": "About Us"
        },
        {
          "class": "services",
          "href": basePath + "view/services",
          "title": "Services",
          "label": "Services"
        },
        {
          "class": "contact",
          "href": basePath + "view/contact_us",
          "title": "Contact",
          "label": "Contact Us"
        },
        {
          "class": "careers",
          "href": basePath + "view/careers",
          "title": "Careers",
          "label": "Career"
        },
        {
          "class": "estimate",
          "href": basePath + "view/estimate",
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
    
    var logoData = data.branding && data.branding.logo ? data.branding.logo : {};
    var logoHref = logoData.href || '/';
    var logoSrc = logoData.src || '/public/images/optimized/headerLogo.avif';
    var logoWebp = logoData.srcWebp || '/public/images/optimized/headerLogo.webp';
    var logoPng = logoData.srcPng || '/public/images/optimized/headerLogo.png';

    container.innerHTML = ''+
      '<div id="header-logo"><a href="'+logoHref+'">'+
          '<picture>'+
            '<source type="image/avif" srcset="'+logoSrc+'" />'+
            '<source type="image/webp" srcset="'+logoWebp+'" />'+
            '<img src="'+logoPng+'" alt="ProScapes of Atlanta Logo" width="300" height="100" decoding="async" loading="eager" fetchpriority="high" />'+
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
