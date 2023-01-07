
function eliminarArchivo(tipo, id_cliente){
    if(tipo == 1){
        documento = "INE"
    }else if(tipo == 2){
         documento = "COMPROBANTE DE DOMICILIO"
    }else if(tipo == 3){
         documento = "RFC"
    }else{
         documento = null
    }

    Swal.fire({
     icon: 'question',
     html: `
     ¿Quieres remover este documento: ${tipo}?
     `,
     allowOutsideClick: true,
     confirmButtonText: "Si",
     cancelButtonText: "Mejor no",
     showCancelButton: true,
     
 }).then(re => {
     if(re.isConfirmed){
          $.ajax({
               type: "POST",
               url: "../servidor/clientes/eliminar-documento.php",
               data: {id_cliente, documento},
               dataType: "JSON",
               success: function (response) {
                    if(response.estatus == true){
                         Toast.fire({
                              icon: 'success',
                              title: `Documento eliminado correctamente`
                         })
                    }else{
                         Toast.fire({
                              icon: 'error',
                              title: `Documento no fue eliminado`
                         }) 
                    }

                    $("#card-docs-cliente").empty().append(`
                         <div class="d-flex align-items-center justify-content-center" style="height: 518.28px;">
                              <img src="./img/loading.gif" style="width: 2rem;">
                         </div>
                         `);

                    setTimeout(function(){
                         establecerPlantillaDocumentos(id_cliente)
                    }, 2300)     
                    
               }
              });
     }
     
 })
    
}


function cargarArchivo(tipo){
     let fileInput;
     if(tipo == 1){
       documento = "INE"
       fileInput = $("#file-ine");
       text_file = $("#texto-ine");
      
     }else if(tipo == 2){
       documento = "COMPROBANTE DE DOMICILIO"
       fileInput = $("#file-domicilio");
       text_file = $("#texto-domicilio");

     }else if(tipo == 3){
       documento = "RFC"
       fileInput = $("#file-rfc");
       text_file = $("#texto-rfc");

     }else{
       documento = null
       fileInput = null;
     }

     fileInput.click()
     if (fileInput) {
       fileInput.on("change", function() {
         // Obtener el nombre del archivo seleccionado
         const fileName = this.files[0].name;
   
         // Asignar el nombre del archivo al elemento de texto
         text_file.text(fileName);
       });
     }
   }
   
   
   
   
   


function actualizarArchivo(tipo){
     let fileInput;
     if(tipo == 1){
       documento = "INE"
       fileInput = $("#file-ine");
       text_file = $("#texto-ine");
      
     }else if(tipo == 2){
       documento = "COMPROBANTE DE DOMICILIO"
       fileInput = $("#file-domicilio");
       text_file = $("#texto-domicilio");

     }else if(tipo == 3){
       documento = "RFC"
       fileInput = $("#file-rfc");
       text_file = $("#texto-rfc");

     }else{
       documento = null
       fileInput = null;
     }

     fileInput.click()
     if (fileInput) {
       fileInput.on("change", function() {
         // Obtener el nombre del archivo seleccionado
         const fileName = this.files[0].name;
   
         // Asignar el nombre del archivo al elemento de texto
         text_file.text(fileName);
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