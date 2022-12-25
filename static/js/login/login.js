function iniciarSesion(){

    user = document.getElementById("user").value;
    pass = document.getElementById("pass").value;

    let validacion = validarDatos(user, pass);
    console.log(validacion);
    if(validacion){

        var datosSesion = new FormData();

        datosSesion.append("username", user);
        datosSesion.append("pass", pass); // number 123456 is immediately converted 
    
    $.ajax({
        type: "POST",
        url: "../servidor/database/iniciar-sesion.php",
        processData: false,
        contentType: false,
        data: datosSesion,
        dataType: "JSON",
        success: function (response) {
            if(response == 2){
                animarError('user', 2);
            }else if(response == 3){
                animarError('pass', 2);
            }else if(response == 1){
                window.location.href = 'index.php'
            }
        }
    });
    }

   

}


function validarDatos(user, password) {

    if(user == null || user == undefined || user.length == 0 || user == ""){
        animarError("user", 1)
        return false;
    }

    if(password == null || password == undefined || password.length == 0 || password == ""){
        animarError("pass", 1)
        return false;
    }

    return true;
    
}

function animarError(id_element, type){
    document.getElementById(id_element).classList.add("animate__headShake");
    setTimeout(function() {
        document.getElementById(id_element).classList.remove("animate__headShake");
    }, 700);

    if(id_element == "user" && type == 1) {
        Toast.fire({
            icon: 'error',
            title: 'Ingresa un usuario'
          })
    }else if(id_element == "pass" && type == 1){
        Toast.fire({
            icon: 'error',
            title: 'Ingresa una contraseña'
          })
    }

    if(id_element == "user" && type == 2){
        Toast.fire({
            icon: 'error',
            title: 'El usuario no existe'
          })
    }else if(id_element == "pass" && type == 2){
        Toast.fire({
            icon: 'error',
            title: 'Contraseña incorrecta'
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
  
  