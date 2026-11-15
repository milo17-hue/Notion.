// Pequeña ayuda: busca un elemento por id (devuelve null si no existe)
const $ = id => document.getElementById(id);

// ---------- Fecha (solo si existe el elemento #today) ----------
const today = $('today');
if (today) {
  const meses = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const hoy = new Date();
  today.textContent = `${hoy.getDate()} ${meses[hoy.getMonth()]}, ${hoy.getFullYear()}`;
}

// ---------- Barra de progreso animada ----------
const bar = $('progress');
const percent = $('percent');
if (bar && percent) {
  const target = Number(bar.dataset.value);
  window.addEventListener('load', () => {
    setTimeout(() => { bar.style.width = target + '%'; }, 300);
    let n = 0;
    const timer = setInterval(() => {
      n++;
      percent.textContent = n + '%';
      if (n >= target) clearInterval(timer);
    }, 22);
  });
}

// ---------- Sidebar: marcar icono activo ----------
document.querySelectorAll('.sidebar button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sidebar button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ---------- Carpetas: la seleccionada se pone azul ----------
const folders = document.querySelectorAll('.folder');
folders.forEach(f => {
  f.addEventListener('click', () => {
    folders.forEach(x => x.classList.remove('active'));
    f.classList.add('active');
  });
});

// ---------- Buscador: filtra las carpetas en tiempo real ----------
const input = $('searchInput');
const empty = $('empty');
if (input) {
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    let visibles = 0;
    folders.forEach(f => {
      const ok = f.textContent.toLowerCase().includes(q);
      f.classList.toggle('hidden', !ok);
      if (ok) visibles++;
    });
    if (empty) empty.style.display = visibles ? 'none' : 'block';
  });
}

// ---------- "ver todos": limpia el filtro ----------
const viewAll = $('viewAll');
if (viewAll && input) {
  viewAll.addEventListener('click', () => {
    input.value = '';
    input.dispatchEvent(new Event('input'));
  });
}

// ---------- Notificaciones: se pueden descartar ----------
document.querySelectorAll('.notif .x').forEach(x => {
  x.addEventListener('click', () => {
    const card = x.closest('.notif');
    card.classList.add('out');
    setTimeout(() => card.remove(), 350);
  });
});

// ---------- Botón Upgrade ----------
const upgrade = $('upgradeBtn');
if (upgrade) {
  upgrade.addEventListener('click', e => {
    e.target.textContent = '¡Plan Pro activado! ✨';
  });
}