function eliminarCliente(id){

    Swal.fire({
        icon: "question",
        html: `<h3><b>¿Esta seguro de eliminar este cliente?</b><h3></br>
               <p style="font-size:13px;">La información relacionada con este cliente se borrara tambien.<p>        
        `,
        confirmButtonText: "Si, borrar",
        showCancelButton: true,
        cancelButtonText: "Cancelar"
    }).then(function(response){
        if(response.isConfirmed){
            $.ajax({
                type: "POST",
                url: "../servidor/clientes/eliminar-cliente.php",
                data: {"id_cliente": id},
                dataType: "JSON",
                success: function (resp) {
                    if(resp ==1){
                        Swal.fire({
                            icon: "success",
                            html: `<h3><b>Cliente eliminado con exito</b><h3></br>        
                            `,
                            confirmButtonText: "Aceptar"
                        })

                        tabla.ajax.reload( null, false);
                    }
                }
        
            });
        }
    })

    

}