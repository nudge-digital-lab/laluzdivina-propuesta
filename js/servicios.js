/* Popup de cada servicio: foto, título, bajada, información y acceso a contacto */
(function () {
  var dlg = document.getElementById('servicio-modal');
  var datos = document.getElementById('servicios-datos');
  if (!dlg || !datos) return;
  var lista = JSON.parse(datos.textContent);
  var actual = 0;
  var $ = function (id) { return document.getElementById(id); };

  function mostrar(i) {
    actual = (i + lista.length) % lista.length;
    var s = lista[actual];
    $('sm-foto').src = s.foto;
    $('sm-foto').alt = s.titulo;
    $('sm-icono').innerHTML = s.icono;
    $('sm-grupo').textContent = s.grupo;
    $('sm-titulo').textContent = s.titulo;
    $('sm-bajada').textContent = s.bajada;
    $('sm-info').textContent = s.info;
    $('sm-pos').textContent = (actual + 1) + ' de ' + lista.length;
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-servicio]');
    if (!b) return;
    var i = lista.findIndex(function (s) { return s.id === b.dataset.servicio; });
    if (i < 0) return;
    mostrar(i);
    dlg.showModal();
  });
  dlg.querySelectorAll('.sm-flecha').forEach(function (b) {
    b.addEventListener('click', function () { mostrar(actual + Number(b.dataset.paso)); });
  });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') mostrar(actual + 1);
    if (e.key === 'ArrowLeft') mostrar(actual - 1);
  });
  dlg.querySelector('[data-cerrar]').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  $('sm-contacto').addEventListener('click', function (e) {
    e.preventDefault();
    dlg.close();
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
  });
})();
