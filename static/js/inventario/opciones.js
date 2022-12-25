
 
 main_content = $('#main-content');


function clickNuevoProducto(){

    main_content.empty().load(`vistas/inventario/registrar-terreno.php`, {
        postdata: false,
        proveedor : "",
        tonelaje: "",
        modelo : "",
        marca : "",
        cantidad : "",
        costo : "",
        precio : ""}, function (param) {

     

          //Agregando eventos
          $("#manzana").change(()=>{
            let manzana = $("#manzana").val();
            let lote = $("#lote")

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
        
          

        
})
}

function clickEditarProducto(e) {

    let producto_id = getParameterByName("id_product");
    let sucursal_id = getParameterByName("sucursal");

    $.ajax({
        type: "POST",
        url: "../servidor/inventario/traer-datos-en-base-uno.php",
        data: {"id": producto_id, "tabla": "inventario", "indicador": "id"},
        dataType: "JSON",
        success: function (response) {

            response['data'].forEach(element => {
                data = {
                id_producto: producto_id,
                codigo: element.codigo,
                descripcion: element.descripcion,
                marca : element.marca,
                modelo : element.modelo,
                costo : element.costo,
                precio_base : element.precio_base,
                tasa : element.tasa,
                impuesto: element.impuesto,
                precio_total : element.precio_total,
                stock : element.stock,
                estatus : element.estatus,
                sucursal : element.sucursal,
                categoria: element.categoria,
                subcategoria: element.subcategoria,
                id_sucursal: sucursal_id,     
                upc: element.upc,
                fecha_ingreso: element.fecha_ingreso,
                sat_key : element.sat_key
              }
            });
           

            main_content.empty().load(`vistas/inventario/actualizar-datos-producto.php?store_id=${sucursal_id}`, data, ()=>{
              activarNavTab()

              $("#categoria").change(()=>{
                let categoria = $("#categoria").val();
    
                switch (categoria) {
                    case "computacion":
                            $("#subcategoria").prop("disabled", false).empty().css("background", "#FFF").css("color", "#99A3BA").append(`
                            <option value="almacenamiento">Almacenamiento</option>
                            <option value="accesorios">Accesorios</option>
                            <option value="energia">Energia</option>
                            <option value="equipos">Equipos</option>
                            <option value="gaming">Gaming</option>
                            <option value="mantenimiento">Mantenimiento</option>
                            <option value="software">Software</option>
            
                            `)
                        break;
            
                        case "seguridad":
                            $("#subcategoria").prop("disabled", false).empty().css("background", "#FFF").css("color", "#99A3BA").append(`
                            <option value="cctv">CCTV</option>
                            <option value="accesorios">Accesorios</option>
                            <option value="control_acceso">Control de acceso</option>
                            `)
                        break;
            
                        case "impresion":
                            $("#subcategoria").prop("disabled", false).empty().css("background", "#FFF").css("color", "#99A3BA").append(`
                            <option value="consumibles">Consumibles</option>
                            <option value="impresoras">Impresoras</option>
                            `)
                        break; 
                        
                        case "redes":
                            $("#subcategoria").prop("disabled", false).empty().css("background", "#FFF").css("color", "#99A3BA").append(`
                            <option value="cableado_estructurado">Cableado estructurado</option>
                            <option value="conectividad">Conectividad</option>
                            <option value="herramientas">Herramientas</option>
                            <option value="telefonia">Telefonia</option>
                            `)
                        break;
                        case "punto_de_venta":
                            $("#subcategoria").prop("disabled", false).empty().css("background", "#FFF").css("color", "#99A3BA").append(`
                            <option value="cajones">Cajones</option>
                            <option value="impresoras_termicas">Impresoras termicas</option>
                            <option value="escaners">Escaners</option>
                            `)
                        break;
                
                    default:
                    $("#subcategoria").prop("disabled", true).empty().css("background", "#E7E3E3").css("color", "gray").append(`
                            <option value="null">Elige una categoria primero</option>
                            `)
                        break;
                }})
    
                $("#codigo").keyup(function(){
                    let codigo = $("#codigo").val()
                    validarCodigo(codigo)
                })
    
                $("#precio-base").keyup(function(){
                  
                  let precio = precioTotal("base")
                  
                  $("#precio-total").val(precio)
              })
    
              $("#impuesto").change(()=>{
    
                let precio = precioTotal("impuesto")
                $("#precio-total").val(precio)
              })
    
              $("#precio-total").keyup(()=>{
    
                let base = precioTotal("total")
                $("#precio-base").val(base)
              })

              //Activando funcion principal de edicion de imagenes
              dibujarCanvas()
            }
            );
        }
    });
  
           
}

function clickagregarSeries(){
   
    main_content.empty().load(`vistas/inventario/registrar-manzana.php`, function() {
        
      inicializarDataTable();
      });

}



function RegresarAtras(vista){
 
    let id_product = getParameterByName("id_product");
    let sucursal = getParameterByName("store_id");
    let name = getParameterByName("name");

    if(vista == 1){
        main_content.empty().load(`vistas/inventario/seleccionar-tipo-agregar.php?store_id=${sucursal}&name=${name}`);
    }else if(vista == 2){

        main_content.empty().load(`vistas/inventario/nuevo-aire.php`);

       
    }else if(3){ //vista desde el editor de productos
        main_content.empty().load(`vistas/inventario/seleccionar-opcion-edicion.php?store_id=${sucursal}&id_product=${id_product}&name=${name}`);
    }
    
}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

 




