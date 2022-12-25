<?php


if($_POST){

    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $username = $_POST['username'];
    $lastname = $_POST['lastname'];
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $store = $_POST['store'];
    $rol = $_POST['rol'];
    $estatus = "Activo";
    $fecha = date("Y-m-d");
    $hash = password_hash($pass, PASSWORD_DEFAULT, [15]);
    $datos = array(
        $username, $lastname, $rol, $estatus, $fecha, $user, $hash
    );

   

    $consultar = $con->prepare("SELECT COUNT(*) FROM usuarios WHERE usuario  = ?");
    $consultar->execute([$user]);
    $total = $consultar->fetchColumn();

    if($total == 0) {

        $ingresar = $con->prepare("INSERT INTO usuarios(id, 
                                                        nombre,
                                                        apellido,
                                                        rol,
                                                        estatus,
                                                        fecha_ingreso,
                                                        usuario,
                                                        contraseña) VALUES(null,?,?,?,?,?,?,?)");
         $ingresar->execute($datos);
         $ingresar->closeCursor();
         print_r(1);                                                  
    }else{
        print_r(2);
    }

    
  
}

?>