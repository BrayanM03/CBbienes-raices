function eliminarAbono(abono_id, orden_id){

    Swal.fire({
        html: `
        ¿Deseas eliminar este abono?<br> Se ajustaran las cantidades
        `,
        allowOutsideClick: true,
        confirmButtonText: "Si",
        showCancelButton: true,
        cancelButtonText: "Mejor no"
        
    }).then((res)=>{
        if(res.isConfirmed){
            $.ajax({
                type: "POST",
                url: "../servidor/abonos/eliminar-abono.php",
                data: {abono_id},
                dataType: "JSON",
                success: function (response) {
                    if(response.estatus == true){
                        Swal.fire({
                            icon: 'success',
                            html: `
                            Abono eliminado<br>
                            `,
                            allowOutsideClick: true,
                            confirmButtonText: "Entendido",
                            showCancelButton: false,
                            
                        }).then((r)=>{
                            if(r.isConfirmed){
                                verDetalleOrden(orden_id)

                            }
                        })
        
                    }else{
                        Swal.fire({
                            icon: 'error',
                            html: `
                            Ocurrio un error: ${response.mensaje}
                            `,
                            allowOutsideClick: true,
                            showCancelButton: false,
                            confirmButtonText: "Entendido",

                            
                        }).then((r)=>{
                            if(r.isConfirmed){
                                verDetalleOrden(orden_id)

                            }
                        })
                    }

                    
                }
            });
        }
    })

    

}



const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })