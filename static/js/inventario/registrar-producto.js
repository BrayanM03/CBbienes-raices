function agregarProducto(){

    let codigo = document.getElementById("codigo").value
    let valid_codigo = document.getElementById("small_response").getAttribute("valid")
  
    let manzana = document.getElementById("manzana").value
    let lote = document.getElementById("lote").value
    let precio = document.getElementById("precio-total").value


     //Opcionales
     let norte = document.getElementById("norte").value
     let sur = document.getElementById("sur").value    
     let este = document.getElementById("este").value
     let oeste = document.getElementById("oeste").value


 
    if(valid_codigo == "false"){
        Toast.fire({
            icon: 'error',
            title: 'Hay un problema con el codigo'
          })
     }else if(manzana == "null"){
        Toast.fire({
            icon: 'error',
            title: 'Selecciona una manzana'
          })
     }

     else if(lote == "null"){
        Toast.fire({
            icon: 'error',
            title: 'Selecciona una lote'
          })
    }

    else if(precio == ""){
        Toast.fire({
            icon: 'error',
            title: 'Ingresa un precio'
          })
    }

    else{

     datosForm = new FormData();
     datosForm.append("codigo", codigo);
     datosForm.append("manzana", manzana); 
     datosForm.append("lote", lote); 
     datosForm.append("precio", precio);
     datosForm.append("norte", norte);
     datosForm.append("sur", sur);
     datosForm.append("este", este);
     datosForm.append("oeste", oeste);
     
  
     
     $.ajax({ 
        type: "POST",
        url: "../servidor/inventario/registrar-terreno.php",
        processData: false,
        contentType: false,
        data: datosForm,
        dataType: "JSON",
        success: function (response) {
            
            if(response.status == true){
                var icon = "success";
            }else{
                var icon = "error";
            }
                Swal.fire({
                    icon: icon,
                    html: "<b>"+ response.message + "</b>",
                    allowOutsideClick: false,
                    confirmButtonText: "Entendido",
                }).then((responses)=>{
                    if(response.status == true){

                        location.reload();
                    }
                })
        }
    });
     
     

    }
     

     

}

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


async function validarCodigo(codigo) {

    if(codigo == "" || codigo.length == 0){

        $("#codigo").css("border", "1px solid red")
        $("#small_response").css("color", "red").removeClass("d-none").attr("valid", "false").text("Agrega un codigo")

    }else if (/\s/.test(codigo)) {
        $("#codigo").css("border", "1px solid red")
        $("#small_response").css("color", "red").removeClass("d-none").attr("valid", "false").text("No puede haber espacios en el codigo")
    }else{
        let data = {"codigo": codigo};

        console.log(data);
         
        await fetch('../servidor/inventario/validar-codigo.php',{
         method: 'POST',
         body: JSON.stringify(data),
         headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           }
        })
       .then(response => response.json())
       .then(data => {
         if(data.status == true){
             $("#codigo").css("border", "1px solid green")
             $("#small_response").css("color", "green").removeClass("d-none").attr("valid", "true").text("Codigo disponible")
         }else if(data.status ==false){
             $("#codigo").css("border", "1px solid red")
             $("#small_response").css("color", "red").removeClass("d-none").attr("valid", "false").text("Codigo en uso")
         }
        
     });

    }

   

}  





  