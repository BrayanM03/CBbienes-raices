<?php

if($_POST){
    include "conexion.php";
    date_default_timezone_set('America/Matamoros');

    $username = $_POST['username'];
    $pass = $_POST['pass'];
    $fecha = date("Y-m-d");


    $datos = array(
        $username, $pass
    );

    $consultar = $con->prepare("SELECT COUNT(*) FROM usuarios WHERE usuario  = ?");
    $consultar->execute([$username]);
    $total = $consultar->fetchColumn();
    $consultar->closeCursor();

    if($total > 0){
        	
        $consultar = $con->prepare("SELECT * FROM usuarios WHERE usuario  = ?");
        $consultar->execute([$username]);
        while ($row = $consultar->fetch()) {

            if($row['estatus'] == "Activo"){

                $hash = $row['contraseña'];

                if(password_verify($pass, $hash)){
                    
                    session_start();
                    
                    $_SESSION["id"] = $row['id'];
                    $_SESSION['nombre'] = $row['nombre'];
                    $_SESSION['apellido'] = $row['apellido'];
                    $_SESSION['user'] = $row['usuario'];
                    $_SESSION['fecha_ingreso'] = $row['fecha_ingreso'];
                    $_SESSION['rol'] = $row['rol'];
                    $_SESSION['estatus'] = $row['estatus'];
                    $_SESSION["sucursal_id"] = $row['sucursal_id'];

                    print_r(1);
    
                }else{
                    print_r(3);
                }
            }else{
                print_r(4);
            }

           

            
        }
        

    }else{
        print_r(2);
    }


};

?>