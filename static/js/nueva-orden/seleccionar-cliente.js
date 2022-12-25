let cliente = $("#cliente");

//Select2 clientes
cliente.select2({
    placeholder: "Clientes",
    theme: "bootstrap-5",
    height:"20px",
    ajax: {
        url: "../servidor/nueva-orden/buscar-clientes.php",
        type: "post",
        dataType: 'json',
        delay: 250,

        data: function (params) {
         return {
           input: params.term // search term
           
         };
        },
        processResults: function (data) {
            return {
               results: data
            }; 
          },
       
        cache: true

    },
    language:  {

        inputTooShort: function () {
            return "Busca un cliente...";
          },
          
        noResults: function() {
    
          return "Sin resultados";        
        },
        searching: function() {
    
          return "Buscando..";
        }
      },

      templateResult: formatResultClientes,
      templateSelection: formatSelection

});

function formatResultClientes(repo){


    if (repo.loading) {
        return repo.text;
      }

      if(repo.id !== false){
        var $container = $(
          "<span id='"+repo.id+"'>"+ repo.nombre +"</span>"   
        );
      }else{
          $container = "";
      }

        return $container;

}

function formatSelection (repo) {
    //A partir de aqui puedes agregar los clientes
    
    $("#select2-clientes-container").attr("id-cliente", repo.id);

    if(repo.id !== ''){
        
        $("#nombre_cliente").text(repo.nombre)
        $("#nombre_cliente").attr("id_cliente",repo.id)

        if(repo.direccion == false){
          $("#direccion_cliente").empty().append(`
          <option value="null">Este cliente no cuenta con una dirección asignada</option>
          `)
        }else{

          $("#direccion_cliente").empty()
          repo.direccion.forEach(element => {
            let direccion_id = element[0]
            let direccion_tag = `${element.calle} ${element.numero_int} ${element.numero_ext} ${element.colonia} ${element.cp} ${element.municipio} ${element.estado} ${element.pais}`
            $("#direccion_cliente").append(`
                <option value="${direccion_id}">${direccion_tag}</option>
            `)
          });
        }

        if(repo.correos == false){
          $("#correo_cliente").empty().append(`
          <option value="null">Este cliente no cuenta con un correo asignado</option>
          `)
        }else{

          $("#correo_cliente").empty()
          repo.correos.forEach(element => {
            let correo_id = element[0]
            let correo_tag = `${element.correo} ---- ${element.etiqueta}`
            $("#correo_cliente").append(`
                <option value="${correo_id}">${correo_tag}</option>
            `)
          });
        }

        $("#telefono_cliente").val(repo.telefono)
        
       
        /* 
        $("#fecha-ingreso").text(repo.fecha_ingreso)
        $("#contacto").text(repo.contacto)
        $("#rfc").text(repo.rfc)
        $("#id-cliente").text(repo.id); */

        //let direcciones = traerDatosCliente(repo.id)
 

    }
 
   

    return repo.text || repo.nombre;
  }

  function traerDatosCliente(cliente_id){

    let tablas = ["detalle_direccion", "detalle_correo"];
    $.ajax({
        type: "POST",
        url: "../servidor/nueva-orden/traer-detalle-cliente.php",
        data: {"id": cliente_id, "relacion":true, "tabla": "clientes", "tablas_relacionadas": tablas},
        dataType: "JSON",
        success: function (response) {

            $("#direccion").empty()
            
            response["detalle_direccion"].forEach(element => {
                $("#direccion").append(`
                    <option value="${element.id}" 
                    calle="${element.calle}"
                    numero_ext="${element.numero_ext}"
                    numero_int="${element.numero_int}"
                    colonia="${element.colonia}"
                    ciudad="${element.ciudad}"
                    municipio="${element.municipio}"
                    estado="${element.estado}"
                    pais="${element.pais}"
                    cp="${element.cp}">
                    ${element.calle}
                    ${element.numero_ext}
                    ${element.numero_int}
                    ${element.colonia}
                    ${element.municipio}
                    ${element.estado}
                    ${element.pais}
                    ${element.cp}
                    </option>
                `) 
            });

                $("#calle").text(response.detalle_direccion[0].calle)
                $("#no-ext").text(response.detalle_direccion[0].numero_ext)
                $("#no-int").text(response.detalle_direccion[0].numero_int)
                $("#colonia").text(response.detalle_direccion[0].colonia)
                $("#ciudad").text(response.detalle_direccion[0].ciudad)
                $("#municipio").text(response.detalle_direccion[0].municipio)
                $("#estado").text(response.detalle_direccion[0].estado)
                $("#pais").text(response.detalle_direccion[0].pais)
                $("#cp").text(response.detalle_direccion[0].cp)

                $("#direccion").on("change", ()=>{
                    let calle = $("#direccion option:selected").attr("calle");
                    let no_ext = $("#direccion option:selected").attr("numero_ext");
                    let no_int = $("#direccion option:selected").attr("numero_int");
                    let colonia = $("#direccion option:selected").attr("colonia");
                    let ciudad = $("#direccion option:selected").attr("ciudad");
                    let municipio = $("#direccion option:selected").attr("municipio");
                    let estado = $("#direccion option:selected").attr("estado");
                    let pais = $("#direccion option:selected").attr("pais");
                    let cp = $("#direccion option:selected").attr("cp");

                    $("#calle").text(calle)
                $("#no-ext").text(no_ext)
                $("#no-int").text(no_int)
                $("#colonia").text(colonia)
                $("#ciudad").text(ciudad)
                $("#municipio").text(municipio)
                $("#estado").text(estado)
                $("#pais").text(pais)
                $("#cp").text(cp)

                })

                $("#correos").empty();
                let isArray = Array.isArray(response["detalle_correo"])
                if(isArray == true){
                  response["detalle_correo"].forEach(element => {
                    $("#correos").append(`
                        ${element.correo};
                    `) 
                });
                }else{
                  $("#correos").append(`
                        Sin correos agregados
                    `) 
                }
                

        }
    });

  }