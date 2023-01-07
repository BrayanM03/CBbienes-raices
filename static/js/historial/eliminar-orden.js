function eliminarOrden(orden_id){

    Swal.fire({
        html: `
        ¿Deseas eliminar este orden de compra venta?<br> Se ajustaran las cantidades
        `,
        allowOutsideClick: true,
        confirmButtonText: "Si",
        showCancelButton: true,
        cancelButtonText: "Mejor no"
        
    }).then((res)=>{
        if(res.isConfirmed){
            $.ajax({
                type: "POST",
                url: "../servidor/historial/eliminar-orden.php",
                data: {orden_id},
                dataType: "JSON",
                success: function (response) {
                    if(response.estatus == true){
                        Swal.fire({
                            icon: 'success',
                            html: `
                            ${response.mensaje}<br>
                            `,
                            allowOutsideClick: true,
                            confirmButtonText: "Entendido",
                            showCancelButton: false,
                            
                        }).then((r)=>{
                            if(r.isConfirmed){
                                tabla.ajax.reload(false)

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
                                tabla.ajax.reload(false)


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