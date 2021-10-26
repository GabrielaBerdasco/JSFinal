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


$("#parrafoPr").on('click', () => {
    
    formulario1.slideToggle(1300)

})


const btn = $('#convertir')

btn.on('click', function (e) {
    e.preventDefault()
    $('#mResult').remove()
    let resultado = ingresoACon.val()/1000
    formulario1.append('<h2 id="mResult">El resultado de la conversión es: ' + resultado +'kW</h2>')
});





