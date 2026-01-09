(function(){
  // Inlined footer data to avoid additional network request
  var footerData = {
    "classes": {
      "container": "container_12",
      "id": "footer"
    },
    "nav": {
      "links": [
        { "label": "Home", "href": "/" },
        { "label": "About Us", "href": "/view/about_us" },
        { "label": "Services", "href": "/view/services" },
        { "label": "Contact Us", "href": "/view/contact_us" },
        { "label": "Career", "href": "/view/careers" },
        { "label": "Free Estimate", "href": "/view/estimate" },
        // { "label": "Billing", "href": "/view/billing" },
        // { "label": "Contact Us", "href": "/view/contact_us" }
      ]
    },
    // "contact": {
    //   "company": "ProScapes of Atlanta",
    //   "phone": "404-514-6254",
    //   "emailLabel": "contact@ProScapesOfAtlanta.com",
    //   "emailHref": "mailto:proscapesofatl.kw@gmail.com"
    // },
    // "scripts": {
    //   "banner": true,
    //   "intervalMs": 5000
    // }
  };

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
    var linksHtml = links.map(function(l){ return '<a href="' + l.href + '">' + l.label + '</a>'; }).join('');

    var contact = data.contact || {};
    var contactHtml = contact.company ? '<p>' + contact.company + ' | ' + (contact.phone || '') + ' | <a href="' + (contact.emailHref || '#') + '">' + (contact.emailLabel || '') + '</a>' : '';

    container.innerHTML = linksHtml + (contactHtml ? '\n' + contactHtml : '');

    fragment.appendChild(clearDiv);
    fragment.appendChild(container);
    target.appendChild(fragment);


  }

  requestAnimationFrame(function(){ renderFooter(footerData); });
})();
