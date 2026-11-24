/* Popup de consulta: cada botón de contacto abre el formulario con el motivo ya elegido */
(function () {
  var dlg = document.getElementById('consulta');
  if (!dlg) return;
  var form = dlg.querySelector('form');
  var titulo = dlg.querySelector('#consulta-titulo');
  var bajada = dlg.querySelector('#consulta-bajada');
  var motivo = form.elements.motivo;
  var quien = form.elements.quien;
  var inst = dlg.querySelector('.campo-institucion');

  var MOTIVOS = {
    vacante: ['Consultá por una vacante', 'Dejanos tus datos y te contamos la disponibilidad y cómo es el ingreso.'],
    visita: ['Coordiná una visita', 'Elegí cuándo te queda cómodo y te confirmamos el día y el horario.'],
    institucional: ['Solicitá información institucional', 'Para PAMI, obras sociales y prepagas: te enviamos la documentación que necesites.'],
    general: ['Escribinos', 'Contanos qué necesitás y te respondemos a la brevedad.']
  };

  function motivoDe(el) {
    if (el.dataset.consulta) return el.dataset.consulta;
    var t = (el.textContent || '').toLowerCase();
    if (/vacante|disponibilidad/.test(t)) return 'vacante';
    if (/visita/.test(t)) return 'visita';
    if (/informaci/.test(t) || /^mailto:/.test(el.getAttribute('href') || '')) return 'institucional';
    return 'general';
  }

  function ajustarQuien() {
    var esInst = quien.value === 'institucion';
    inst.hidden = !esInst;
    inst.querySelector('input').required = esInst;
  }

  function abrir(m) {
    dlg.classList.remove('enviado');
    form.reset();
    titulo.textContent = MOTIVOS[m][0];
    bajada.textContent = MOTIVOS[m][1];
    motivo.value = m;
    quien.value = m === 'institucional' ? 'institucion' : 'familiar';
    ajustarQuien();
    dlg.showModal();
    setTimeout(function () { form.elements.nombre.focus(); }, 50);
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('a[href="#whatsapp"], a[href^="mailto:"], [data-consulta]');
    if (!el || dlg.contains(el)) return;
    e.preventDefault();
    var celu = el.closest('.menu-celu');
    if (celu) celu.removeAttribute('open');
    abrir(motivoDe(el));
  });

  quien.addEventListener('change', ajustarQuien);
  motivo.addEventListener('change', function () {
    var m = motivo.value;
    titulo.textContent = MOTIVOS[m][0];
    bajada.textContent = MOTIVOS[m][1];
  });
  dlg.querySelectorAll('[data-cerrar]').forEach(function (b) {
    b.addEventListener('click', function () { dlg.close(); });
  });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    // Propuesta: cuando tengamos el destino (mail de la residencia o WhatsApp), se envía desde acá.
    dlg.classList.add('enviado');
    dlg.querySelector('#consulta-gracias-nombre').textContent = form.elements.nombre.value.split(' ')[0];
  });
})();
