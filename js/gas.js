//Array principal con los datos de gasto de gas por artefacto y tamaño

const artefactos = [
  {
    nombre: "cocina",
    leyenda: "Elegir tamaño de hornalla u horno: ",
    tamaño: ["hornalla chica", "hornalla mediana", "hornalla grande", "horno"],
    calculo: [0.1, 0.15, 0.19, 0.32],
  },

  {
    nombre: "calefon",
    leyenda: "Elegir tamaño (litros por hora): ",
    tamaño: [10, 12, 14, 16],
    calculo: [1.61, 1.94, 2.26, 2.58],
  },

  {
    nombre: "termotanque",
    leyenda: "Elegir tamaño (litros por hora): ",
    tamaño: [50, 75, 110, 150],
    calculo: [0.43, 0.54, 0.7, 0.86],
  },

  {
    nombre: "termotanqueAR",
    leyenda: "Elegir tamaño (litros por hora): ",
    tamaño: [30, 40, 50, 76],
    calculo: [0.59, 2.04, 2.26, 3.23],
  },

  {
    nombre: "estufa",
    leyenda: "Elegir tamaño (kCalorías): ",
    tamaño: [2500, 3000, 4500, 6000, 9000, 10000],
    calculo: [0.27, 0.32, 0.48, 0.65, 0.97, 1.08],
  },
];

//Constructor de datos del usuario
class UsuarioArtefacto {
  constructor(pNombre, pCostoM3, pArtefacto, pTamaño, pCosto) {
    this.nombre = pNombre;
    this.costoM3 = pCostoM3;
    this.artefacto = pArtefacto;
    this.tamaño = pTamaño;
    this.costo = pCosto;
  }
}

function pedirDatos(resultado) {
  let nombre = usuario.value;
  let costoM3 = valorM3.value;
  let artefacto = selector.value;
  let tamañoElegido = elecc;
  let costo = resultado;
  return new UsuarioArtefacto(nombre, costoM3, artefacto, tamañoElegido, costo);
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
let m3;
valorM3.addEventListener("change", () => {
  console.log(valorM3.value);
  m3 = valorM3.value;
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
    sessionStorage.setItem("arrayArtefactos", lista);
  }
};

//FUNCIÓN: Creación contenido del modal con los datos correspondientes al artefacto elegido
let tamaños1 = [];
let tam = 0;
const crearTam = () => {
  tam = nombreArtef.indexOf(selector.value);
  const tamaños = artefactos[tam].tamaño;
  tamaños1 = tamaños.slice();
  const textoLeyenda = artefactos[tam].leyenda;

  const leyenda = document.createElement("legend");
  leyenda.textContent = textoLeyenda;
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
    verResultado.classList = "subtitulo";
    modal1.appendChild(verResultado);
  }
};

//Eventos a esperar en el modal y sus funciones
const modalAbrir = document.getElementById("modal-abrir");
const modalContainer = document.getElementsByClassName("modal-container")[0];
const modal1 = document.getElementsByClassName("modal1")[0];

modalAbrir.addEventListener("click", (e) => {
  e.preventDefault();
  if (m3) {
    modalContainer.classList.toggle("modal-active");
    crearTam();
  } else {
    alert("Por favor ingrese el valor del metro cúbico de gas");
  }
});

modalContainer.addEventListener("click", () => {
  modalContainer.classList.toggle("modal-active");

  modal1.replaceChildren(); //Reemplazo de los datos del modal
});

let elecc;
modal1.addEventListener("click", (e) => {
  e.stopPropagation();

  elecc = e.target.value;
  let resultado = 0;
  if (elecc) {
    if (selector.value !== "cocina") {
      elecc = parseInt(elecc);
    }
    const cal = tamaños1.indexOf(elecc);
    const calcular = artefactos[tam].calculo;
    const res = calcular[cal];
    resultado = res * valorM3.value;
    resultado = resultado.toFixed(2);

    datosUsuario = pedirDatos(resultado);

    mostarResultado();

    almacenarDatos();
  }
});
