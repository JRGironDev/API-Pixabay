const registrosPorPagina = 64;
let totalPaginas;
let iterador;
let paginaActual = 1;
const paginacion = document.querySelector(".paginacion");
const imagenPeque = document.querySelector(".imagen");

document.addEventListener("DOMContentLoaded", function () {
  const resultado = document.querySelector("#resultado");
  const formulario = document.querySelector("#formulario");
  const inputBuscar = document.querySelector("#buscar");

  inputBuscar.addEventListener("input", function (evento) {
    evento.preventDefault();

    buscarImagenes();
  });

  /* inputBuscar.addEventListener("keydown", function (evento) {
    evento.preventDefault();
    if (evento.keyCode === 13) {
      buscarImagenes(terminoBusqueda);
      terminoBusqueda = "";
    } else {
      terminoBusqueda += evento.key;
    }
  });

  inputBuscar.addEventListener("keydown", function (evento) {
    evento.preventDefault();
    console.log(terminoBusqueda);
    if (evento.keyCode === 13) {
      buscarImagenes(terminoBusqueda);
      terminoBusqueda = "";
    } else {
      terminoBusqueda += evento.key;
    }
  });*/

  /*function validarFormulario(evento) {
    evento.preventDefault();
    terminoBusqueda += evento.key;
    console.log(terminoBusqueda);
    if (evento.target.value.trim() === "") {
      return;
    }
    if (evento.keyCode === 13) {
      buscarImagenes(terminoBusqueda);
    }
  }*/
});

function mostrarAlerta(mensaje) {
  const existeAlerta = document.querySelector(".error");

  if (!existeAlerta) {
    const alerta = document.createElement("P");
    alerta.classList.add("error");
    alerta.innerText = `
      ${mensaje}
    `;

    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function buscarImagenes() {
  const query = document.querySelector("#buscar").value;

  const key = "33571242-31fb89b76690561774b77ce79";
  const url = `https://pixabay.com/api/?key=${key}&q=${query}&per_page=${registrosPorPagina}&page=${paginaActual}`;

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      totalPaginas = calcularPaginas(resultado.totalHits);
      mostrarImagenes(resultado.hits);
    });
}

function* crearPaginador(total) {
  for (let i = 1; i <= total; i++) {
    yield i;
  }
}

function mostrarImagenes(imagenes) {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }

  imagenes.forEach((imagen) => {
    const { previewURL, largeImageURL } = imagen;
    resultado.innerHTML += `
      <a href="${largeImageURL}" target="_blank" rel="noopener noreferrer"><img class="imagen" src="${previewURL}"></a>
    `;
  });

  while (paginacion.firstChild) {
    paginacion.removeChild(paginacion.firstChild);
  }

  imprimirPaginador();
}

function imprimirPaginador() {
  const iterador = crearPaginador(totalPaginas);

  while (true) {
    const { value, done } = iterador.next();
    if (done) return;

    const boton = document.createElement("A");
    boton.href = "#";
    boton.dataset.pagina = value;
    boton.textContent = value;
    boton.classList.add("siguiente");

    boton.onclick = () => {
      paginaActual = value;

      buscarImagenes();
    };
    paginacion.appendChild(boton);
  }
}

function calcularPaginas(total) {
  return parseInt(Math.ceil(total / registrosPorPagina));
}
