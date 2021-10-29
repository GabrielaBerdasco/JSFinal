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
  
  function pedirDatos(resultado) {
    let costokWh = valorkWh.value;
    let electrodomestico = seleccion.value;
    let costoElectrico = resultado;
    return new UsuarioAparato(costokWh, electrodomestico, costoElectrico);
  }


//Título principal

const tituloPrincipal = $('.tituloPrin')

tituloPrincipal.text("Consumo eléctrico")


//Elementos para realizar conversión W a kW 

$('#titulo').append('<p id="parrafoPr">En caso de tener el consumo eléctrico en vatios, haz click aquí para realizar conversión a kilovatios.</p>')

const formulario1 = $('#conversion')
const ingresoACon = $('.conver')

formulario1.prepend("<legend>Primero convierte W en kW:</legend>")
formulario1.append('<button id="convertir">Convertir</button>')

formulario1.css('display', 'none')


//Animación para conversión

$("#parrafoPr").on('click', () => {
    
    formulario1.slideToggle(1300)

})


//Captura de información, cálculo y resultado

const btn = $('#convertir')

btn.on('click', function (e) {
    e.preventDefault()
    $('#mResult').remove()
    let resultado = ingresoACon.val()/1000
    formulario1.append('<h2 id="mResult">El resultado de la conversión es: ' + resultado +'kW</h2>')
});


//Llamada AJAX de archivo con datos de electrodomésticos

const url = "./electricidad.json"


const seleccion = document.getElementById("seleccionAparato")
   

    fetch(url)
        .then( (response) => response.json() )
        .then( (data) => {
            console.log(data)  
            
            const datos = data.map( (item) => new Aparatos(item.nombre, item.tamaño))

            selectores(datos);
                

    })
        .catch( () => {
            alert("No hay resultados para esa búsqueda")
        })
    





//FUNCION: creación elementos para mostrar

const selectores = (datos) => {

    const nombreAparato = datos.map((aparato) => {
    return aparato.nombre;
})

    nombreAparato.forEach( item => {
        const opcion = document.createElement("option");
        opcion.value = item;
        opcion.innerHTML = item;

  seleccion.appendChild(opcion);
    });
}


//Eventos

 const valorkWh = document.getElementById('kWh');
 const btnEl = document.getElementById('btnE')

 valorkWh.addEventListener('change', () => {
    let preciokWh = valorkWh.value;
    if(preciokWh !== 0) {
        valorkWh.classList.remove("input-error");
    } else {
        alert("Por favor, ingrese valor kWh")
    }
 })

 seleccion.addEventListener('change', () => {
     let electrodom = seleccion.value
     console.log(electrodom);
 })


 btnEl.addEventListener('click', (e) =>{
    e.preventDefault()


 })