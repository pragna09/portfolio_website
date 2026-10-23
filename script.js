(function () {
  // Dark mode toggle (remembers choice)
  var root = document.documentElement;
  document.getElementById('theme').addEventListener('click', function () {
    var dark = root.dataset.theme === 'dark' ||
      (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
    var next = dark ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Typing roll in hero
  var phrases = ['LLM-powered web apps', 'NLP pipelines', 'vision AI tools', 'ML models that ship'];
  var el = document.getElementById('typed');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { el.textContent = phrases[0]; }
  else {
    var p = 0, c = 0, del = false;
    (function tick() {
      var word = phrases[p];
      el.textContent = word.slice(0, c);
      if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
      if (del && c === 0) { del = false; p = (p + 1) % phrases.length; }
      c += del ? -1 : 1;
      setTimeout(tick, del ? 35 : 70);
    })();
  }

  // Hero risk meter count-up
  var ring = document.querySelector('.ring');
  var num = ring.querySelector('b');
  var target = +num.dataset.count;
  if (reduce) { ring.style.setProperty('--p', target); num.textContent = target; }
  else {
    var start = null;
    requestAnimationFrame(function step(t) {
      start = start || t;
      var k = Math.min((t - start) / 1400, 1), v = Math.round(target * (1 - Math.pow(1 - k, 3)));
      ring.style.setProperty('--p', v); num.textContent = v;
      if (k < 1) requestAnimationFrame(step);
    });
  }

  // Project filters
  var chips = document.querySelectorAll('.chip');
  var cards = document.querySelectorAll('.proj');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.toggle('on', c === chip); });
      var f = chip.dataset.f;
      cards.forEach(function (card) {
        card.hidden = f !== 'all' && card.dataset.c.split(' ').indexOf(f) === -1;
      });
    });
  });

  // Contact form: opens the visitor's email app with the message filled in
  document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(e.target);
    var body = d.get('msg') + '\n\n— ' + d.get('name') + ' (' + d.get('email') + ')';
    location.href = 'mailto:koripuripragnasree@gmail.com?subject=' +
      encodeURIComponent('Portfolio message from ' + d.get('name')) +
      '&body=' + encodeURIComponent(body);
  });

  document.getElementById('yr').textContent = new Date().getFullYear();
})();
