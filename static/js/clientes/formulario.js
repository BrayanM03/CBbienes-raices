$('#myTab a').on('click', function(e) {
    e.preventDefault()

    $(this).tab('show');
    $(this).children().css('color', 'tomato');
    $(this).parent().siblings().children().children().css('color', 'gray');
    clases = $(this).children().children().attr('class');
    clase = reemplazarCadena("fas fa", "fa", clases);

    if(clase == "fa-map-marker-alt" || clase == "fa-envelope" || clase == "fa-credit-card" || clase=="fa-money-bill-wave"){

        switch (clase){
            case "fa-map-marker-alt":
                flag3 = $("#correos-agregados").hasClass("d-none");
                flag5 = $("#cuentas-agregadas").hasClass("d-none");
                flag14= $("#categorias-agregadas").hasClass("d-none");
                
                if(flag3 == false){
                    animateCSS("#correos-agregados", "bounceOutDown").then(() => {
                        $("#correos-agregados").addClass("d-none");
                       
                        });
                        setTimeout( agregarListDir, 750);
                       
                }else if(flag5 == false){
                    animateCSS("#cuentas-agregadas", "bounceOutDown").then(() => {
                        $("#cuentas-agregadas").addClass("d-none");
                       
                        });
                        setTimeout( agregarListDir, 750);
                }else if(flag14 == false){
                    animateCSS("#categorias-agregadas", "bounceOutDown").then(() => {
                        $("#categorias-agregadas").addClass("d-none");
                       
                        });
                        setTimeout( agregarListDir, 750);
                }else{
                    agregarListDir();
                }

                
            break;

            case "fa-envelope":
                flag2 = $("#direcciones-agregadas").hasClass("d-none");
                flag6 = $("#cuentas-agregadas").hasClass("d-none");
                flag13= $("#categorias-agregadas").hasClass("d-none");
     
                if(flag2 == false){
                    animateCSS("#direcciones-agregadas", "bounceOutDown").then(() => {
                        $("#direcciones-agregadas").addClass("d-none");
                         
                        });

                        setTimeout(agrearListEmail, 680);
                    }else if(flag6 == false){
                    animateCSS("#cuentas-agregadas", "bounceOutDown").then(() => {
                        $("#cuentas-agregadas").addClass("d-none");
                       
                        });
                        setTimeout( agrearListEmail, 750);
                }else if(flag13 == false){
                    animateCSS("#categorias-agregadas", "bounceOutDown").then(() => {
                        $("#categorias-agregadas").addClass("d-none");
                       
                        });
                        setTimeout( agrearListEmail, 750);
                }else{
                        agrearListEmail();
                    }

                
            break;

            case "fa-credit-card":
                flag7 = $("#direcciones-agregadas").hasClass("d-none");
                flag8 = $("#correos-agregados").hasClass("d-none");
                flag12= $("#categorias-agregadas").hasClass("d-none");

                if(flag7 == false){
                    animateCSS("#direcciones-agregadas", "bounceOutDown").then(() => {
                        $("#direcciones-agregadas").addClass("d-none");
                         
                        });

                        setTimeout(agregarCuenta, 680);
                    }else if(flag8 == false){
                    animateCSS("#correos-agregados", "bounceOutDown").then(() => {
                        $("#correos-agregados").addClass("d-none");
                       
                        });
                        setTimeout( agregarCuenta, 750);
                }else if(flag12 == false){
                    animateCSS("#categorias-agregadas", "bounceOutDown").then(() => {
                        $("#categorias-agregadas").addClass("d-none");
                       
                        });
                        setTimeout( agregarCuenta, 750);
                }else{
                    agregarCuenta();
                    }

              
            break;   
            
            case 'fa-money-bill-wave':
                flag7 = $("#direcciones-agregadas").hasClass("d-none");
                flag8 = $("#correos-agregados").hasClass("d-none");
                flag11= $("#cuentas-agregadas").hasClass("d-none");

                if(flag7 == false){
                    animateCSS("#direcciones-agregadas", "bounceOutDown").then(() => {
                        $("#direcciones-agregadas").addClass("d-none");
                         
                        });

                        setTimeout(agregarCategoria, 680);
                    }else if(flag8 == false){
                    animateCSS("#correos-agregados", "bounceOutDown").then(() => {
                        $("#correos-agregados").addClass("d-none");
                       
                        });
                        setTimeout( agregarCategoria, 750);
                }else if(flag11 == false){
                    animateCSS("#cuentas-agregadas", "bounceOutDown").then(() => {
                        $("#cuentas-agregadas").addClass("d-none");
                       
                        });
                        setTimeout( agregarCategoria, 750);
                }else{
                    agregarCategoria();
                    }
            break;
            
        }

    }else{
        flag2 = $("#direcciones-agregadas").hasClass("d-none");
        //alert("Esta no es la pestaña direcciones " + flag2);
        if(flag2 == false){
            animateCSS("#direcciones-agregadas", "bounceOutUp").then(() => {
                $("#direcciones-agregadas").addClass("d-none");
                });
            }
            
        
            flag3 = $("#correos-agregados").hasClass("d-none");
        //alert("Esta no es la pestaña direcciones " + flag2);
        if(flag3 == false){
            animateCSS("#correos-agregados", "bounceOutUp").then(() => {
                $("#correos-agregados").addClass("d-none");
                });
        }

        flag4 = $("#cuentas-agregadas").hasClass("d-none");
        //alert("Esta no es la pestaña direcciones " + flag2);
        if(flag4 == false){
            animateCSS("#cuentas-agregadas", "bounceOutUp").then(() => {
                $("#cuentas-agregadas").addClass("d-none");
                });
        }

        flag15 = $("#categorias-agregadas").hasClass("d-none");
        //alert("Esta no es la pestaña direcciones " + flag2);
        if(flag15 == false){
            animateCSS("#categorias-agregadas", "bounceOutUp").then(() => {
                $("#categorias-agregadas").addClass("d-none");
                });
        }


       
    }


    
    animateCSS("." + clase, 'swing');

});


