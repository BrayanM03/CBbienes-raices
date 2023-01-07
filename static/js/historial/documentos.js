
function establecerDocumentos(cliente_id){
 
    $.ajax({
        type: "POST",
        url: "../servidor/clientes/verificar-documentos.php",
        data: {"cliente_id": cliente_id},
        dataType: "JSON",
        success: function (response) {
            $("#list-settings").empty().append(`
            <div class="d-flex align-items-center justify-content-center" style="height: 318.28px;">
                    <img src="./img/loading.gif" style="width: 2rem;">
            </div>
            `)

            setTimeout(function () {
                $("#list-settings").empty().append(`
                <div class="row">

                       <div class="list-group" id="list-terrenos" role="tablist">
                                        <a class="list-group-item list-group-item-action active" id="list-home-list">Abonos realizados</a>
                                        <a class="list-group-item list-group-item-action" id="list-header-t">
                                            <div class="row">

                                                <div class="col-4">
                                                    <b>INE: </b>
                                                </div>
                                                <div class="col-4">
                                                    <b>DOMICILIO: </b>
                                                </div>
                                                <div class="col-4">
                                                    <b>RFC: </b>
                                                </div>
                                            </div>

                                        </a>
                                      
                                        <a class="list-group-item list-group-item-action">
                                            <div class="row">
                                                <div class="col-4" id="area-ine">
                                                    <a href="./docs/C${cliente_id}/INE.${response.EXT_INE}" target="_blank"><img src="./img/ine.png" style="width: 2rem;"></a>
                                                </div>
                                                <div class="col-4" id="area-domicilio">
                                                    <a href="./docs/C${cliente_id}/COMPROBANTE DE DOMICILIO.${response.EXT_DOMICILIO}" target="_blank"><img src="./img/domicilio.png" style="width: 2rem;"></a>
                                                </div>
                                                <div class="col-4" id="area-rfc">
                                                    <a href="./docs/C${cliente_id}/RFC.${response.EXT_RFC}" target="_blank"> <img src="./img/rfc.png" style="width: 2rem;"></a>
                                                </div>
                                            </div>
                                        </a>
                                  

                       </div>
                </div>
                `)

                if(response.INE == false){
                    $("#area-ine").empty().append(`
                    <a target="_blank"><img src="./img/ine_false.png" style="width: 2rem;"></a>
                      
                    `)
                }

                if(response.DOMICILIO == false){
                    $("#area-domicilio").empty().append(`
                    <a target="_blank"><img src="./img/domicilio_false.png" style="width: 2rem;"></a>
                      
                    `)
                }

                if(response.RFC == false){
                    $("#area-rfc").empty().append(`
                    <a target="_blank"><img src="./img/rfc_false.png" style="width: 2rem;"></a>
                      
                    `)
                }

            }, 1700)
        }
    
    })

}