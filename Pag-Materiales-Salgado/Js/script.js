/**
 * Array que almacena los productos agregados al pedido.
 * Se guarda en localStorage para persistencia.
 */
let pedido = JSON.parse(localStorage.getItem('pedido')) || [];
/**
 * Página actual mostrada en el catálogo.
 */
let currentPage = 1;
/**
 * Número de productos por página en la vista de catálogo.
 */
const itemsPerPage = 8;
/**
 * Array de productos disponibles en el catálogo.
 * Cada producto tiene nombre, precio, unidad, imagen y categoría.
 */
let productos = [
  { nombre: 'Cemento gris', precios: { bulto: 150, Tonelada: 6000 }, unidad: ['bulto', 'Tonelada'], imagen: 'Images/cemento.jpg', categoria: 'cemento' },
  { nombre: 'Arena fina', precios: { m3: 80, kg: 5 }, unidad: ['m3', 'kg'], imagen: 'Images/arena-fina.jpg', categoria: 'agregados' },
  { nombre: 'Varilla 3/8', precios: { pieza: 120, Tonelada: 12000 }, unidad: ['pieza', 'Tonelada'], imagen: 'Images/varilla-3-8.jpg', categoria: 'acero' },
  { nombre: 'Grava', precios: { m3: 90, kg: 3 }, unidad: ['m3', 'kg'], imagen: 'Images/grava.jpg', categoria: 'agregados' },
  { nombre: 'Malla electrosoldada', precios: { pieza: 200, Mts: 20 }, unidad: ['pieza', 'Mts'], imagen: 'Images/Malla-electrosoldada.jpg', categoria: 'acero' },
  { nombre: 'Cemento blanco', precios: { bulto: 180, Tonelada: 7000 }, unidad: ['bulto', 'Tonelada'], imagen: 'Images/cemento-blanco.jpg', categoria: 'cemento' },
  { nombre: 'Block hueco', precios: { pieza: 12, millar: 12000 }, unidad: ['pieza', 'millar'], imagen: 'Images/block-hueco.jpg', categoria: 'agregados' },
  { nombre: 'Pegazulejo', precios: { bulto: 150, Tonelada: 7000 }, unidad: ['bulto', 'Tonelada'], imagen: 'Images/pegazulejo.jpg', categoria: 'cemento' },
  { nombre: 'Varilla 1/2', precios: { pieza: 150, Tonelada: 15000 }, unidad: ['pieza', 'Tonelada'], imagen: 'Images/varilla-1-2.jpg', categoria: 'acero' },
  { nombre: 'Tabique rojo', precios: { pieza: 9, millar: 9000 }, unidad: ['pieza', 'millar'], imagen: 'Images/tabique-rojo.jpg', categoria: 'agregados' },
  { nombre: 'Cal hidratada', precios: { bulto: 95, Tonelada: 3800 }, unidad: ['bulto', 'Tonelada'], imagen: 'Images/cal-hidratada.jpg', categoria: 'cemento' },
  { nombre: 'Mortero', precios: { bulto: 140, Tonelada: 5600 }, unidad: ['bulto', 'Tonelada'], imagen: 'Images/mortero.jpg', categoria: 'cemento' },
  { nombre: 'Alambre recocido', precios: { kg: 110 }, unidad: ['kg'], imagen: 'Images/alambre-recocido.jpg', categoria: 'acero' },
  { nombre: 'Clavo 2 pulgadas', precios: { kg: 45 }, unidad: ['kg'], imagen: 'Images/clavo-2.jpg', categoria: 'acero' },
  { nombre: 'Ladrillo', precios: { pieza: 8, millar: 8000 }, unidad: ['pieza', 'millar'], imagen: 'Images/ladrillo.jpg', categoria: 'agregados' },
  { nombre: 'Grava fina', precios: { m3: 88, kg: 4 }, unidad: ['m3', 'kg'], imagen: 'Images/grava-fina.jpg', categoria: 'agregados' },
  { nombre: 'Impermeabilizante acrílico', precios: { cubeta: 250, litro: 25 }, unidad: ['cubeta', 'litro'], imagen: 'Images/impermeabilizante.jpg', categoria: 'químicos' },
  { nombre: 'Pintura vinílica', precios: { galón: 180, litro: 50 }, unidad: ['galón', 'litro'], imagen: 'Images/pintura.jpg', categoria: 'químicos' },
  { nombre: 'Yeso', precios: { bulto: 60, kg: 3 }, unidad: ['bulto', 'kg'], imagen: 'Images/yeso.jpg', categoria: 'cemento' },
  { nombre: 'Teja de barro', precios: { pieza: 22, millar: 22000 }, unidad: ['pieza', 'millar'], imagen: 'Images/teja.jpg', categoria: 'agregados' },
  { nombre: 'Panel de yeso', precios: { pieza: 210 }, unidad: ['pieza'], imagen: 'Images/panel-yeso.jpg', categoria: 'agregados' },
  { nombre: 'Poliestireno', precios: { m2: 75, pieza: 50 }, unidad: ['m2', 'pieza'], imagen: 'Images/poliestireno.jpg', categoria: 'agregados' },
  { nombre: 'Cinta para tablaroca', precios: { rollo: 35 }, unidad: ['rollo'], imagen: 'Images/cinta-tablaroca.jpg', categoria: 'químicos' },
  { nombre: 'Tubo PVC 2', precios: { metro: 55, pieza: 500 }, unidad: ['metro', 'pieza'], imagen: 'Images/tubo-pvc.jpg', categoria: 'agregados' }
];


