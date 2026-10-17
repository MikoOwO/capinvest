// Interactions of the home page. Every control is a real button / link / form field; the visual
// state is carried by aria-* attributes and styled in styles.css. No dependency.
(function () {
  'use strict';

  var $ = function (selector, scope) { return (scope || document).querySelector(selector); };
  var $$ = function (selector, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(selector)); };

  // Mobile menu
  var burger = $('#cp-burger');
  var menu = $('#cp-mobile-menu');
  function setMenu(open) {
    menu.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', burger.getAttribute(open ? 'data-label-close' : 'data-label-open'));
    $('.cp-burger-open', burger).hidden = open;
    $('.cp-burger-close', burger).hidden = !open;
  }
  if (burger && menu) {
    burger.addEventListener('click', function () { setMenu(menu.hidden); });
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !menu.hidden) { setMenu(false); burger.focus(); }
    });
  }

  // Language switch: keep the section the visitor is reading
  $$('[data-lang-switch]').forEach(function (link) {
    link.addEventListener('click', function () {
      link.href = link.getAttribute('href').split('#')[0] + window.location.hash;
    });
  });

  // "What we do for you": sell side / buy side
  var tabs = $$('.cp-tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (other) {
        var on = other === tab;
        other.setAttribute('aria-selected', String(on));
        $('#' + other.getAttribute('aria-controls')).hidden = !on;
      });
    });
  });

  // Expertise: one detail panel for the selected service
  var items = $$('.cp-item');
  items.forEach(function (item) {
    item.addEventListener('click', function () {
      items.forEach(function (other) { other.setAttribute('aria-pressed', String(other === item)); });
      $('#cp-svc-title').textContent = item.getAttribute('data-title');
      $('#cp-svc-desc').textContent = item.getAttribute('data-desc');
      $('#cp-svc-ref').textContent = item.getAttribute('data-ref');
    });
  });

  // Track record: filter by category
  var filters = $$('.cp-filter');
  var deals = $$('[data-cat]');
  filters.forEach(function (filter) {
    filter.addEventListener('click', function () {
      var cat = filter.getAttribute('data-filter');
      filters.forEach(function (other) { other.setAttribute('aria-pressed', String(other === filter)); });
      deals.forEach(function (deal) { deal.hidden = deal.getAttribute('data-cat') !== cat; });
    });
  });

  // Contact form
  var form = $('#cp-form');
  if (!form) return;
  var sent = $('#cp-sent');
  var error = $('#cp-error');
  var submit = $('#cp-submit');
  var operation = form.elements.operation;
  var ops = $$('.cp-op');
  var messages = {
    invalid: form.getAttribute('data-error-invalid'),
    failed: form.getAttribute('data-error-send'),
  };

  ops.forEach(function (op) {
    op.addEventListener('click', function () {
      var on = op.getAttribute('aria-pressed') !== 'true';
      ops.forEach(function (other) { other.setAttribute('aria-pressed', 'false'); });
      op.setAttribute('aria-pressed', String(on));
      operation.value = on ? op.getAttribute('data-op') : '';
    });
  });

  function showError(text) {
    error.textContent = text;
    error.hidden = !text;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var data = Object.fromEntries(new FormData(form).entries());
    var name = String(data.name || '').trim();
    var email = String(data.email || '').trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError(messages.invalid);
      (name ? form.elements.email : form.elements.name).focus();
      return;
    }
    showError('');
    submit.disabled = true;
    submit.textContent = submit.getAttribute('data-label-sending');
    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        form.hidden = true;
        sent.hidden = false;
        sent.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      })
      .catch(function () { showError(messages.failed); })
      .then(function () {
        submit.disabled = false;
        submit.textContent = submit.getAttribute('data-label');
      });
  });

  $('#cp-again').addEventListener('click', function () {
    form.reset();
    operation.value = '';
    ops.forEach(function (op) { op.setAttribute('aria-pressed', 'false'); });
    sent.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });
})();
