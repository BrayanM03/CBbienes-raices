function realizarAbono(orden_id, detalle_id){

    let monto_abono = $("#monto-abono").val() 
    let etiqueta_abono = $("#etiqueta-abono").val()
    let fecha_abono = $("#fecha-abono").val()
    let tipo_abono = $("#tipo-abono").val()

    if(monto_abono <= 0 || monto_abono == "" || monto_abono == null){
        Toast.fire({
            icon: 'error',
            title:  "Escribe un abono, la cantidad no debe ser negativa"
          })
    }else if(fecha_abono.length == 0 || fecha_abono == ""){
        Toast.fire({
            icon: 'error',
            title:  "Escribe una fecha"
          })
    }else{

        console.log(tipo_abono);

    $.ajax({
        type: "POST",
        url: "../servidor/abonos/realizar-abono.php",
        data: {monto_abono, etiqueta_abono, fecha_abono, orden_id, detalle_id, tipo_abono},
        dataType: "JSON",
        success: function (response) {

            console.log(response);
            if(response.estatus == true){
                Swal.fire({
                    icon: 'success',
                    html: `
                    Abono realizado<br>
                    ¿Deseas ver el ticket? 
                    `,
                    allowOutsideClick: true,
                    confirmButtonText: "Si",
                    showCancelButton: true,
                    cancelButtonText: "Mejor no"
                    
                }).then((re)=>{
                    if(re.isConfirmed){

                        //Escribir codigo redirige ticket abono
                        cargarDatosPagina()

                    }else{
                        cargarDatosPagina()
                    }
                })

            }else if(response.estatus == false){
                Swal.fire({
                    icon: 'error',
                    html: `
                    Ocurrio un error: ${response.mensaje}
                    `,
                    allowOutsideClick: true,
                    confirmButtonText: "Entendido",
                    showCancelButton: false,
                    
                })

                cargarDatosPagina()
            }
           
            
        }
    });

    }

    

}


function borrarTicketABono(abono_id){

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

                            
                        })
                    }

                    cargarDatosPagina()
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