function agregarAlPedido(producto, cantidad, unidad) {
  pedido.push({ producto, cantidad, unidad });
  localStorage.setItem('pedido', JSON.stringify(pedido));
  actualizarListaPedido();
}

function eliminarDelPedido(index) {
  pedido.splice(index, 1);
  localStorage.setItem('pedido', JSON.stringify(pedido));
  actualizarListaPedido();
}

function actualizarListaPedido() {
  const lista = document.getElementById('lista-pedido');
  lista.innerHTML = '';
  let total = 0;

  pedido.forEach((item, index) => {
    // Encuentra el producto en el array global
    const productoObj = productos.find(p => p.nombre === item.producto);

    // Obtén el precio según la unidad seleccionada
    const precioUnitario = productoObj ? productoObj.precios[item.unidad] : 0;

    // Calcula el subtotal para este producto
    const subtotal = precioUnitario * parseInt(item.cantidad, 10);
    total += subtotal;

    // Crea el elemento de la lista
    const li = document.createElement('li');
    li.innerHTML = `
      ${index + 1}. ${item.producto} - ${item.cantidad} ${item.unidad}(s) - $${subtotal.toFixed(2)} MXN
      <button onclick="eliminarDelPedido(${index})">❌ Quitar</button>
    `;
    lista.appendChild(li);
  });

  // Mostrar el total debajo de la lista
  const totalDiv = document.getElementById('total-pedido');
  totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)} MXN</strong>`;

  // Actualiza el enlace de WhatsApp
  actualizarEnlaceWhatsApp();
}

/**
 * Actualiza el enlace de WhatsApp con el pedido y los datos del usuario.
 * Incluye nombre y dirección en el mensaje.
 */
function actualizarEnlaceWhatsApp() {
  const nombre = document.getElementById('nombre-usuario').value.trim();
  const direccion = document.getElementById('direccion-usuario').value.trim();
  let mensaje = 'Hola, quiero hacer un Pedido:\n';
  pedido.forEach(item => {
    mensaje += `- ${item.producto} (${item.cantidad} ${item.unidad})\n`;
  });
  mensaje += `\nNombre: ${nombre}\nDirección: ${direccion}`;
  const url = 'https://wa.me/7771981041?text=' + encodeURIComponent(mensaje);
  document.getElementById('btn-whatsapp').href = url;
}

function mostrarPagina(page) {
  const contenedor = document.getElementById('productos-container');
  contenedor.innerHTML = '';
  const productosFiltrados = obtenerProductosFiltrados();
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginaProductos = productosFiltrados.slice(start, end);

  paginaProductos.forEach((p, i) => {
    const globalIndex = productos.indexOf(p);
    const div = document.createElement('div');
    div.className = 'producto';
    div.dataset.categoria = p.categoria;

    // Precio inicial (por la primera unidad en el array)
    const unidadInicial = p.unidad[0];
    const precioInicial = p.precios[unidadInicial];

    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" />
      <h3>${p.nombre}</h3>
      <p id="precio-${globalIndex}">$${precioInicial}.00 MXN</p>
      <label>Cantidad:</label>
      <input type="number" id="cantidad-${globalIndex}" min="1" value="1" />
      <label>Unidad:</label>
      <select id="unidad-${globalIndex}">
        ${p.unidad.map(u => `<option value="${u}">${u}</option>`).join('')}
      </select>
      <button onclick="agregarAlPedidoPorIndice(${globalIndex})">Agregar</button>
    `;

    contenedor.appendChild(div);

    // Evento para actualizar el precio al cambiar la unidad
    const selectUnidad = document.getElementById(`unidad-${globalIndex}`);
    selectUnidad.addEventListener('change', () => {
      const nuevaUnidad = selectUnidad.value;
      const nuevoPrecio = p.precios[nuevaUnidad];
      document.getElementById(`precio-${globalIndex}`).textContent = `$${nuevoPrecio}.00 MXN`;
    });
  });

  // Actualiza el indicador de página y paginación según productosFiltrados.length
  document.getElementById('pageIndicator').textContent = `Página ${page}`;
}

