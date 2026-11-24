/* Mega menú: abre con el mouse (en compu), con un toque (iPad y celular) y con teclado */
(function () {
  var megas = Array.prototype.slice.call(document.querySelectorAll('.menu-mega'));
  if (!megas.length) return;
  var conMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var timers = new WeakMap();

  function cerrar(m) {
    m.classList.remove('abierto');
    m.querySelector('.mega-boton').setAttribute('aria-expanded', 'false');
  }
  function abrir(m) {
    megas.forEach(function (o) { if (o !== m) cerrar(o); });
    m.classList.add('abierto');
    m.querySelector('.mega-boton').setAttribute('aria-expanded', 'true');
  }

  megas.forEach(function (m) {
    var boton = m.querySelector('.mega-boton');
    boton.addEventListener('click', function (e) {
      e.stopPropagation();
      m.classList.contains('abierto') ? cerrar(m) : abrir(m);
    });
    if (conMouse) {
      m.addEventListener('mouseenter', function () { clearTimeout(timers.get(m)); abrir(m); });
      m.addEventListener('mouseleave', function () { timers.set(m, setTimeout(function () { cerrar(m); }, 180)); });
    }
    m.querySelectorAll('.mega-panel a').forEach(function (a) {
      a.addEventListener('click', function () { cerrar(m); });
    });
  });

  document.addEventListener('click', function (e) {
    megas.forEach(function (m) { if (!m.contains(e.target)) cerrar(m); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    megas.forEach(function (m) {
      if (m.classList.contains('abierto')) { cerrar(m); m.querySelector('.mega-boton').focus(); }
    });
  });
})();
