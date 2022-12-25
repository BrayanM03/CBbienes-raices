function realizarRemision(){

    let cliente = $("#nombre_cliente").attr("id_cliente")
    let fecha = $("#fecha").val()
    let sucursal  = $("#sucursal").val()
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
    }else if(sucursal  == null || sucursal == ""){
        Toast.fire({
            icon: 'error',
            title: "Selecciona una sucursal"
          })
    }else{


        $.ajax({
            type: "POST",
            url: "../servidor/inventario/procesar-remision-salida.php",
            data: {
                cliente, fecha, sucursal, comentario
            },
            dataType: "JSON",
            success: function (response) {
                if(response.estatus == true){
                    Swal.fire({
                        icon: 'success',
                        html: `Remisión generada con exito`,
                        confirmButtonText: "Ver remisión",
                        
                    }).then((res)=>{
                        if(res.isConfirmed){
                            verRemision(response.id_remision)
                            
                        }
                    })
                }
                tabla.ajax.reload(null, true)
            }
        });
    }

}
