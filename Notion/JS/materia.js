// =====================================================
//  DATOS: aquí agregas tus documentos de cada materia
//  type: pdf | docx | pptx | sql | xlsx | (otro)
//  date: AAAA-MM-DD   |   size: texto libre (ej. "2.4 MB")
//  url:  ruta o enlace al archivo (ej. "docs/bd2/HCE_Reporte.docx")
//  tag:  etiqueta corta (Taller, Proyecto, Parcial, Guía...)
//  unit: (opcional) agrupa los documentos con un título (ej. "Unidad 1")
//  desc: (opcional) línea de descripción bajo el nombre
//  type 'link' o 'quiz' = enlace (sin botón de descargar)
// =====================================================
const COURSES = {
  'testing-electiva': {
    name: 'Testing - Electiva',
    docs: [
      // ----- Unidad 1 -----
      { name: 'Portafolio unidad 1', type: 'link', date: '2026-09-09', size: 'Notion',
        url: 'https://fern-pearl-934.notion.site/Portafolio-de-aprendizaje-Testing-de-Software-993d9c5e909b47949a0928698e414ab2?source=copy_link',
        unit: 'Unidad 1', tag: 'Portafolio',
        desc: 'Portafolio de aprendizaje en Notion · 10 ago – 30 sep 2026 · Calificado' },
      { name: 'Plan de Pruebas de Software', type: 'docx', date: '2026-09-13', size: '25 KB',
        url: 'docs/testing/U1_Plantilla_de_Plan_Pruebas_Software.docx',
        unit: 'Unidad 1', tag: 'Tarea grupal',
        desc: 'Asociación de fundamentos, principios, tipos y niveles de pruebas (Grupo 7) · 10 – 24 sep 2026 · Calificado' },

      // ----- Unidad 2 -----
      { name: 'Reporte de resultados de pruebas manuales', type: 'xlsx', date: '2026-10-18', size: '106 KB',
        url: 'docs/testing/Reporte_pruebas_manuales.xlsx',
        unit: 'Unidad 2', tag: 'Tarea grupal',
        desc: 'Casos de prueba manuales sobre las historias de usuario (Grupo 7) · 1 – 18 oct 2026' },
      { name: 'Cuestionario: Reconociendo lo aprendido', type: 'quiz', date: '2026-11-13', size: 'Campus',
        url: 'https://campus.pascualbravovirtual.edu.co/mod/quiz/view.php?id=168684',
        unit: 'Unidad 2', tag: 'Cuestionario',
        desc: '1 intento · 1 hora · aprueba con 3,00 de 5,00 · Finalizado el 13 nov 2026' },
      { name: 'Portafolio unidad 2', type: 'link', date: '2026-11-15', size: 'Campus',
        url: 'https://campus.pascualbravovirtual.edu.co/mod/assign/view.php?id=168685',
        unit: 'Unidad 2', tag: 'Portafolio',
        desc: 'Evidencias de pruebas manuales y automáticas · Cierra el 15 nov 2026, 23:59' },
    ]
  },
  'redes-de-datos-1': {
    name: 'Redes de Datos I',
    docs: [
      { name: 'Taller VLSM', type: 'pdf', date: '2026-10-20', size: '1.1 MB', url: '#', tag: 'Taller' },
    ]
  },
  'bases-de-datos-2': {
    name: 'Bases de Datos II',
    docs: [
      { name: 'HCE_Script_Completo', type: 'sql',  date: '2026-09-27', size: '48 KB',  url: '#', tag: 'Proyecto' },
      { name: 'HCE_Reporte_Tecnico', type: 'docx', date: '2026-09-27', size: '1.8 MB', url: '#', tag: 'Proyecto' },
      { name: 'HCE_Presentacion',    type: 'pptx', date: '2026-09-28', size: '3.4 MB', url: '#', tag: 'Proyecto' },
    ]
  },
  'metodologias-agiles': {
    name: 'Metodologías Ágiles',
    docs: []
  },
  'estadistica': {
    name: 'Estadística',
    docs: []
  },
  'ingles-2': {
    name: 'Inglés 2',
    docs: []
  }
};

// =====================================================
//  CÓDIGO (no necesitas tocar nada de aquí para abajo)
// =====================================================
const $ = id => document.getElementById(id);

// Escapa texto para no romper el HTML
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Fecha legible (ej. 27 sep 2026)
const fmt = d => new Date(d + 'T00:00').toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });

