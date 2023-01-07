function eliminarDetalle(detalle_id, orden_id){
    Swal.fire({
        icon: 'question',
        title: "¿Eliminar el terreno de esta venta?: " + detalle_id,
        allowOutsideClick: false,
        confirmButtonText: "Si",
        cancelButtonText: "No, mejor no",
        showCancelButton: true,
        showCloseButton: true,
        didOpen: ()=>{

        }}).then((res)=>{
            if(res.isConfirmed){

                $.ajax({
                    type: "POST",
                    url: "../servidor/historial/eliminar-detalle.php",
                    data: {"detalle_id": detalle_id},
                    dataType: "JSON",
                    success: function (response) {
                        if(response.estatus == true){

                            Swal.fire({
                                icon: 'success',
                                title: response.mensaje,
                                allowOutsideClick: false,
                                confirmButtonText: "Entendido"
                            }).then((r)=>{
                                if(r.isConfirmed){
                                    verDetalleOrden(orden_id)

                                }
                            })

                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: response.mensaje,
                                allowOutsideClick: false,
                                confirmButtonText: "Entendido"
                            }).then((r)=>{
                                if(r.isConfirmed){
                                    verDetalleOrden(orden_id)

                                }
                            })

                        }
                    }
                });

            }else{
                verDetalleOrden(orden_id)

            }
        })
}