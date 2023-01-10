<?php
    session_start();
    include '../database/conexion.php';
    
     date_default_timezone_set("America/Matamoros");

    if (!$con) {
        echo "maaaaal";
    }

    if (!isset($_SESSION['user'])) {
    header("Location:../../static/login.php");
    }

    
    $id_cliente = $_POST["id_cliente"];
   
    $delete_detail_customer = "DELETE FROM clientes WHERE id =?";
    $res = $con->prepare($delete_detail_customer);
    $res->bindParam(1,$id_cliente);
    $res->execute();
    $res->closeCursor();

    $delete_detail_customer = "DELETE FROM detalle_direccion WHERE id_usuario =?";
    $res = $con->prepare($delete_detail_customer);
    $res->bindParam(1,$id_cliente);
    $res->execute();
    $res->closeCursor();

    $delete_detail_customer = "DELETE FROM detalle_correo WHERE id_usuario =?";
    $res = $con->prepare($delete_detail_customer);
    $res->bindParam(1,$id_cliente);
    $res->execute();
    $res->closeCursor();

    $delete_detail_customer = "DELETE FROM detalle_cuenta_bancaria WHERE id_usuario =?";
    $res = $con->prepare($delete_detail_customer);
    $res->bindParam(1,$id_cliente);
    $res->execute();
    $res->closeCursor();

    $path = '../../static/docs/C'.$id_cliente;
    deleteDirectory($path);

    print_r(1);

    function deleteDirectory($dir) {
        if(!$dh = @opendir($dir)) return;
        while (false !== ($current = readdir($dh))) {
            if($current != '.' && $current != '..') {
                
                if (!@unlink($dir.'/'.$current)) 
                    deleteDirectory($dir.'/'.$current);
            }       
        }
        closedir($dh);
        @rmdir($dir);
    }



    ?>