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
    this.costoM3 = pCostokWh;
    this.artefacto = pElectrodomestico;
    this.costoElectrico = pCostoElectrico;
  }
}

function pedirDatos2(preciokWh, electrodom, resultado2) {
  let costokWh = preciokWh;
  let electrodomestico = electrodom;
  let costoElectrico = resultado2;
  return new UsuarioAparato(costokWh, electrodomestico, costoElectrico);
}

//Título principal

const tituloPrincipal = $(".tituloPrin");

tituloPrincipal.text("Consumo eléctrico");

//Elementos para realizar conversión W a kW

$("#titulo").append(
  '<p id="parrafoPr">En caso de tener el consumo eléctrico en vatios, haz click aquí para realizar conversión a kilovatios.</p>'
);

const formulario1 = $("#conversion");
const ingresoACon = $(".conver");

formulario1.prepend("<legend>Primero convierte W en kW:</legend>");
formulario1.append('<button id="convertir">Convertir</button>');

formulario1.css("display", "none");

//Animación para conversión

$("#parrafoPr").on("click", () => {
  formulario1.slideToggle(1300);
});

//Captura de información, cálculo y resultado

const btn = $("#convertir");

btn.on("click", function (e) {
  e.preventDefault();
  $("#mResult").remove();
  let resultado = ingresoACon.val() / 1000;
  formulario1.append(
    '<h2 id="mResult">El resultado de la conversión es: ' +
      resultado +
      "kW</h2>"
  );
});

//FUNCION: creación elementos para mostrar

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
  
  const consumoAparato = datos.map( (aparato) => {
    return aparato.tamaño
  })
  consumoAparato.forEach( (item) => {
    
  })

};


//FUNCIÓN: Llamada AJAX de archivo con datos de electrodomésticos

const url = "./electricidad.json";
let datos

const llamAjax = async () => {
  const response = await fetch(url);

  const data = await response.json();

  datos = data.map((item) => new Aparatos(item.nombre, item.tamaño));

  selectores(datos);

};

//Eventos

const seleccion = document.getElementById("seleccionAparato");
const valorkWh = document.getElementById("kWh");
const btnEl = document.getElementById("btnE");

  llamAjax();

let preciokWh = 0;
valorkWh.addEventListener("change", () => {
  preciokWh = valorkWh.value;
  if (valorkWh.length !== 0) {
    valorkWh.classList.remove("input-error");
  } else {
    alert("Por favor, ingrese valor kWh");
  }
});

let electrodom = "";
seleccion.addEventListener("change", () => {
  electrodom = seleccion.value;
  console.log(electrodom);

});


btnEl.addEventListener("click", (e) => {
  e.preventDefault();

  let resultado2 = 
  datosUsuarioE = pedirDatos2(preciokWh, electrodom, resultado2);
});


