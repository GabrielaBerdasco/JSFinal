//Array principal con los datos de gasto de gas por artefacto y tamaño

const artefactos = [
  {
    nombre: "cocina",
    tamaño: ["chico", "mediano", "grande", "horno"],
    calculo: [0.1, 0.15, 0.19, 0.32],
  },

  {
    nombre: "calefon",
    tamaño: [10, 12, 14, 16],
    calculo: [1.61, 1.94, 2.26, 2.58],
  },

  {
    nombre: "termotanque",
    tamaño: [50, 75, 110, 150],
    calculo: [0.43, 0.54, 0.7, 0.86],
  },

  {
    nombre: "termotanqueAR",
    tamaño: [30, 40, 50, 76],
    calculo: [0.59, 2.04, 2.26, 3.23],
  },

  {
    nombre: "estufa",
    tamaño: [2500, 3000, 4500, 6000, 9000, 10000],
    calculo: [0.27, 0.32, 0.48, 0.65, 0.97, 1.08],
  },
];

//Constructor de datos del usuario
class UsuarioArtefacto {
  constructor(pNombre, pCostoM3, pArtefacto, pCosto) {
    this.nombre = pNombre;
    this.costoM3 = pCostoM3;
    this.artefacto = pArtefacto;
    this.costo = pCosto;
  }
}

function pedirDatos(resultado) {
  let nombre = usuario.value;
  let costoM3 = valorM3.value;
  let artefacto = selector.value;
  let costo = resultado;
  return new UsuarioArtefacto(nombre, costoM3, artefacto, costo);
}

//Array para almacenar los cálculos que el usuario obtiene
const arrayArtefactos = [];

//Saludo inicial
const saludo = document.getElementById("saludoInicial");
saludo.innerHTML =
  "Hola! Calculemos cuánto gas consumen los artefactos de tu casa por hora y cuál es el precio (sin impuestos) de ese consumo";
saludo.className = "tituloPrin";


//Mostrar los artefactos para elección del usuario
const selector = document.getElementById("seleccionArtefacto");
const nombreArtef = artefactos.map((artefacto) => {
  return artefacto.nombre;
});
console.log(nombreArtef);

nombreArtef.forEach((artefacto) => {
  const option = document.createElement("option");
  option.value = artefacto;
  option.innerHTML = artefacto;

  selector.appendChild(option);
});


const usuario = document.getElementById("usuario");
const valorM3 = document.getElementById("valorM3");

//Captura nombre de usuario
usuario.addEventListener("change", () => {
  saludo.innerHTML =
    "Hola " +
    usuario.value +
    "! Calculemos cuánto gas consumen los artefactos de tu casa por hora y cuál es el precio (sin impuestos) de ese consumo";
  console.log(usuario.value);
});

//Captura valor del metro cúbico de gas
valorM3.addEventListener("change", () => {
  console.log(valorM3.value);
  let m3 = valorM3.value;
  if (m3.length !== 0) {
    valorM3.classList.remove("input-error");
  }
});

//Captura artefacto a analizar en modal
selector.addEventListener("change", () => {
  console.log(selector.value);
});



//FUNCIÓN: Datos para enviar a página de resultados
const almacenarDatos = () => {
  if (datosUsuario.costo) {
  arrayArtefactos.push(datosUsuario);
  let lista = JSON.stringify(arrayArtefactos);
  localStorage.setItem("arrayArtefactos", lista);
  }
};


//FUNCIÓN: Creación contenido del modal con los datos correspondientes al artefacto elegido
let tamaños1 = [];
let tam = 0;
const crearTam = () => {
  tam = nombreArtef.indexOf(selector.value);
  const tamaños = artefactos[tam].tamaño;
  tamaños1 = tamaños.slice();

  const leyenda = document.createElement("legend");
  leyenda.textContent = "Elija el tamaño del artefacto: ";
  modal1.appendChild(leyenda);

  tamaños.forEach((tamaño) => {
    const crear = document.createElement("input");
    crear.type = "radio";
    crear.setAttribute = ("class", "radioInpt");
    crear.name = "tmño";
    crear.value = tamaño;
    crear.innerHTML = tamaño;
    const crear2 = document.createElement("label");
    crear2.setAttribute("for", "tmño");
    crear2.innerHTML = tamaño;

    modal1.appendChild(crear);
    modal1.appendChild(crear2);
  });
};


//FUNCIÓN: Creación elemento html para mostrar los resultados dentro del modal
const mostarResultado = () => {
  if (datosUsuario.costo) {
    const verResultado = document.createElement("h3");
    verResultado.textContent =
      datosUsuario.nombre +
      ", el gasto de tu artefacto por hora es: $" +
      datosUsuario.costo;
    verResultado.classList = "subtitulos";
    modal1.appendChild(verResultado);
  }
};


//Eventos a esperar en el modal y sus funciones
const modalAbrir = document.getElementById("modal-abrir");
const modalContainer = document.getElementsByClassName("modal-container")[0];
const modal1 = document.getElementsByClassName("modal1")[0];


modalAbrir.addEventListener("click", (e) => {
  e.preventDefault();
  modalContainer.classList.toggle("modal-active");

  crearTam();
});

modalContainer.addEventListener("click", () => {
  modalContainer.classList.toggle("modal-active");
  
  modal1.replaceChildren();//Reemplazo de los datos del modal
});

modal1.addEventListener("click", (e) => {
  e.stopPropagation();

  let elecc = e.target.value;
  let resultado = 0;
  if (selector.value !== "cocina") {
    elecc = parseInt(elecc);
  }
  const cal = tamaños1.indexOf(elecc);
  const calcular = artefactos[tam].calculo;
  const res = calcular[cal];
  resultado = res * valorM3.value;

  datosUsuario = pedirDatos(resultado);

  mostarResultado();

  almacenarDatos();
});
