//Class para instanciar aparatos

class Aparatos {
  constructor(pNombre, pTamaño) {
    this.nombre = pNombre;
    this.tamaño = pTamaño;
  }
}

//Constructor de datos del usuario
class UsuarioAparato {
  constructor(pCostokWh, pElectrodomestico, pCostoElectrico) {
    this.costokWh = pCostokWh;
    this.aparato = pElectrodomestico;
    this.costoElectrico = pCostoElectrico;
  }
}

function pedirDatos2(preciokWh, electrodom, consumoIngreso) {
  let costokWh = preciokWh;
  let electrodomestico = electrodom;
  let costoElectrico = consumoIngreso;
  return new UsuarioAparato(costokWh, electrodomestico, costoElectrico);
}

//FUNCIÓN: Datos para enviar a página de resultados

const arrayAparatos = [];

const guardarDatos = () => {
  if (datosUsuarioE.costoElectrico) {
    arrayAparatos.push(datosUsuarioE);
    let lista2 = JSON.stringify(arrayAparatos);
    sessionStorage.setItem("arrayAparatos", lista2);
  }
};

//Título principal

const tituloPrincipal = $(".tituloPrin");

tituloPrincipal.text("Consumo eléctrico");

//Elementos para realizar conversión W a kW

$("#titulo").append(
  '<p id="parrafoPr1" class="parrafoPr">En caso de tener el consumo eléctrico en vatios, <strong>haz click aquí</strong> para realizar conversión a kilovatios.</p>'
);

const formulario1 = $("#conversion");
const ingresoACon = $("#conver");

formulario1.prepend("<legend>Primero convierte W en kW:</legend>");
formulario1.append('<button id="convertir">Convertir</button>');

formulario1.css("display", "none");

//Animación para conversión

$("#parrafoPr1").on("click", () => {
  formulario1.slideToggle(1300);
});

//Captura de información, cálculo y resultado

const btn = $("#convertir");
let resultado;

btn.on("click", function (e) {
  e.preventDefault();
  $("#mResult").remove();
  resultado = ingresoACon.val() / 1000;
  formulario1.append(
    '<h2 id="mResult">El resultado de la conversión es: ' +
      resultado +
      "kW</h2>"
  );
});

//Elementos para conocer consumo estándar

const formulario2 = $("#consumoEstandar");
const eleccionMuestra = $("#seleccionAparato");

formulario2.prepend(
  '<label for="consumos">Selecciona el aparato del que deseas conocer el consumo:</label>'
);

formulario2.css("display", "none");

//Animación para conversión

$("#parrafoPr2").on("click", () => {
  formulario2.slideToggle(1300);
});

//FUNCION: creación option para mostrar aparatos sugeridos

const selectores = (datos) => {
  const nombreAparato = datos.map((aparato) => {
    return aparato.nombre;
  });

  nombreAparato.forEach((item) => {
    const opcion = document.createElement("option");
    opcion.value = item;
    opcion.innerHTML = item;

    seleccion.appendChild(opcion);
  });
};

//FUNCIÓN: Llamada AJAX de archivo con datos de electrodomésticos

const url = "./json/electricidad.json";

const llamAjax = async () => {
  const response = await fetch(url);

  const data = await response.json();

  let datos;
  datos = data.map((item) => new Aparatos(item.nombre, item.tamaño));

  selectores(datos);
};

//FUNCION: Llamada AJAX tamaño electrodomésticos para cálculos

const consumoAparatos = async (indElec) => {
  const response = await fetch(url);

  const data = await response.json();

  let datos = data.map((item) => {
    return item.tamaño;
  });

  let consumo = datos[indElec];

  let resul = consumo / 1000;

  console.log(resul);

  mostarResult.innerHTML =
    "El consumo de electricidad por hora del electrodoméstico seleccionado es: " +
    resul +
    "kWh";

  return resul;
};

//Eventos

const seleccion = document.getElementById("seleccionAparato");
const mostarResult = document.getElementById("mostrarResultado");
const btnCEstandar = document.getElementById("btnEstandar");

llamAjax();

let electrodom = "";
let indElec;
seleccion.addEventListener("click", () => {
  indElec = seleccion.selectedIndex;
  console.log(indElec);
});

let promise1;
let resultado2;
btnCEstandar.addEventListener("click", (e) => {
  e.preventDefault();

  if (isNaN(indElec)) {
    alert("Por favor, seleccione aparato");
  } else {
    resultado2 = consumoAparatos(indElec);
  }
});

const elecUsuario = document.getElementById("eleUsuario");
const valorkWh = document.getElementById("kWh");
const btnEl = document.getElementById("btnE");
const consElectrico = document.getElementById("consumoElectrico");
const formulario3 = $("#resultadoFinal");

elecUsuario.addEventListener("change", () => {
  electrodom = elecUsuario.value;
});

let preciokWh;
valorkWh.addEventListener("change", () => {
  preciokWh = valorkWh.value;

  if (valorkWh.length !== 0) {
    valorkWh.classList.remove("input-error");
  } else {
    alert("Por favor, ingrese valor kWh");
  }
});

consElectrico.addEventListener("click", () => {
  if (resultado) {
    consElectrico.placeholder = resultado;
  }

  if (resultado2) {
    promise1 = Promise.resolve(resultado2);
    promise1.then((value) => {
      consElectrico.placeholder = value;
    });
  }

  if (consElectrico.length !== 0) {
    consElectrico.classList.remove("input-error");
  }
});

let consumoIngreso;
btnEl.addEventListener("click", (e) => {
  e.preventDefault();
  $("#resultadoF").remove();

  if (preciokWh && consElectrico.value) {
    consumoIngreso = consElectrico.value * preciokWh;
    consumoIngreso = consumoIngreso.toFixed(2);

    formulario3.append(
      '<h2 id="resultadoF">El costo por hora es: $' + consumoIngreso + "</h2>"
    );

    datosUsuarioE = pedirDatos2(preciokWh, electrodom, consumoIngreso);

    console.log(datosUsuarioE);

    guardarDatos();

    console.log(arrayAparatos);
  } else {
    alert("Por favor, ingrese valor de kWh y/o consumo.");
  }
});
