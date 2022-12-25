toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut" 
  }



function registrarClienteNuevo(){

    //Datos cliente
    razon_social = $("#razon-social").val();
    rfc = $("#rfc").val();
    rfc_invalido = $("#resultado").hasClass("nel");
    telefono = $("#telefono").val();
    contacto = $("#contacto").val();
    tipo_cliente = $("#bnt-reg-cliente").attr("tipo_cliente");

    estado_civil = $("#estado-civil").val();
    fecha_nacimiento = $("#fecha-nac").val();
    lugar_nacimiento = $("#lugar-nac").val();
    ocupacion = $("#ocupacion").val();

    contacto == "" || contacto == " " ? contacto = "Sin definir": contacto =contacto;
    telefono == "" || telefono == " " ? telefono = "Sin definir": telefono =telefono;

    estado_civil == "" || estado_civil == " " ? estado_civil = "Sin definir": estado_civil =estado_civil;
    ocupacion == "" || ocupacion == " " ? ocupacion = "Sin definir": ocupacion =ocupacion;

    fecha_nacimiento == "" || fecha_nacimiento == " " ? fecha_nacimiento = "Sin definir": fecha_nacimiento =fecha_nacimiento;
    lugar_nacimiento == "" || lugar_nacimiento == " " ? lugar_nacimiento = "Sin definir": lugar_nacimiento =lugar_nacimiento;
   

    //Validamos los campos
    if(razon_social =="" || razon_social == " "){

        animateCSS('#razon-social', 'headShake');
        toastr.error('Debes incluir una razón social', 'Razón social' );

    }else if(rfc == "" || rfc == " "){
        animateCSS('#rfc', 'headShake');
        toastr.error('Debes incluir el RFC', 'RFC' );
    }else if(rfc_invalido){
        animateCSS('#rfc', 'headShake');
        toastr.error('El RFC no es valido', 'RFC' );
    }else{
        let direcciones = [];
    $("#direcciones-list").children().each(function(index, element){
        if($(this).val()==0){
            console.log($(this).text());
        }else{
            id_direccion = $(this).attr('code');
            calle = $(this).attr('calle');
            exterior = $(this).attr('exterior');
            interior = $(this).attr('interior');
            cp = $(this).attr('cp');
            colonia = $(this).attr('colonia');
            ciudad = $(this).attr('ciudad');
            municipio = $(this).attr('municipio');
            estado = $(this).attr('estado');
            pais= $(this).attr('pais');
            
            direccion = new Object();
            direccion.calle = calle;
            direccion.exterior = exterior;
            direccion.interior = interior;
            direccion.cp = cp;
            direccion.colonia = colonia;
            direccion.ciudad = ciudad;
            direccion.municipio = municipio;
            direccion.estado = estado;
            direccion.pais = pais;
    
            direcciones.push(direccion);
        }
        
    });


    //cuentas
    let cuentas = [];
    let lis2 = document.getElementById('count-list').getElementsByTagName('li');
    [].forEach.call(lis2, element => {
        if(element.value == 0){
            console.log(element.textContent);
        }else{
            id_cuenta = element.getAttribute('code');
            nombre_cuenta = element.getAttribute('nombre_cuenta');
            no_cuenta = element.getAttribute('cuenta');
            banco = element.getAttribute('banco');
            rfc_banco = element.getAttribute('rfc');
          
            let cuenta = new Object();

            cuenta.nombre_cuenta = nombre_cuenta;
            cuenta.no_cuenta = no_cuenta;
            cuenta.banco = banco;
            cuenta.rfc_banco = rfc_banco;

            cuentas.push(cuenta);
   
        }    
      }); 

        //cuentas
    let correos = [];
    let lis3 = document.getElementById('correos-list').getElementsByTagName('li');
    [].forEach.call(lis3, element => {
        if(element.value == 0){
            console.log(element.textContent);
        }else{
            id_email= element.getAttribute('code');
            etiqueta = element.getAttribute('etiqueta');
            email = element.getAttribute('correo');
          
            let correo = new Object();

            correo.etiqueta = etiqueta;
            correo.correo = email;

            correos.push(correo);
   
        }    
      }); 


      let categorias_lis = [];
    let lis4 = document.getElementById('categoria-lista').getElementsByTagName('li');
    [].forEach.call(lis4, element => {
        if(element.value == 0){
            console.log(element.textContent);
        }else{
            id_cat= element.getAttribute('code');
            categoria = element.getAttribute('categoria');
            porcentaje = element.getAttribute('porcentaje');
          
            let categoria_obj = new Object();

            categoria_obj.categoria = categoria;
            categoria_obj.porcentaje = porcentaje;

            categorias_lis.push(categoria_obj);
   
        }    
      }); 
    

   
     
      $.ajax({
          type: "POST",
          url: "../servidor/clientes/agregar-nuevo-cliente.php",
          data: {"razon_social": razon_social,
                 "rfc": rfc,
                 "telefono": telefono,
                 "contacto": contacto,
                 "estado_civil": estado_civil,
                 "lugar_nacimiento": lugar_nacimiento,
                 "ocupacion": ocupacion,
                 "fecha_nacimiento": fecha_nacimiento,
                 "tipo_cliente": tipo_cliente,
                 "direcciones": JSON.stringify(direcciones),
                 "cuentas": JSON.stringify(cuentas),
                 "correos": JSON.stringify(correos),
                 "categorias": JSON.stringify(categorias_lis)},
          dataType: "JSON",
          success: function (response) {
              
              if(response ==1){

                $("#main-content").empty();
                $("#main-content").append(`
                    <div class="row justify-content-center mt-3">
                        <div class="col-12 col-md-5">
                            <div class="card p-5 animate__animated animate__bounceIn">
                                <div class="row justify-content-center">
                                    <div class="col-12 col-md-12 mb-3 text-center">
                                        <img src="./img/check-correct.gif" style="width:100px;">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-md-12 text-center" style="font-family:'Bahnschrift Extrabold'; font-size:19px;">
                                        <p>¡Cliente agregado con exito!</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-md-12 text-center">
                                        <a href="agregar-cliente.php"><div class="btn btn-success">Entendido</div></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `)

              }
          }
      });
    }

    
    
    


}