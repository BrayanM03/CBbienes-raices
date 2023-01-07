function actualizarCliente(id){

    
    //Datos cliente
    let  id_cliente = id;
    let  razon_social = $("#razon-social").val();
    let  rfc = $("#rfc").val();
    let  rfc_invalido = $("#resultado").hasClass("nel");
    let  telefono = $("#telefono").val();
    let  contacto = $("#contacto").val(); 
    let  tipo_cliente = $("#bnt-reg-cliente").attr("tipo_cliente");

    let estado_civil = $("#estado-civil").val();
    let fecha_nacimiento = $("#fecha-nac").val();
    let lugar_nacimiento = $("#lugar-nac").val();
    let ocupacion = $("#ocupacion").val();

    const file_ine = document.getElementById('file-ine').files[0];
    const file_domicilio = document.getElementById('file-domicilio').files[0];
    const file_rfc = document.getElementById('file-rfc').files[0];

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
            let id_bd_direccion =  $(this).attr('id_db');
            let id_direccion = $(this).attr('code');
            let calle = $(this).attr('calle');
            let exterior = $(this).attr('exterior');
            let interior = $(this).attr('interior');
            let cp = $(this).attr('cp');
            let colonia = $(this).attr('colonia');
            let ciudad = $(this).attr('ciudad');
            let municipio = $(this).attr('municipio');
            let estado = $(this).attr('estado');
            let pais= $(this).attr('pais');
            
            direccion = new Object();
            direccion.id_bd = id_bd_direccion;
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
            let id_bd_cuenta = element.getAttribute('id_db');
            id_cuenta = element.getAttribute('code');
            nombre_cuenta = element.getAttribute('nombre_cuenta');
            no_cuenta = element.getAttribute('cuenta');
            banco = element.getAttribute('banco');
            rfc_banco = element.getAttribute('rfc');
          
            let cuenta = new Object();

            cuenta.id_bd = id_bd_cuenta;
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
            let id_bd_email =  element.getAttribute('id_db');
            id_email= element.getAttribute('code');
            etiqueta = element.getAttribute('etiqueta');
            email = element.getAttribute('correo');
          
            let correo = new Object();
            
            correo.id_bd = id_bd_email;
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
    

      const formData = new FormData();
      formData.append('id_cliente', id);
      formData.append('file_ine', file_ine);
      formData.append('file_domicilio', file_domicilio);
      formData.append('file_rfc', file_rfc);
      formData.append('razon_social', razon_social);
      formData.append('rfc', rfc);
      formData.append('telefono', telefono);
      formData.append('contacto', contacto);
      formData.append('estado_civil', estado_civil);
      formData.append('lugar_nacimiento', lugar_nacimiento);
      formData.append('ocupacion', ocupacion);
      formData.append('fecha_nacimiento', fecha_nacimiento);
      formData.append('tipo_cliente', tipo_cliente);
      formData.append('direcciones', JSON.stringify(direcciones));
      formData.append('cuentas', JSON.stringify(cuentas));
      formData.append('correos', JSON.stringify(correos));
   
     console.log(formData);
      $.ajax({ 
          type: "POST",
          url: "../servidor/clientes/actualizar-cliente.php",
          data: formData,
          processData: false,
          contentType: false,   
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
                                        <p>¡Cliente actualizado con exito!</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-md-12 text-center">
                                        <a href="editar-cliente.php?id_customer=${id_cliente}"><div class="btn btn-success">Entendido</div></a>
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