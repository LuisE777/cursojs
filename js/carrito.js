//levv mi iniciales

const carritolevv = document.querySelector("#carrito");
const listaCursoslevv = document.querySelector("#lista-cursos"); 
const contenedorCarritolevv = document.querySelector("tbody");
const vaciarCarritolevv = document.querySelector("#vaciar-carrito");

let articulosCarritolevv = [];

cargarEventosListeners();
function cargarEventosListeners() {
   listaCursoslevv.addEventListener("click", agregarCurso);
   carritolevv.addEventListener("click", eliminarCurso);

   document.addEventListener("DOMContentLoaded", () => {
      articulosCarritolevv = JSON.parse(localStorage.getItem("carrito")) || [];
      carritoHTML();
   });

   vaciarCarritolevv.addEventListener("click", () => {
      articulosCarritolevv = []; // Reseteamos el arreglo
      limpiarHTML();
   })

}


function agregarCurso(event) {
   event.preventDefault();
   if (event.target.classList.contains("agregar-carrito")) {
      const cursoSeleccionadolevv = event.target.parentElement.parentElement;
      leerDatosCurso(cursoSeleccionadolevv);
   }
}

function eliminarCurso(event) {  
   if (event.target.classList.contains("borrar-curso")) {
      const cursoIdlevv = event.target.getAttribute("data-id");
      articulosCarritolevv = articulosCarritolevv.filter((cursoSeleccionadolevv) => {
         return cursoSeleccionadolevv.id !== cursoIdlevv;
      })
      carritoHTML();      
   }
}



function leerDatosCurso(cursoSeleccionadolevv) {
     const infoCursolevv = {
      imagen: cursoSeleccionadolevv.querySelector("img").src,
      titulo: cursoSeleccionadolevv.querySelector("h4").textContent,
      precio: cursoSeleccionadolevv.querySelector(".precio span").textContent.replace("$", ""),
      id: cursoSeleccionadolevv.querySelector(".agregar-carrito").getAttribute("data-id"), 
      cantidad: 1,
   }

   const existelevv = articulosCarritolevv.some((cursoSeleccionadolevv)=>{
      return cursoSeleccionadolevv.id === infoCursolevv.id;
   });


   if (existelevv) {
      const cursoslevv = articulosCarrito.map(cursoSeleccionadolevv => {
         if (cursoSeleccionadolevv.id === infoCursolevv.id) {
            cursoSeleccionadolevv.cantidad++;
            cursoSeleccionadolevv.total = cursoSeleccionadolevv.precio * cursoSeleccionadolevv.cantidad;
            return cursoSeleccionadolevv;
         } else {
            return cursoSeleccionadolevv;
         }
      });
      articulosCarritolevv = [...cursoslevv];

   } else {
      infoCursolevv.total = infoCursolevv.precio;
      articulosCarritolevv = [...articulosCarritolevv, infoCursolevv]; 
   }
   


   carritoHTML();
}

function carritoHTML() {
   limpiarHTML();
   articulosCarritolevv.forEach(cursoSeleccionadolevv => {
      const rowlevv = document.createElement("tr");
      rowlevv.innerHTML = `
       <td><img src="${cursoSeleccionadolevv.imagen}" width="120" ></td>
      <td>${cursoSeleccionadolevv.titulo}</td>
      <td>$${cursoSeleccionadolevv.precio}</td>
      <td>${cursoSeleccionadolevv.cantidad}</td>
      <td>$${cursoSeleccionadolevv.total}</td>

      <td><a href="#" class="borrar-curso" data-id="${cursoSeleccionadolevv.id}">Borrar</a></td>
      
      `;
      contenedorCarritolevv.appendChild(rowlevv);
   });

   sincronizarStorage();

}


function sincronizarStorage() {
   localStorage.setItem("carrito", JSON.stringify(articulosCarritolevv));
}


function limpiarHTML() {
   contenedorCarritolevv.innerHTML = ""; // Eliminar el HTML previo
}