function agrearListEmail(){
    flag = $("#correos-agregados").hasClass("d-none");
                        if(flag){
                           $("#correos-agregados").removeClass("d-none");
                        animateCSS("#correos-agregados", "bounceInDown")                                }
                 }

function agregarListDir(){
    flag = $("#direcciones-agregadas").hasClass("d-none");
                if(flag){
                    $("#direcciones-agregadas").removeClass("d-none");
                    animateCSS("#direcciones-agregadas", "bounceInDown")
                }
                
} 

function agregarCuenta(){
    flag = $("#cuentas-agregadas").hasClass("d-none");
                if(flag){
                    $("#cuentas-agregadas").removeClass("d-none");
                    animateCSS("#cuentas-agregadas", "bounceInDown")
                }
                
} 

function agregarCategoria(){
    flag = $("#categorias-agregadas").hasClass("d-none");
                if(flag){
                    $("#categorias-agregadas").removeClass("d-none");
                    animateCSS("#categorias-agregadas", "bounceInDown")
                }
                
}  


function reemplazarCadena(cadenaVieja, cadenaNueva, cadenaCompleta) {
    // Reemplaza cadenaVieja por cadenaNueva en cadenaCompleta

    for (var i = 0; i < cadenaCompleta.length; i++) {
        if (cadenaCompleta.substring(i, i + cadenaVieja.length) == cadenaVieja) {
            cadenaCompleta = cadenaCompleta.substring(0, i) + cadenaNueva + cadenaCompleta.substring(i + cadenaVieja.length, cadenaCompleta.length);
        }
    }
    return cadenaCompleta;
}


const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = document.querySelector(element);

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, {
            once: true
        });
    });

$('#tipo-cliente').click(function() {

    if ($(this).is(':checked')) {
        $("#empresa-label").removeClass("label-empresa");
        $("#persona-label").addClass("label-persona");
        tipo_cliente = "persona";
        $("#bnt-reg-cliente").attr("tipo_cliente", tipo_cliente);


    } else {

        $("#persona-label").removeClass("label-persona");
        $("#empresa-label").addClass("label-empresa");
        tipo_cliente = "empresa";
        $("#bnt-reg-cliente").attr("tipo_cliente", tipo_cliente);
    }
});



//Función para validar un RFC
// Devuelve el RFC sin espacios ni guiones si es correcto
// Devuelve false si es inválido
// (debe estar en mayúsculas, guiones y espacios intermedios opcionales)
function rfcValido(rfc, aceptarGenerico = true) {
const re       = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
var   validado = rfc.match(re);

if (!validado)  //Coincide con el formato general del regex?
return false;

//Separar el dígito verificador del resto del RFC
const digitoVerificador = validado.pop(),
  rfcSinDigito      = validado.slice(1).join(''),
  len               = rfcSinDigito.length,

//Obtener el digito esperado
  diccionario       = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
  indice            = len + 1;
var   suma,
  digitoEsperado;

if (len == 12) suma = 0
else suma = 481; //Ajuste para persona moral

for(var i=0; i<len; i++)
suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
digitoEsperado = 11 - suma % 11;
if (digitoEsperado == 11) digitoEsperado = 0;
else if (digitoEsperado == 10) digitoEsperado = "A";

//El dígito verificador coincide con el esperado?
// o es un RFC Genérico (ventas a público general)?
if ((digitoVerificador != digitoEsperado)
&& (!aceptarGenerico || rfcSinDigito + digitoVerificador != "XAXX010101000"))
return false;
else if (!aceptarGenerico && rfcSinDigito + digitoVerificador == "XEXX010101000")
return false;
return rfcSinDigito + digitoVerificador;
}


//Handler para el evento cuando cambia el input
// -Lleva la RFC a mayúsculas para validarlo
// -Elimina los espacios que pueda tener antes o después
function validarInput(input) {
var rfc         = input.value.trim().toUpperCase(),
resultado   = document.getElementById("resultado"),
valido;
if(rfc==""){
    hasclass = resultado.classList.contains('nel');
if(hasclass ==true){
  resultado.classList.remove('nel')
  resultado.innerHTML='';
}else{
resultado.classList.remove('ok')
resultado.innerHTML='';
}
}else{

var rfcCorrecto = rfcValido(rfc);   // ⬅️ Acá se comprueba

if (rfcCorrecto) {
valido = "válido";
hasclass = resultado.classList.contains('nel');
if(hasclass ==true){
  resultado.classList.remove('nel')
} 
resultado.classList.add("ok");

} else {
valido = "no válido"
hasclass = resultado.classList.contains('ok');
if(hasclass ==true){
  resultado.classList.remove('ok')
} 
resultado.classList.add("nel");
}

resultado.innerText = /* "RFC: " + rfc 
              + "\nResultado: " + rfcCorrecto */
               "RFC " + valido;
}
}

function rfcGenerico(){
    let rfc = document.getElementById("rfc");
    $("#resultado").addClass("ok")
    rfc.value = "XAXX010101000"
    resultado.innerText = "RFC valido"
}