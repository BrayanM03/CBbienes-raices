


  function editarTerreno(id_terreno){

    Swal.fire({
     
      html: `

      <div class="container">

          <div class="row">
              <div class="col-12">Editar datos del terreno</div>
          </div>

          <div class="row mt-3">
              <div class="col-12 col-md-6">
                  <label for="codigo">Codigo</label>
                  <input type="text" class="form-field" id="codigo" placeholder="0">
                  <div class="col-12 text-end"><small class="d-none" valid="false" id="small_response">Codigo en uso</small></div>
              </div>
              <div class="col-12 col-md-6">
                  <label>Proyecto</label>
                  <select class="form-field" id="proyecto-t">
                    <option value="null">Selecciona un proyecto</option>
                  </select>
              </div>
          </div>

          <div class="row mt-3">
              <div class="col-12 col-md-4">
                  <label for="manzana-t">Manzana</label>
                  <select type="text" class="form-field" id="manzana-t">
                    <option value="null">Selecciona una manzana</option>
                  </select>  
              </div>
              <div class="col-12 col-md-4">
                  <label for="lote-t">Lote</label>
                  <select class="form-field" id="lote-t">
                    <option value="null">Selecciona un lote</option>
                  </select>
              </div>
              <div class="col-12 col-md-4">
                  <label for="precio">Precio</label>
                  <input type="number" class="form-field" id="precio" placeholder="0.00">
              </div>
          </div>

          <div class="row mt-3">
            <div class="col-12">
                <label>Colindancias</label>
          </div>

          <div class="row mt-3">
            <div class="col-12 mt-2">
                <label>Norte</label> <input type="text" class="form-field" id="norte" placeholder="Colindancia norte">
            </div>   
            <div class="col-12 mt-2">
                <label>Sur</label> <input type="text" class="form-field" id="sur" placeholder="Colindancia sur">
            </div>
            <div class="col-12 mt-2">
                <label>Este</label> <input type="text" class="form-field" id="este" placeholder="Colindancia este">
            </div>
            <div class="col-12 mt-2">
                <label>Oeste</label> <input type="text" class="form-field" id="oeste" placeholder="Colindancia oeste">
            </div> 
          </div>

          
      
      </div>
      `,
      didOpen: function(){

        $.ajax({
          type: "POST",
          url: "../servidor/inventario/traer-terrenos-proyectos.php",
          data: {"id_terreno": id_terreno},
          dataType: "JSON",
          success: function (response) {
            if(response.estatus == true){
              document.getElementById('proyecto-t').innerHTML = '';
         

               response.datos.forEach(element => {
           
                let option = document.createElement("option");
                option.value = element.id;
                option.text = element.nombre;
                document.getElementById('proyecto-t').appendChild(option);

                
               });

               $("#precio").val(response.terrenos.precio);
                $("#norte").val(response.terrenos.norte);
                $("#sur").val(response.terrenos.sur);
                $("#este").val(response.terrenos.este);
                $("#oeste").val(response.terrenos.oeste);

                //setetando manzanas
                $.ajax({
                  type: "POST",
                  url: "../servidor/inventario/traer-manzanas.php",
                  data: {"proyecto_id":  document.getElementById('proyecto-t').value},
                  dataType: "JSON",
                  success: function (response2) {
                    if(response2.estatus == true){

                      response2.arreglo_manzanas.forEach(element => {
                       
                        let option = document.createElement("option");
                        option.value = element.no_manzana;
                        option.text = element.no_manzana;
                        document.getElementById('manzana-t').appendChild(option);
        
                        
                       });

                       $('#manzana-t').val(response.terrenos.manzana)
                       $.ajax({
                        type: "POST",
                        url: "../servidor/inventario/traer-lotes.php",
                        data: {"manzana":  document.getElementById('manzana-t').value},
                        dataType: "JSON",
                        success: function (response3) {
                          if(response3.status == true){
                            $('#lote-t').empty();
                            for(var i = 0; i < response3.cantidad_lotes; i++){

                              $('#lote-t').append(`
                                <option value="${i + 1}">${i + 1}</option>
                              `)
                            }

                            $('#lote-t').val(response.terrenos.lote)
                            $('#codigo').val(response.terrenos.codigo)
                          }
                        }})

                    }
                  }
                });

                 
                  
                
                

            }
          }
        });
 






        //Agregando eventos
        $("#manzana-t").change(()=>{
          let manzana = $("#manzana-t").val();
          let lote = $("#lote-t")

          if(manzana !== null){
            $.ajax({
              type: "post",
              url: "../servidor/inventario/traer-lotes.php",
              data: {"manzana": manzana},
              dataType: "JSON",
              success: function (response) {
                let cant_lotes = parseInt(response.cantidad_lotes);
                
                lote.empty()
                for (let index = 0; index < cant_lotes; index++) {
                  console.log(index + 1);
                  lote.append(`<option value="${index + 1}">${index + 1}</option>`)
                  
                }
                lote.prop("disabled", false)
                lote.css("background-color", "white")
              }
            });
          }else{
            lote.prop("disabled", true)
            lote.css("background-color", "rgb(231,227,227)")
          }
          
        });
          
          $("#codigo").keyup(function(){
              let codigo = $("#codigo").val()
              validarCodigo(codigo)
          })

      },
      showConfirmButton: true,
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
      showCancelButton: true
    }).then(function(re){
      if(re.isConfirmed){

        let valid = $("#small_response").val()
        let precio = $("#precio").val()
        let codigo = $("#codigo").val()
        let proyecto = $("#proyecto-t").val()
        let manzana = $("#manzana-t").val()
        let lote = $("#lote-t").val()
        let norte = $("#norte").val()
        let sur = $("#sur").val()
        let este = $("#este").val()
        let oeste = $("#oeste").val()
        
        if(valid == "false"){
          Swal.showValidationMessage(
            `Hay un problema con el codifo, usa otro`
          )
        }else if(precio <= 0){
          Swal.showValidationMessage(
            `El precio no puede ser menor o igual a 0`
          )
        }else{

          datosForm = new FormData();
          datosForm.append("id_terreno", id_terreno); 
          datosForm.append("codigo", codigo); 
          datosForm.append("proyecto", proyecto);
          datosForm.append("manzana", manzana); 
          datosForm.append("lote", lote);
          datosForm.append("precio", precio);
          datosForm.append("norte", norte);
          datosForm.append("sur", sur);
          datosForm.append("este", este);
          datosForm.append("oeste", oeste);

          $.ajax({
            type: "POST",
            url: "../servidor/inventario/actualizar-terreno.php",
            processData: false,
            contentType: false,
            data: datosForm,
            dataType: "JSON",
            success: function (response) {
                if(response.estatus == true){
               
                    Swal.fire({
                        icon: "success",
                        html: "<b>"+response.mensaje+"</b>",
                        allowOutsideClick: false,
                        confirmButtonText: "Entendido"
                    }).then((responses)=>{
                      if(responses.isConfirmed){
                        tabla.ajax.reload(false, null);
                      }
                    })
                }else{
                  Swal.fire({
                    icon: "error",
                    html: "<b>"+response.mensaje+"</b>",
                    allowOutsideClick: false,
                    confirmButtonText: "Entendido"
                })
                }
            }
        });
        }
      }
    });
  }

  function eliminarTerreno(id_terreno){
    Swal.fire({
      icon: 'question',
      html: "¿Seguro de eliminar este terreno?",
      confirmButtonText: "Si",
      showCancelButton: true,
      cancelButtonText: "Mejor no"
    }).then(function(r){
      if(r.isConfirmed){
        $.ajax({
          type: "POST",
          url: "../servidor/inventario/eliminar-terreno.php",
          data: {"id_terreno": id_terreno},
          dataType: "JSON",
          success: function (response4) {
            if(response4.estatus == true){
              Swal.fire({
                icon: "success",
                html: "<b>"+response.mensaje+"</b>",
                allowOutsideClick: false,
                confirmButtonText: "Entendido"
            }).then((responses)=>{
              if(responses.isConfirmed){
                tabla.ajax.reload(false, null);
              }
            })
            }
          }})
      }
    })
   
  }



 async function validarCodigo(codigo) {

  if(codigo == "" || codigo.length == 0){

      $("#codigo").css("border", "1px solid red")
      $("#small_response").css("color", "red").removeClass("d-none").attr("valid", "false").text("Agrega un codigo")

  }else if (/\s/.test(codigo)) {
      $("#codigo").css("border", "1px solid red")
      $("#small_response").css("color", "red").removeClass("d-none").attr("valid", "false").text("No puede haber espacios en el codigo")
  }else{
      let data = {"codigo": codigo};

      console.log(data);
       
      await fetch('../servidor/inventario/validar-codigo.php',{ 
       method: 'POST',
       body: JSON.stringify(data),
       headers:{
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         }
      })
     .then(response => response.json())
     .then(data => {
       if(data.status == true){
           $("#codigo").css("border", "1px solid green")
           $("#small_response").css("color", "green").removeClass("d-none").attr("valid", "true").text("Codigo disponible")
       }else if(data.status ==false){
           $("#codigo").css("border", "1px solid red")
           $("#small_response").css("color", "red").removeClass("d-none").attr("valid", "false").text("Codigo en uso")
       }
      
   });

  }

 

} 



  