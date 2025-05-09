document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const rutaId = params.get("ruta");

  if (!rutaId) {
    console.error("No se proporcionó una ruta en la URL.");
    return;
  }

  fetch("../rutas.json")
    .then((response) => {
      if (!response.ok) throw new Error("No se pudo cargar el JSON");
      return response.json();
    })
    .then((rutas) => {
      const ruta = rutas.find((r) => r.id === rutaId);

      if (!ruta) {
        console.error("No se encontró la ruta con id:", rutaId);
        return;
      }

      // 1. Portada
      document.getElementById("ruta-imagen-portada").src = ruta.imagenPortada;
      document.getElementById("ruta-imagen-portada").alt = ruta.nombre;
      document.getElementById("ruta-nombre").textContent = ruta.nombre;
      document.getElementById("ruta-presentacion").textContent = ruta.presentacion;

      // 2. Resumen
      document.getElementById("ruta-resumen").textContent = ruta.resumen;

      // 3. Lugares
      const lugaresContenedor = document.getElementById("lugares-contenedor");
      ruta.lugares.forEach((lugar) => {
        const lugarCard = document.createElement("div");
        lugarCard.classList.add("lugar-card");
        lugarCard.innerHTML = `
          <img src="${lugar.imagen}" alt="${lugar.nombre}">
          <h3>${lugar.nombre}</h3>
          <p>${lugar.descripcion}</p>
        `;
        lugaresContenedor.appendChild(lugarCard);
      });

      // 4. Incluye
      const incluyeLista = document.getElementById("ruta-incluye-lista");
      ruta.incluye.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        incluyeLista.appendChild(li);
      });

      // 5. Recomendaciones
      const recomendacionesLista = document.getElementById("ruta-recomendaciones-lista");
      ruta.recomendaciones.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        recomendacionesLista.appendChild(li);
      });

    })
    .catch((error) => {
      console.error("Error al cargar los datos de la ruta:", error);
    });
});
