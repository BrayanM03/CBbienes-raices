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
                        html: `
                            <div class="container">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Cras justo odio</li>
                                <li class="list-group-item">Dapibus ac facilisis in</li>
                                <li class="list-group-item">Morbi leo risus</li>
                                <li class="list-group-item">Porta ac consectetur ac</li>
                                <li class="list-group-item">Vestibulum at eros</li>
                            </ul>
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
