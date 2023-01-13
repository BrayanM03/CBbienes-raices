

// Obtener los elementos de los dos select
const proyecto_select = document.getElementById('proyecto');
const manzana_select = document.getElementById('manzana');
const lote_select = document.getElementById('lote');
const precio_input = document.getElementById('precio');
const area_input = document.getElementById('area');
const norte_input = document.getElementById('norte');
const sur_input = document.getElementById('sur');
const este_input = document.getElementById('este');
const oeste_input = document.getElementById('oeste');
const area_colindancias = document.getElementById('area-colindancias');

manzana_select.style.backgroundColor= '#f2f1f1'
lote_select.style.backgroundColor= '#f2f1f1'

// Crear una función que se ejecutará cuando se cambie la opción seleccionada en el primer select
function updateSecondSelect() {
  // Obtener el valor seleccionado en el primer select
  const proyecto_value = proyecto_select.value;


  fetch('../servidor/nueva-orden/traer-datos-select.php', {
  method: 'POST',
  body: JSON.stringify({indicador:'proyecto_id', dato:proyecto_value, tabla: 'manzanas'}),
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(resultado => {
  if(resultado.estatus == true){
    resultado.resultado.forEach(element => {
      manzana_select.innerHTML += ` 
      <option value="${element.no_manzana}">Manzana ${element.no_manzana}</option>
      `
    });
    
    manzana_select.disabled = false
    manzana_select.style.backgroundColor= 'white'


  }else{
    manzana_select.innerHTML = `
      <option value="null">Selecciona una manzana</option>
      `
    area_colindancias.classList.add('d-none')

    manzana_select.disabled = true
    lote_select.disabled = true

    manzana_select.style.backgroundColor= '#f2f1f1'
    lote_select.style.backgroundColor= '#f2f1f1'

  }

precio_input.value = ''


})

}

function updateThirdSelect() {
    // Obtener el valor seleccionado en el primer select
  const manzana_value = manzana_select.value;
  let proyecto = $("#proyecto").val();
  // Limpiar el contenido del segundo select



  fetch('../servidor/nueva-orden/traer-lotes-nueva-orden.php', {
  method: 'POST',
  body: JSON.stringify({indicador:'manzana', dato:manzana_value, proyecto: proyecto, tabla: 'terrenos'}),
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(resultado => {

if(resultado.estatus == true){
  lote_select.innerHTML = ''
    resultado.resultado.sort((a,b)=>{
      return a.lote - b.lote;
    })
    lote_select.innerHTML = 
    `<option value="null">Selecciona un lote</option>`
     resultado.resultado.forEach(element => {
        lote_select.innerHTML += `
        <option value="${element.lote}">Lote ${element.lote}</option>
        `
      });
      lote_select.disabled = false
      lote_select.style.backgroundColor= 'white'

}else{
  lote_select.innerHTML = `
    <option value="null">No hay lotes agregados</option>
    `
    lote_select.disabled = true
    lote_select.style.backgroundColor= '#f2f1f1'
}

precio_input.value = ''
area_colindancias.classList.add('d-none')

})

  }

function updatePrice() {

  const lote_value = lote_select.value;

  fetch('../servidor/nueva-orden/traer-datos-select.php', {
    method: 'POST',
    body: JSON.stringify({indicador:'lote', dato:lote_value, tabla: 'terrenos'}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(resultado => { 
    if(resultado.estatus == true) {
      area_colindancias.classList.remove('d-none')
      resultado.resultado.forEach(element => {
        let precio = parseFloat(element.precio);
        precio_input.value = precio
        norte_input.value = element.norte
        sur_input.value = element.sur
        este_input.value = element.este
        oeste_input.value = element.oeste
        area_input.value = element.area

      });

    area_colindancias.classList.remove('d-none')
      trabajandoPlazos()
    }else{
      precio_input.value = 0
      area_colindancias.classList.add('d-none')


    }
        
  })
  }
  

// Asignar la función creada como manejador del evento onchange del primer select
proyecto_select.onchange = updateSecondSelect;
manzana_select.onchange = updateThirdSelect;
lote_select.onchange = updatePrice;


 //Trabajando con el plazo

 function trabajandoPlazos(){


   let precio = parseFloat($("#precio").val()).toFixed(2);
   
   $("#plazo").keyup(function (e) { 
      let plazo = document.getElementById("plazo").value

        if(plazo.trim().length !== 0){
          let mensualidad = precio / plazo
          let mens = mensualidad.toFixed(2)
          $("#mensualidad").val(mens)
        }

    });
 }