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
 