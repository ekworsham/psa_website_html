(function(){
  function renderHeader(data){
    var container = document.createElement('div');
    container.className = 'container_12';
    var topnav = (data.topnav||[]).map(function(i){
      return i.href ? '<a href="'+i.href+'">'+i.text+'</a>' : i.text;
    }).join(' | ');
    var navItems = (data.nav && data.nav.items ? data.nav.items : []).map(function(i){
      return '<li class="'+i.class+'"><a href="'+i.href+'" title="'+i.title+'"><span class="displace">'+i.label+'</span></a></li>';
    }).join('');
    container.innerHTML = ''+
      '<span style="float:left"><a href="'+data.branding.logo.href+'"><img src="'+data.branding.logo.src+'"></a></span>'+
      '<div class="topnav">'+topnav+'</div>'+
      '<div class="clear-right"></div>'+
      '<div class="nav">'+
        '<ul class="cssmenu">'+navItems+'</ul>'+
      '</div>';
    var target = document.getElementById('site-header');
    if(target){
      target.innerHTML = '';
      target.appendChild(container);
    }
  }
  function load(){
    fetch('/public/components/header.json')
      .then(function(r){ return r.json(); })
      .then(function(json){ renderHeader(json); })
      .catch(function(err){ console.error('header load failed', err); });
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
