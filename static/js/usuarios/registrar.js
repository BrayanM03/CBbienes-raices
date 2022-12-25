function Registrar(){

    let username = document.getElementById("nombre").value;
    let lastname = document.getElementById("apellido").value;
    let user = document.getElementById("usuario").value;
    let pass = document.getElementById("pass").value;
    let store = document.getElementById("sucursal").value;
    let rol = document.getElementById("rol").value;

    let validacion = validarDatos(username, lastname, user, pass, store, rol);
    console.log(validacion);
    if(validacion){

        var datosForm = new FormData();
        datosForm.append("username", username);
        datosForm.append("lastname", lastname); 
        datosForm.append("user", user);
        datosForm.append("pass", pass); 
        datosForm.append("store", store);
        datosForm.append("rol", rol);
    
    $.ajax({
        type: "POST",
        url: "../servidor/usuarios/registrar-nuevo.php",
        processData: false,
        contentType: false,
        data: datosForm,
        dataType: "JSON",
        success: function (response) {
            if(response == 1){
                Swal.fire({
                    icon: "success",
                    html: `<h3>Usuario registrado</h3>`
                })
            }else if(response == 2){
                Toast.fire({
                    icon: 'error',
                    title: 'Ese usuaro ya existe'
                  })
                  document.getElementById("usuario").classList.add("animate__headShake");
                  setTimeout(function() {
                      document.getElementById("usuario").classList.remove("animate__headShake");
                  }, 700);
            }
        }
    });
    }

   

}


function validarDatos(username, lastname, user, password, store, rol) {

    if(username == null || username == undefined || username.length == 0 || username == ""){
        animarError("nombre")
        return false;
    }

    if(lastname== null || lastname == undefined || lastname.length == 0 || lastname == ""){
        animarError("apellido")
        return false;
    }

    if(user == null || user == undefined || user.length == 0 || user == ""){
        animarError("usuario")
        return false;
    }

    if(password == null || password == undefined || password.length == 0 || password == ""){
        animarError("pass")
        return false;
    }
    
    if(store == null || store == undefined || store.length == 0 || store == ""){
        animarError("sucursal")
        return false;
    }

    if(rol == null || rol == undefined || rol.length == 0 || rol == ""){
        animarError("rol")
        return false;
    }

    return true;
    
}

function animarError(id_element){
    document.getElementById(id_element).classList.add("animate__headShake");
    setTimeout(function() {
        document.getElementById(id_element).classList.remove("animate__headShake");
    }, 700);

    if(id_element == "nombre") {
        Toast.fire({
            icon: 'error',
            title: 'Ingresa un nombre'
          })
    }else if(id_element == "apellido"){
        Toast.fire({
            icon: 'error',
            title: 'Ingresa una contraseña'
          })
    }else if(id_element == "usuario"){
        Toast.fire({
            icon: 'error',
            title: 'Ingresa un usuario'
          })
    }else if(id_element == "pass"){
        Toast.fire({
            icon: 'error',
            title: 'Ingresa una contraseña'
          })
    }else if(id_element == "sucursal"){
        Toast.fire({
            icon: 'error',
            title: 'selecciona una sucursal'
          })
    }else if(id_element == "rol"){
        Toast.fire({
            icon: 'error',
            title: 'Ingresa un rol'
          })
    }else{
        Toast.fire({
            icon: 'error',
            title: 'Algo salio mal'
          })
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
  
  