<?php

include "../database/conexion.php";
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);



    date_default_timezone_set('America/Matamoros');

    if(empty($data['modo'])){
        $codigo = $data['codigo'];
   
        $insert = "SELECT COUNT(*) FROM inventario WHERE codigo = ?";
        $resp = $con->prepare($insert);
        $resp->execute([$codigo]);
        $total = $resp->fetchColumn();
        $resp->closeCursor();
    
        if($total > 0) {
    
            $response = array("status"=>false, "mensj"=>"Ya existe ese codigo");
            echo json_encode($response, JSON_UNESCAPED_UNICODE);
        }else if($total == 0) {
            $response = array("status"=>true, "mensj"=>"Codigo disponible dd");
            echo json_encode($response, JSON_UNESCAPED_UNICODE);
        }
    }else{

        //Validando un codigo de un producto en modo de edicion
        $codigo = $data['codigo'];
        $codigo_actual = $data['codigo'];	//Codigo actual del producto
   
        $insert = "SELECT COUNT(*) FROM inventario WHERE codigo = ? AND codigo != ?";
        $resp = $con->prepare($insert);
        $resp->execute([$codigo, $codigo_actual]);
        $total = $resp->fetchColumn();
        $resp->closeCursor();
    
        if($total > 0) {
    
            $response = array("status"=>false, "mensj"=>"Ya existe ese codigo");
            echo json_encode($response, JSON_UNESCAPED_UNICODE);
        }else if($total == 0) {
            $response = array("status"=>true, "mensj"=>"Codigo disponible");
            echo json_encode($response, JSON_UNESCAPED_UNICODE);
        }
    }

  






?>