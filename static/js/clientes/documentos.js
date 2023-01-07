
establecerPlantillaDocumentos(id_cliente)
function establecerPlantillaDocumentos(cliente_id){

    



    $("#card-docs-cliente").empty().append(`

<div class="row">
    <div class="col-12 col-md-12">
            <div class="card" style="display:flex;"> 

                <div class="row m-3">
                     <div class="col-12 col-md-4">
                        <img src="./img/ine.png" class="card-img-top" id="img-ine" alt="Imagen" style="width:73px; height: 70px;">
                    </div>
                    <div class="col-12 col-md-8">
                        <h5 class="card-title">Comprobante INE</h5>
                        <p class="card-text" id="texto-ine">Documento cargado</p>
                        
                    </div>
                    </div>
                <div class="row justify-content-center mt-3 mb-3">
                    <div class="col-12 col-md-3" id="area-ine-ver">
                    <a href="./docs/C${cliente_id}/file.pdf" class="btn btn-primary">Ver</a>

                    </div>
                    <div class="col-12 col-md-3" id="area-ine-actualizar">
                    <a class="btn btn-warning" onclick="actualizarArchivo(1)">Actualizar</a>
                    <input type="file" class="d-none" id="file-ine">
                    </div>
                    <div class="col-12 col-md-3" id="area-ine-eliminar">
                    
                    <a class="btn btn-danger" onclick="eliminarArchivo(1, ${id_cliente})">Eliminar</a>
                    </div>
                </div>
            </div>
    </div>

    <div class="col-12 col-md-12">
    <div class="card" style="display:flex;"> 

    <div class="row m-3">
         <div class="col-12 col-md-4">
            <img src="./img/domicilio.png" class="card-img-top" id="img-domicilio" alt="Imagen" style="width:73px; height: 70px;">
        </div>
        <div class="col-12 col-md-8">
            <h5 class="card-title">Comprobante domicilio</h5>
            <p class="card-text" id="texto-domicilio">Documento cargado</p>
            
        </div>
        </div>
    <div class="row justify-content-center mt-3 mb-3">
        <div class="col-12 col-md-3" id="area-domicilio-ver">
        <a href="/path/to/file.pdf" class="btn btn-primary">Ver</a>

        </div>
        <div class="col-12 col-md-3"  id="area-domicilio-actualizar">
        <a class="btn btn-warning" onclick="actualizarArchivo(2)">Actualizar</a>
        <input type="file" class="d-none" id="file-domicilio">
        </div>
        <div class="col-12 col-md-3" id="area-domicilio-eliminar">
        
        <a class="btn btn-danger" onclick="eliminarArchivo(2, ${id_cliente})">Eliminar</a>
        </div>
    </div>
</div>
    </div>

    <div class="col-12 col-md-12">
    <div class="card" style="display:flex;"> 

    <div class="row m-3">
         <div class="col-12 col-md-4">
            <img src="./img/rfc.png" class="card-img-top" id="img-rfc" alt="Imagen" style="width:73px; height: 70px;">
        </div>
        <div class="col-12 col-md-8">
            <h5 class="card-title">Comprobante RFC</h5>
            <p class="card-text" id="texto-rfc">Documento cargado</p>
            
        </div>
        </div>
    <div class="row justify-content-center mt-3 mb-3">
        <div class="col-12 col-md-3" id="area-rfc-ver">
        <a href="/path/to/file.pdf" class="btn btn-primary">Ver</a>

        </div>
        <div class="col-12 col-md-3" id="area-rfc-actualizar">
        <a class="btn btn-warning" onclick="actualizarArchivo(3)">Actualizar</a>
        <input type="file" class="d-none" id="file-rfc">
        </div>
        <div class="col-12 col-md-3" id="area-rfc-eliminar">
        
        <a class="btn btn-danger" onclick="eliminarArchivo(3, ${id_cliente})">Eliminar</a>
        </div>
    </div>
</div>
    </div>
</div>


`)

establecerDocumentos(cliente_id)
}


function establecerDocumentos(cliente_id){
 
    $.ajax({
        type: "POST",
        url: "../servidor/clientes/verificar-documentos.php",
        data: {"cliente_id": cliente_id},
        dataType: "JSON",
        success: function (response) {
            
           if(response.INE == false){
                $("#img-ine").attr('src','./img/ine_false.png')
                $("#area-ine-ver").empty().append(`
                <a class="btn btn-secondary btn-disabled">Ver</a>
                `)

                $("#area-ine-actualizar").empty().append(`
                <a href="#" class="btn btn-success" onclick="cargarArchivo(1)">Cargar</a>
                <input type="file" class="d-none" id="file-ine">
                `)

                $("#area-ine-eliminar").empty().append(`
                <a class="btn btn-secondary">Eliminar</a>
                `)

                $("#texto-ine").text("El documento no ha sido cargado")
           }else{
            $("#area-ine-ver").empty().append(`
                <a href="./docs/C${cliente_id}/INE.${response.EXT_INE}" target="_blank" class="btn btn-primary">Ver</a>
                `)
           }

           if(response.RFC == false){
            $("#img-rfc").attr('src','./img/rfc_false.png')
            $("#area-rfc-ver").empty().append(`
            <a  class="btn btn-secondary btn-disabled">Ver</a>
            `)

            $("#area-rfc-actualizar").empty().append(`
            <a href="#" class="btn btn-success" onclick="cargarArchivo(3)">Cargar</a>
            <input type="file" class="d-none" id="file-rfc">
            `)

            $("#area-rfc-eliminar").empty().append(`
            <a class="btn btn-secondary">Eliminar</a>
            `)

            $("#texto-rfc").text("El documento no ha sido cargado")

           }else{
            $("#area-rfc-ver").empty().append(`
                <a href="./docs/C${cliente_id}/RFC.${response.EXT_RFC}" target="_blank" class="btn btn-primary">Ver</a>
                `)
           }
            
           if(response.DOMICILIO == false){
            $("#img-domicilio").attr('src','./img/domicilio_false.png')
            $("#area-domicilio-ver").empty().append(`
            <a class="btn btn-secondary btn-disabled">Ver</a>
            `)

            $("#area-domicilio-actualizar").empty().append(`
            <a href="#" class="btn btn-success" onclick="cargarArchivo(2)">Cargar</a>
            <input type="file" class="d-none" id="file-domicilio">
            `)

            $("#area-domicilio-eliminar").empty().append(`
            <a class="btn btn-secondary">Eliminar</a>
            `)

            $("#texto-domicilio").text("El documento no ha sido cargado")

           }else{
            $("#area-domicilio-ver").empty().append(`
                <a href="./docs/C${cliente_id}/COMPROBANTE DE DOMICILIO.${response.EXT_DOMICILIO}" target="_blank" class="btn btn-primary">Ver</a>
                `)
           }

        }
    });
}