document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    mostrarPagina(currentPage);
  }
});

document.getElementById('nextPage').addEventListener('click', () => {
  if (currentPage < Math.ceil(productos.length / itemsPerPage)) {
    currentPage++;
    mostrarPagina(currentPage);
  }
});

mostrarPagina(currentPage);
actualizarListaPedido();

function filtrarProductos() {
  const categoria = document.getElementById('filtro-categoria').value.toLowerCase();
  const busqueda = document.getElementById('search').value.toLowerCase();
  const productos = document.querySelectorAll('.producto');

  productos.forEach(p => {
    const nombre = p.querySelector('h3').textContent.toLowerCase();
    const categoriaProducto = p.dataset.categoria.toLowerCase();

    const coincideCategoria = categoria === 'todos' || categoriaProducto === categoria;
    const coincideBusqueda = nombre.includes(busqueda);

    p.style.display = (coincideCategoria && coincideBusqueda) ? 'block' : 'none';
  });
}

function obtenerProductosFiltrados() {
  const categoria = document.getElementById('filtro-categoria').value.toLowerCase();
  const busqueda = document.getElementById('search').value.toLowerCase();

  return productos.filter(p => {
    const coincideCategoria = categoria === 'todos' || p.categoria.toLowerCase() === categoria;
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda);
    return coincideCategoria && coincideBusqueda;
  });
}
/**
 * Cambia el idioma de los textos y placeholders.
 * @param {string} idioma - 'es' para español, 'en' para inglés.
 */
function cambiarIdioma(idioma) {
    // Cambia textos con data-en/data-es
  document.querySelectorAll('[data-en]').forEach(el => {
    if (idioma === 'en') {
      el.textContent = el.getAttribute('data-en');
    } else if (el.hasAttribute('data-es')) {
      el.textContent = el.getAttribute('data-es');
    }
  });
  document.getElementById('search').placeholder = idioma === 'en' ? 'Search product...' : 'Buscar producto...';

  // Cambia los placeholders de los inputs
  document.getElementById('nombre-usuario').placeholder = idioma === 'es' ? 'Tu nombre' : 'Your name';
  document.getElementById('direccion-usuario').placeholder = idioma === 'es' ? 'Tu dirección' : 'Your address';
}

document.getElementById('language-switcher').addEventListener('change', e => cambiarIdioma(e.target.value));
actualizarListaPedido();

window.addEventListener("scroll", function() {
  const btn = document.getElementById("scrollTopBtn");
  btn.style.display = document.documentElement.scrollTop > 300 ? "block" : "none";
});

document.getElementById("scrollTopBtn").addEventListener("click", function() {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function agregarAlPedidoPorIndice(indice) {
  const producto = productos[indice].nombre;
  const cantidad = document.getElementById(`cantidad-${indice}`).value;
  const unidad = document.getElementById(`unidad-${indice}`).value;
  const precio = productos[indice].precios[unidad]; // Obtén el precio según la unidad seleccionada

  if (parseInt(cantidad, 10) < 1) {
    alert('La cantidad debe ser mayor a cero.');
    return;
  }

  pedido.push({ producto, cantidad, unidad, precio });
  localStorage.setItem('pedido', JSON.stringify(pedido));
  actualizarListaPedido();

  // Efecto visual
  const productosDivs = document.querySelectorAll('.producto');
  if (productosDivs[indice]) {
    productosDivs[indice].classList.add('agregado');
    setTimeout(() => {
      productosDivs[indice].classList.remove('agregado');
    }, 500);
  }
}

document.getElementById('modo-oscuro-toggle').onclick = function() {
  document.body.classList.toggle('modo-oscuro');
};
// Actualiza el enlace de WhatsApp cuando se escriben los datos del usuario
document.getElementById('nombre-usuario').addEventListener('input', actualizarEnlaceWhatsApp);
document.getElementById('direccion-usuario').addEventListener('input', actualizarEnlaceWhatsApp);

// Valida los campos antes de enviar el pedido por WhatsApp
document.getElementById('btn-whatsapp').addEventListener('click', function(e) {
  const nombre = document.getElementById('nombre-usuario').value.trim();
  const direccion = document.getElementById('direccion-usuario').value.trim();
  if (!nombre || !direccion) {
    alert('Por favor, ingresa tu nombre y dirección antes de enviar el pedido.');
    e.preventDefault();
  }
});
document.getElementById('filtro-categoria').addEventListener('change', () => {
  currentPage = 1;
  mostrarPagina(currentPage);
});
document.getElementById('search').addEventListener('input', () => {
  currentPage = 1;
  mostrarPagina(currentPage);
});