// Materia actual: viene de la URL (materia.html?curso=bases-de-datos-2)
const slug = new URLSearchParams(location.search).get('curso') || Object.keys(COURSES)[0];
const course = COURSES[slug] || { name: 'Materia no encontrada', docs: [] };
const docs = [...course.docs].sort((a, b) => b.date.localeCompare(a.date));  // más recientes primero

// ---------- Títulos ----------
document.title = course.name + ' - Portafolio';
$('crumb').textContent = course.name;
$('courseName').textContent = course.name;
$('courseCount').textContent = docs.length + (docs.length === 1 ? ' documento' : ' documentos');

// ---------- Tarjetas de documentos ----------
const cardHTML = d => `
  <div class="doc-card" data-name="${esc(d.name.toLowerCase())}" data-type="${esc(d.type)}">
    <div class="doc-top">
      <div class="doc-ico ${esc(d.type)}">${esc(d.type.toUpperCase())}</div>
      <div class="doc-name">
        <b title="${esc(d.name)}">${esc(d.name)}</b>
        <span>${fmt(d.date)} · ${esc(d.size)}</span>
      </div>
    </div>
    ${d.desc ? `<p class="doc-desc">${esc(d.desc)}</p>` : ''}
    <div class="doc-bottom">
      <span class="doc-tag">${esc(d.tag || 'Documento')}</span>
      <div class="doc-actions">
        <a href="${esc(d.url)}" target="_blank" rel="noopener" title="Ver"><svg class="i"><use href="#eye"/></svg></a>
        ${['link', 'quiz'].includes(d.type) ? '' : `<a href="${esc(d.url)}" download title="Descargar"><svg class="i"><use href="#download"/></svg></a>`}
      </div>
    </div>
  </div>
`;

// Agrupa por unidad (si los documentos no tienen "unit", queda un solo grupo sin título)
const units = [...new Set(docs.map(d => d.unit || ''))].sort();
$('docs').innerHTML = units.map(u => {
  const items = docs.filter(d => (d.unit || '') === u);
  return `
  <section class="unit">
    ${u ? `<h2 class="unit-title">${esc(u)}<span>${items.length} ${items.length === 1 ? 'documento' : 'documentos'}</span></h2>` : ''}
    <div class="docs-grid">${items.map(cardHTML).join('')}</div>
  </section>`;
}).join('');

// ---------- Filtros por tipo ----------
const types = [...new Set(docs.map(d => d.type))];
$('chips').innerHTML =
  `<button class="chip active" data-type="all">Todos</button>` +
  types.map(t => `<button class="chip" data-type="${esc(t)}">${esc(t.toUpperCase())}</button>`).join('');

let activeType = 'all';
const cards = document.querySelectorAll('.doc-card');

// Aplica buscador + filtro de tipo al mismo tiempo
function applyFilters() {
  const q = $('docSearch').value.trim().toLowerCase();
  let visibles = 0;
  cards.forEach(c => {
    const ok = c.dataset.name.includes(q) && (activeType === 'all' || c.dataset.type === activeType);
    c.classList.toggle('hidden', !ok);
    if (ok) visibles++;
  });
  // Oculta el título de una unidad si ninguno de sus documentos coincide
  document.querySelectorAll('.unit').forEach(s => {
    s.classList.toggle('hidden', !s.querySelector('.doc-card:not(.hidden)'));
  });
  $('docEmpty').style.display = visibles ? 'none' : 'block';
  $('docEmpty').textContent = docs.length ? 'No se encontraron documentos 📄' : 'Aún no hay documentos en esta materia 📂';
}

document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeType = chip.dataset.type;
    applyFilters();
  });
});
$('docSearch').addEventListener('input', applyFilters);

// ---------- Panel de información ----------
$('statDocs').textContent = docs.length;
$('statTypes').textContent = types.length;
if (docs.length) {
  // El más reciente entre los que ya ocurrieron (ignora fechas de cierre futuras)
  const hoy = new Date().toLocaleDateString('en-CA');   // AAAA-MM-DD en tu zona horaria
  const latest = docs.find(d => d.date <= hoy) || docs[0];
  $('statLast').textContent = fmt(latest.date);
  $('statNewest').textContent = latest.name;
}
const tags = [...new Set(docs.map(d => d.tag).filter(Boolean))];
$('tags').innerHTML = tags.length
  ? tags.map(t => `<span>${esc(t)}</span>`).join('')
  : '<span>Sin etiquetas</span>';

// Estado inicial (muestra el mensaje si no hay documentos)
applyFilters();

// ---------- Sidebar: botones con enlace (data-href) ----------
document.querySelectorAll('.sidebar button[data-href]').forEach(btn => {
  btn.addEventListener('click', () => { location.href = btn.dataset.href; });
});