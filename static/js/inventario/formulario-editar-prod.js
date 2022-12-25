function activarNavTab(){
    $('#myTab a').on('click', function(e) {
        e.preventDefault()
        $(this).tab('show');
        $(this).children().css('color', 'tomato');
        $(this).parent().siblings().children().children().css('color', 'gray');
        clases = $(this).children().children().attr('class');
        clase = reemplazarCadena("fas fa", "fa", clases);
        
        
        animateCSS("." +  clase.split(' ')[1], 'swing');

        $("#precio-base-agregar").keyup(function(){
              
            let precio = precioTotalAgregar("base")
            
            $("#precio-total-agregar").val(precio)
        })

        $("#impuesto-agregar").change(()=>{

          let precio = precioTotalAgregar("impuesto")
          $("#precio-total-agregar").val(precio)
        })

        $("#precio-total-agregar").keyup(()=>{

          let base = precioTotalAgregar("total")
          $("#precio-base-agregar").val(base)
          
        })


        setPriceDatatable()
    
    });
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

    function reemplazarCadena(cadenaVieja, cadenaNueva, cadenaCompleta) {
        // Reemplaza cadenaVieja por cadenaNueva en cadenaCompleta
    
        for (var i = 0; i < cadenaCompleta.length; i++) {
            if (cadenaCompleta.substring(i, i + cadenaVieja.length) == cadenaVieja) {
                cadenaCompleta = cadenaCompleta.substring(0, i) + cadenaNueva + cadenaCompleta.substring(i + cadenaVieja.length, cadenaCompleta.length);
            }
        }
        return cadenaCompleta;
    }

    function precioTotalAgregar(origen) {
        let precio_base = parseFloat(document.getElementById("precio-base-agregar").value)
        let tasa = parseInt(document.getElementById("impuesto-agregar").value)
        let precio_total = parseFloat(document.getElementById("precio-total-agregar").value)
      
        switch (origen) {
          case "base":
            var impuesto = ((precio_base * tasa)/100) 
            var impuesto_redondeado = Number.parseFloat(impuesto).toFixed(2); 
            $("#impuesto-agregar").attr("impuesto", impuesto_redondeado) 
            var response = precio_base + impuesto; 
           
            
            break;
      
            case "impuesto":
            var impuesto = ((precio_base * tasa)/100)
            var impuesto_redondeado = Number.parseFloat(impuesto).toFixed(2); 
            $("#impuesto-agregar").attr("impuesto", impuesto_redondeado) 
            var response = precio_base + impuesto; 
            
            break;
      
            case "total":
             if(tasa == 16){iva =1.16}else if(tasa == 8){ iva =1.08}else{ iva =0}   
            var base = (precio_total / iva)
            var impuesto = ((base * tasa)/100) 
            var impuesto_redondeado = Number.parseFloat(impuesto).toFixed(2); 
            $("#impuesto-agregar").attr("impuesto", impuesto_redondeado) 
            var response = base; 
       
            
            break;
        
          default:
            break;
      
          
        }
        var respuesta = Number.parseFloat(response).toFixed(2); 
      
        return respuesta;
      
      }    


      function setPriceDatatable(){

        if ($.fn.dataTable.isDataTable('#tabla-precios-tmp')) {
            $('#tabla-precios-tmp').DataTable().clear();
            $('#tabla-precios-tmp').DataTable().destroy();
            $('#tabla-precios-tmp').empty();
            //getData.offSet = undefined;  // necssary to set the static value to undefined so that the offset is valid during initial runs
            // re Add CSS to table
           
    
        }

        let producto_id = getParameterByName("id_product")

        tabla = $('#tabla-precios-tmp').DataTable({
            processing: true,
            serverSide: true,
            ajax:{
                url: '../servidor/inventario/server_processing_precios.php?tabla=precios&producto_id='+ producto_id,
                dataType: 'json'
            },
            searching: false,
            info:false,
            responsive: true,
            order: [0, 'desc'],
            autoWidth: true,
            columnsDefs: [
              {width: '340px', target: 2}
            ],
            columns:  [ 
                { data:0, title:'#' },
                { data:1, title:'Costo' },
                { data:2, title:'Precio base'},
                { data:3, title:'Tasa' },
                { data:4, title:'Impuesto' },
                { data:5, title:'Precio neto' },
                { data:6, title:'Etiqueta' },
                { data:null, title:'Opciones', render: function(row){
                    return `
                    <div class='row'>
                        <div class='col-12 col-md-12'>
                            <div class="btn btn-danger" onclick="eliminarPrecio(${row[0]}, 'individual')"><i class="fa-solid fa-trash"></i></div>
                        </div>
                    </div>
                    `
                }}
            ],
            
               language: language_options,
          
            
        });
      }

      function agregarPrecio(id_prod){
        let costo = document.getElementById("costo-agregar").value
        let precio_base = document.getElementById("precio-base-agregar").value
        let tasa = document.getElementById("impuesto-agregar").value
        let neto = document.getElementById("precio-total-agregar").value
        let etiqueta = document.getElementById("etiqueta-agregar").value

        if(precio_base == null || precio_base == undefined || precio_base.length == 0 || precio_base == ""){
            Toast.fire({
                icon: 'error',
                title: 'El precio base no tiene un valor'
              })

        }else if (neto == null || neto == undefined || neto.length == 0 || neto == ""){
            Toast.fire({
                icon: 'error',
                title: 'EL precio total no tiene un valor'
              })
        }else{

            $.ajax({
                type: "POST",
                url: "../servidor/inventario/agregar-precios.php",
                data: {"costo": costo, "precio_base": precio_base,
                       "tasa": tasa, "etiqueta": etiqueta, "neto": neto, "id_producto": id_prod},
                dataType: "JSON",
                success: function (response) {
                    console.log(response);
                    setPriceDatatable()
                    if(response.status == true){
                        Toast.fire({
                            icon: 'success',
                            title: response.message
                          })
                    }
                    
    
                }
            });
        }


        

      }

      function eliminarPrecio(precio_id, tipo){
       
        $.ajax({
            type: "POST",
            url: "../servidor/inventario/eliminar-precios.php",
            data: {"id_precio": precio_id, "tipo": tipo},
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                setPriceDatatable()
                if(response.status == true){
                    Toast.fire({
                        icon: 'success',
                        title: response.message
                      })
                }
                

            }
        });
      }