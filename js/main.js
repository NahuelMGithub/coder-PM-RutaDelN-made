document.addEventListener("DOMContentLoaded", function() {
  // Cargar rutas desde el archivo JSON
  fetch('../rutas.json')
    .then(response => response.json())
    .then(rutasData => {
      const rutasContenedor = document.querySelector('#rutas-contenedor .container .row');

      rutasData.forEach(ruta => {
        // Verificar si imagenPortada existe en el JSON
        if (ruta.imagenPortada) {
          const card = document.createElement('div');
          card.classList.add('col-md-4', 'mb-4');  // Aseguramos que los cards tengan buen diseño
          card.innerHTML = `
            <div class="card">
              <img src="${ruta.imagenPortada}" alt="${ruta.nombre}" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${ruta.nombre}</h5>
                <p class="card-text">${ruta.resumen}</p>
                <a href="rutas.html?ruta=${encodeURIComponent(ruta.id)}" class="btn btn-primary">Ver más</a>
              </div>
            </div>
          `;
          rutasContenedor.appendChild(card);
        } else {
          console.warn(`La ruta ${ruta.nombre} no tiene imagenPortada definida.`);
        }
      });
    })
    .catch(error => {
      console.error("Error al cargar las rutas:", error);
    });
});
