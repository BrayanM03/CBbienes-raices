<?php


    session_start();
    include '../database/conexion.php';
    include '../nueva-orden/traer-importe.php';
    
    date_default_timezone_set("America/Matamoros");

    if($_POST["tipo"] == 1){ // 1 sinifica que es una venta final y hay que borrar la tabla preorden

        $setar = "DELETE FROM detalle_preorden WHERE usuario_id = ?";
        $resp = $con->prepare($setar);
        $resp->execute([$_SESSION["id"]]);
        $resp->closeCursor();
    }

   


    $response = array("estatus"=> true, "mensaje"=>"seteado correctamente");
        $importe  = traerImporte($con);
        $response["importe"] = $importe;
        echo json_encode($response, JSON_UNESCAPED_UNICODE);


?>