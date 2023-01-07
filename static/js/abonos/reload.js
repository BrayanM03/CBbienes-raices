function cargarDatosPagina(){

    let id_detalle = getParameterByName('terreno_detalle_id')
    let orden_id = getParameterByName('orden_id')

    fetch('../servidor/abonos/traer-datos-abonos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({folio: orden_id, detalle_id: id_detalle})
        })
        .then(response => response.json())
        .then((data) =>{
    
            //Estableciendo datos
            $("#cliente").val(data.data.cliente_etiqueta)
            let datos_terreno = data.data.detalle_orden[0]
            $("#proyecto").val(datos_terreno.proyecto)
            $("#manzana").val(datos_terreno.manzana)
            $("#lote").val(datos_terreno.lote)
            
            $("#precio-total").val(datos_terreno.precio)
            $("#total-abonado").val(datos_terreno.pagado)
            $("#restante").val(datos_terreno.restante)
            $("#lote").val(datos_terreno.lote)
            bar.animate(datos_terreno.porcentaje_pago);
            
            if(datos_terreno.abonos == null){
                $("#abonos").val(0)
                $("#tbody-abonos").empty();
                $("#tbody-abonos").append(`
                <tr>
                <td class="text-center p-3" colspan="8">
                <img src="./img/load.gif" style="width: 130px"><br>
                Cargando...
                </td>
                </tr>
                `)
                setTimeout(()=>{
                    $("#tbody-abonos").empty();
                  
                        $("#tbody-abonos").append(`
                        <tr>
                        <td class="p2 text-center" colspan="8">No hay datos en esta tabla</td>
                       
                        </tr>
                        `)
                
                }, 2000)

                $("#mensualidad").val("0/"+datos_terreno.plazo)
                
            }else{
    
                $("#abonos").val(datos_terreno.abonos.length)
                $("#tbody-abonos").empty();
                $("#tbody-abonos").append(`
                <tr>
                <td class="text-center p-3" colspan="8">
                <img src="./img/load.gif" style="width: 130px"><br>
                Cargando...
                </td>
                </tr>
                `)
                setTimeout(()=>{
                    $("#tbody-abonos").empty();
                     flag = 0
                    datos_terreno.abonos.forEach(element => {
                        if(element.tipo == "Abono"){
                            flag += 1
                        }

                        $("#tbody-abonos").append(`
                        <tr>
                        <td>${element.id}</td>
                        <td>${element.no_abono}</td>
                        <td>${element.fecha}</td>
                        <td>${element.hora}</td>
                        <td>${element.total}</td>
                        <td>${element.etiqueta}</td>
                        <td>${element.tipo}</td>
                        <td>
                        <div class="btn btn-danger" onclick="verTicketABono( ${element.id})"><i class="fa-solid fa-file-pdf"></i></div>
                        <div class="btn btn-warning" onclick="borrarTicketABono( ${element.id})"><i class="fa-solid fa-trash"></i></div>
                        </td>
                    </tr>
                        `)
                    });

                    $("#mensualidad").val(flag+"/"+datos_terreno.plazo)
                },2000)
                
            }
            
            
    
    
    
        })
}

