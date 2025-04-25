

const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos"); 
const contenedorCarrito = document.querySelector("tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");

let articulosCarrito = [];

cargarEventosListeners();
function cargarEventosListeners() {
   // console.log("cargarEventosListeners");
   listaCursos.addEventListener("click", agregarCurso);
   carrito.addEventListener("click", eliminarCurso);

   document.addEventListener("DOMContentLoaded", () => {
      articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carritoHTML();
   });

   vaciarCarrito.addEventListener("click", () => {
      // console.log("vaciar carrito");
      articulosCarrito = []; // Reseteamos el arreglo
      limpiarHTML();
   })

}


function agregarCurso(event) {
   event.preventDefault();
   // console.log("agregar Curso");
   // console.log(event.target.classList);
   if (event.target.classList.contains("agregar-carrito")) {
      // console.log("agregando al carrito");
      // console.log(event.target.parentElement.parentElement);
      const cursoSeleccionado = event.target.parentElement.parentElement;
      leerDatosCurso(cursoSeleccionado);
   }
}

function eliminarCurso(event) {
   // console.log("eliminar curso");   
   if (event.target.classList.contains("borrar-curso")) {
      const cursoId = event.target.getAttribute("data-id");
      articulosCarrito = articulosCarrito.filter((cursoSeleccionado) => {
         return cursoSeleccionado.id !== cursoId;
      })
      // console.log(articulosCarrito);
      carritoHTML();      
   }
}



function leerDatosCurso(cursoSeleccionado) {
   //  console.log(cursoSeleccionado);
     const infoCurso = {
      imagen: cursoSeleccionado.querySelector("img").src,
      titulo: cursoSeleccionado.querySelector("h4").textContent,
      precio: cursoSeleccionado.querySelector(".precio span").textContent.replace("$", ""),
      id: cursoSeleccionado.querySelector(".agregar-carrito").getAttribute("data-id"), 
      cantidad: 1,
   }

   const existe = articulosCarrito.some((cursoSeleccionado)=>{
      return cursoSeleccionado.id === infoCurso.id;
   });

   // console.log(existe);

   if (existe) {
      const cursos = articulosCarrito.map(cursoSeleccionado => {
         if (cursoSeleccionado.id === infoCurso.id) {
            cursoSeleccionado.cantidad++;
            cursoSeleccionado.total = cursoSeleccionado.precio * cursoSeleccionado.cantidad;
            return cursoSeleccionado;
         } else {
            return cursoSeleccionado;
         }
      });
      articulosCarrito = [...cursos];

   } else {
      // console.log(infoCurso); 
      infoCurso.total = infoCurso.precio;
      articulosCarrito = [...articulosCarrito, infoCurso]; 
   }
   


  
   // console.log(articulosCarrito);
   carritoHTML();
}

function carritoHTML() {
   limpiarHTML();
   articulosCarrito.forEach(cursoSeleccionado => {
      const row = document.createElement("tr");
      row.innerHTML = `
       <td><img src="${cursoSeleccionado.imagen}" width="120" ></td>
      <td>${cursoSeleccionado.titulo}</td>
      <td>$${cursoSeleccionado.precio}</td>
      <td>${cursoSeleccionado.cantidad}</td>
      <td>$${cursoSeleccionado.total}</td>

      <td><a href="#" class="borrar-curso" data-id="${cursoSeleccionado.id}">Borrar</a></td>
      
      `;
      contenedorCarrito.appendChild(row);
   });

   sincronizarStorage();

}


function sincronizarStorage() {
   localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}


function limpiarHTML() {
   contenedorCarrito.innerHTML = ""; // Eliminar el HTML previo
}