function realizarCompraVenta(){

    let cliente = $("#nombre_cliente").attr("id_cliente")
    let fecha = $("#fecha").val()
    let direccion_cliente = $("#direccion_cliente").val()
    let correo_cliente = $("#correo_cliente").val()
    let telefono_cliente = $("#telefono_cliente").val()
    let comentario = $("#comentario").val()


    if(fecha == "" || fecha == null){
        Toast.fire({
            icon: 'error',
            title: "Selecciona una fecha"
          })
    }else if(cliente == null || cliente == ""){
        Toast.fire({
            icon: 'error',
            title: "Selecciona un cliente"
          })
    }else{

    

        $.ajax({
            type: "POST",
            url: "../servidor/nueva-orden/procesar-compra-venta.php",
            data: {
                cliente, fecha, comentario, direccion_cliente, correo_cliente, telefono_cliente
            },
            dataType: "JSON",
            success: function (response) {
                if(response.estatus == true){
                    traerTotales(1)
                    Swal.fire({
                        icon: 'success',
                        html: response.mensaje,
                        allowOutsideClick: false,
                        confirmButtonText: "Aceptar", 
                        didOpen: function(){

                            if(response.array_detalle.length > 0){


                            response.array_detalle.forEach(element => {
                                guardarContrato(element.id,element.orden_id, response.datos_cliente.correo, response.datos_cliente.nombre, cliente)

                                $("#detalles-de-orden").append(`
                                <a href="#" class="list-group-item list-group-item-action">

                                    <div class="row">
                                        <div class="col-md-8">
                                            Proyecto: ${element.proyecto} - Manzana: ${element.manzana} - Lote: ${element.lote}
                                        </div>
                                        <div class="col-md-4">
                                            <div class="btn btn-danger" onclick="verContrato( ${element.id},${element.orden_id})">Ver contrato</div>
                                        </div>
                                    </div>

                                </a>
                                `)

                            });

                            }else{
                                $("#detalles-de-orden").append(`
                                <a href="#" class="list-group-item list-group-item-action">
                                    Sin datos
                                </a>
                                `)
                            }


                        },
                        html: `
                            <div class="container">

                            <div class="list-group">
                            <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                                Ver contratos
                            </a>
                            <div id="detalles-de-orden">
                                
                            </div>
                            
                            </div>

                            </div>
                        
                        `,
                    }).then((res)=>{
                        if(res.isConfirmed){
                           
                        }
                    })
                }else{
                    Swal.fire({
                        icon: 'error',
                        html: `${response.mensaje}`,
                        confirmButtonText: "Ver remisión",
                        
                    })
                }
                tabla.ajax.reload(null, true)
            }
        });
    }

}
