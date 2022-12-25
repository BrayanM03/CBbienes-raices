function verDetalleOrden(id){

    Swal.fire({
        icon: 'info',
        title: "Orden folio: " + id,
        allowOutsideClick: false,
        customClass: 'swal-wide',
        confirmButtonText: "Aceptar",
        showCloseButton: true,
        didOpen: ()=>{

            fetch('../servidor/historial/traer-datos-compra-venta.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({folio: id})
            })
            .then(response => response.json())
            .then((data) =>{
           

             //Invocando graficos
             
                // Pie chart
                var triggerEl = document.querySelector('#list-tab a[href="#list-messages"]')
                //var tabElms = document.querySelectorAll('a[data-bs-toggle="list"]')

                var tabElms = document.querySelectorAll('a[data-bs-toggle="list"]')
        tabElms.forEach(function(tabElm) {
        tabElm.addEventListener('shown.bs.tab', function (event) {
            event.target // newly activated tab
            event.relatedTarget // previous active tab
          /*   console.log( event.target);
            console.log(triggerEl); */
            if(event.target === triggerEl){
                
                    $("#area-grafico").append(`
                    <div class="align-self-center w-100 p-2">
										<div class="py-3">
											<div class="chart chart-xs">
												<canvas id="chartjs-dashboard-pie"></canvas>
											</div>
										</div>

										<table class="table w-70 mb-2" id="tabla-datos-abonos">
											<tbody>
												<tr>
													<td><b>Precio total:<b></td>
													<td class="text-end" id="precio-total">4306</td>
												</tr>
												<tr>
													<td>Total abonado</td>
													<td class="text-end" id="total-abonado">3801</td>
												</tr>
												<tr>
													<td>Restante</td>
													<td class="text-end" id="restante">1689</td>
												</tr>
											</tbody>
										</table>
									</div>
                    
                    `)

                    let total =    parseFloat(data.data.detalle_orden[0].precio)
                    let restante =    parseFloat(data.data.detalle_orden[0].restante)
                    let pagado =    parseFloat(data.data.detalle_orden[0].pagado)

                    $("#precio-total").text(total)
                    $("#total-abonado").text(pagado)
                    $("#restante").text(restante)
                    setGraph(pagado, restante)


            }else{
                $("#area-grafico").empty()
                console.log("no son los mismo");
            }
        })
        })
                
               
            

             //Datos del cliente
             $("#cliente").val(data.data.cliente_etiqueta);
             $("#telefono").val(data.data.telefono);
             $("#correo").val(data.data.correo);
             $("#direccion").val(data.data.direccion);

             //Detalle de orden
             $("#body-estatus").empty();
             $("#body-contratos").empty();
             $("#select-abonos").empty();

             data.data.detalle_orden.forEach(element => {
                $("#body-estatus").append(`
                <a class="list-group-item list-group-item-action" id="list-profile-list">
                <div class="row">
                        <div class="col-3">
                           ${element.codigo}
                        </div>
                        <div class="col-3">
                           ${element.proyecto}
                        </div>
                        <div class="col-2">
                          ${element.manzana}
                        </div>
                        <div class="col-2">
                          ${element.lote}
                        </div>
                        <div class="col-2">
                          ${element.precio}
   
                        </div>
                </div>
   
                </a>
                `);
             });

             //Contratos
             data.data.detalle_orden.forEach(element => {
                $("#body-contratos").append(`
                <a class="list-group-item list-group-item-action" id="list-profile-list">
                <div class="row">
                        <div class="col-3">
                           ${element.codigo}
                        </div>
                        <div class="col-3">
                           ${element.proyecto}
                        </div>
                        <div class="col-2">
                          ${element.manzana}
                        </div>
                        <div class="col-2">
                          ${element.lote}
                        </div>
                        <div class="col-2">
                          <div class="btn btn-danger" onclick="verDetalleOrden( ${element.codigo})"><i class="fa-solid fa-file-pdf"></i></div>
                        </div>
                </div>
   
                </a>
                `);
             });

             //Abonos
             data.data.detalle_orden.forEach(element => {
                $("#select-abonos").append(`
                <option value="${element.id}">
                    ${element.codigo} ${element.proyecto} Manzana ${element.manzana} Lote ${element.lote}
                </option>
                `);


             })

             let primer_terreno = data.data.detalle_orden[0]
             const abonos_primer_terreno = primer_terreno.abonos
             let ide_detalle = primer_terreno.id
             $("#btn-add-abono").attr("href", "agregar-abono.php?orden_id=" + ide_detalle)
             $("#btn-add-abono").attr("target", "_blank" )
             
             $("#body-abonos").empty()
             if(abonos_primer_terreno !== undefined){
                abonos_primer_terreno.forEach(el => {
                    $("#body-abonos").append(`
                    <a class="list-group-item list-group-item-action">
                            <div class="row">
    
                                <div class="col-1">
                                    ${el.no_abono}
                                </div>
                                <div class="col-2">
                                    ${el.fecha}
                                </div>
                                <div class="col-1">
                                    ${el.total}
                                </div>
                                <div class="col-2">
                                    ${el.restante}
                                </div>
                                <div class="col-2">
                                    ${el.total_abonado}
    
                                </div>
                                <div class="col-2">
                                 ${el.etiqueta}
                                </div>
                                <div class="col-2">
                                <div class="btn btn-danger" onclick="verTicketABono( ${el.id})"><i class="fa-solid fa-file-pdf"></i></div>
                                </div>
                            </div>
    
                        </a>
                        `);
                 })
             }else{
                $("#body-abonos").append(`
                    <a class="list-group-item list-group-item-action">
                            <div class="row">
    
                                <div class="col-12 text-center">
                                   Ningun abono realizado
                                </div>
                               
                            </div>
    
                        </a>
                        `);
             }
             

             $("#select-abonos").change(()=>{
                let id_detalle = $("#select-abonos").val();

                $("#btn-add-abono").attr("href", "agregar-abono.php?orden_id=" + id_detalle)
                $("#btn-add-abono").attr("target", "_blank" )
           
                $("#body-abonos").empty()
                data.data.detalle_orden.forEach(elemento => {

                    const arr_element = elemento.abonos.filter(el => el.detalle_id == id_detalle);

                    if(arr_element.length > 0) {
                        arr_element.forEach(el => {
                            $("#body-abonos").append(`
                            <a class="list-group-item list-group-item-action">
                                    <div class="row">
    
                                        <div class="col-1">
                                            ${el.no_abono}
                                        </div>
                                        <div class="col-2">
                                            ${el.fecha}
                                        </div>
                                        <div class="col-1">
                                            ${el.total}
                                        </div>
                                        <div class="col-2">
                                            ${el.restante}
                                        </div>
                                        <div class="col-2">
                                            ${el.total_abonado}
    
                                        </div>
                                        <div class="col-2">
                                         ${el.etiqueta}
                                        </div>
                                        <div class="col-2">
                                        <div class="btn btn-danger" onclick="verTicketABono( ${el.id})"><i class="fa-solid fa-file-pdf"></i></div>
                                        </div>
                                    </div>
    
                                </a>
                                `);
                        })

                        let total =    parseFloat(elemento.precio)
                        let restante =    parseFloat(elemento.restante)
                        let pagado =    parseFloat(elemento.pagado)
    
                        $("#precio-total").text(total)
                        $("#total-abonado").text(pagado)
                        $("#restante").text(restante)
                        setGraph(pagado, restante)
                    }
                    
                    console.log(arr_element);
                    
                 })
                

                

             })




            })
            .catch(error => console.error(error))


        },
        html: `
            <div class="container">

            <div class="row">
              <div class="col-6 tarjeta-cliente">
                    <div class="row">
                        <div class="col-md-6">
                        <label><b>Cliente:</b></label><br/>
                        <span id="cliente">Brayan Maldonado Morgado</span>
                        </div>
        
                        <div class="col-md-6">
                        <label><b>Telefono:</b></label><br/>
                        <span id="telefono">8683471939</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mt-2">
                        <label><b>Dirección:</b></label><br/>
                        <span id="direccion">ATAPCO MOVIMIENTO 18 DE OCTUBRE null 87350 HEROICA MATAMOROS TAM MEX</span>
                        </div>
        
                        <div class="col-md-4 mt-2">
                        <label><b>Correo:</b></label><br/>
                        <span id="correo">natsu5679@gmail.com</span>
                        </div>
                    </div>
              </div>
               
              <div class="col-6" id="area-grafico">

                           

              </div>
                
            </div>


            <div class="row mt-3">
            <div class="row">
                <div class="col-2">
                <div class="list-group" id="list-tab" role="tablist">
                    <a class="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">Estatus</a>
                    <a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">Contratos</a>
                    <a class="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages">Abonos</a>
                    <a class="list-group-item list-group-item-action" id="list-settings-list" data-bs-toggle="list" href="#list-settings" role="tab" aria-controls="list-settings">Documentos</a>
                </div>
                </div>
                <div class="col-10">
                <div class="tab-content" id="nav-tabContent">

                    <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                        <div class="container">
                            <div class="row">
                                <div class="col-12 col-md-12">
                                <div class="list-group" id="list-terrenos" role="tablist">
                                    <a class="list-group-item list-group-item-action active" id="list-home-list">Terrenos vendidos</a>
                                    <a class="list-group-item list-group-item-action" id="list-header-t">
                                        <div class="row">

                                            <div class="col-3">
                                                <b>Codigo: </b>
                                            </div>
                                            <div class="col-3">
                                                <b>Proyecto: </b>
                                            </div>
                                            <div class="col-2">
                                                <b>Manzana: </b>
                                            </div>
                                            <div class="col-2">
                                                <b>Lote: </b>
                                            </div>
                                            <div class="col-2">
                                                <b>Precio </b>
                                            </div>
                                        </div>

                                    </a>
                                    <div id="body-estatus">
                                    
                                    </div>

                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                        Contratos
                        <div class="container">

                        <div class="row">
                                <div class="col-12 col-md-12">
                                <div class="list-group" id="list-terrenos" role="tablist">
                                    <a class="list-group-item list-group-item-action active" id="list-home-list">Terrenos vendidos</a>
                                    <a class="list-group-item list-group-item-action" id="list-header-t">
                                        <div class="row">

                                            <div class="col-3">
                                                <b>Codigo: </b>
                                            </div>
                                            <div class="col-3">
                                                <b>Proyecto: </b>
                                            </div>
                                            <div class="col-2">
                                                <b>Manzana: </b>
                                            </div>
                                            <div class="col-2">
                                                <b>Lote: </b>
                                            </div>
                                            <div class="col-2">
                                                <b>Descargar </b>
                                            </div>
                                        </div>

                                    </a>
                                    <div id="body-contratos">
                                    
                                    </div>

                                </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                            <div class="container">
                                <div class="row">
                                    <div class="col-10">
                                        <span>Selecciona un terreno</span>
                                        <select class="form-control" id="select-abonos">
                                            <option value="1">Monte Alto Manzana 1 Lote 2</option>
                                            <option value="2">Monte Alto Manzana 2 Lote 3</option>
                                        </select>
                                    </div>
                                    <div class="mr-2 col-2">
                                        <a href="" id="btn-add-abono" target="_blank"><div class="btn btn-primary" style="margin-top:20px">Agregar abono </div></a>
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-12 col-md-12">
                                    <div class="list-group" id="list-terrenos" role="tablist">
                                        <a class="list-group-item list-group-item-action active" id="list-home-list">Abonos realizados</a>
                                        <a class="list-group-item list-group-item-action" id="list-header-t">
                                            <div class="row">

                                                <div class="col-1">
                                                    <b>No. Abono: </b>
                                                </div>
                                                <div class="col-2">
                                                    <b>Fecha: </b>
                                                </div>
                                                <div class="col-1">
                                                    <b>Monto: </b>
                                                </div>
                                                <div class="col-2">
                                                    <b>Restante: </b>
                                                </div>
                                                <div class="col-2">
                                                    <b>Total abonado: </b>
                                                </div>
                                                <div class="col-2">
                                                    <b>Etiqueta: </b>
                                                </div>
                                                <div class="col-2">
                                                    <b>Ticket: </b>
                                                </div>
                                            </div>

                                        </a>
                                        <div id="body-abonos">
                                        
                                        </div>

                                    </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">Documentos</div>
                </div>
                </div>
            </div>
            </div>
            </div>
        
        `,
    }).then((res)=>{
        if(res.isConfirmed){
           
        }
    })

}


function setGraph(total_abonado, restante){
    new Chart(document.getElementById("chartjs-dashboard-pie"), {
        type: "pie",
        data: {
            labels: ["Total abonado", "Restante"],
            datasets: [{
                data: [total_abonado, restante],
                backgroundColor: [
                    window.theme.success,
                    window.theme.warning,
                ],
                borderWidth: 5
            }]
        },
        options: {
            responsive: !window.MSInputMethodContext,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            cutoutPercentage: 75
        }
    });
}