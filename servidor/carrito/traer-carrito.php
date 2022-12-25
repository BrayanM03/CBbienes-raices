<?php
  
  session_start();
  include '../database/conexion.php';
  
  date_default_timezone_set("America/Matamoros");
  $usuario_id = $_SESSION["id"];
  $response = array();

    $comprobar = "SELECT COUNT(*) FROM carrito_compra WHERE usuario_id = ?";
    $resp = $con->prepare($comprobar);
    $resp->execute([$usuario_id]);
    $total = $resp->fetchColumn();

    if($total > 0){
        $select = "SELECT * FROM carrito_compra WHERE usuario_id = ?";
        $resp = $con->prepare($select);
        $resp->execute([$usuario_id]);
        $subtotal = 0;
        $descuento = 0;
        $importe =0;
        $iva =0;
        while ($row = $resp->fetch(PDO::FETCH_OBJ)) {
            //print_r($row['importe']);
            $subtotal = $subtotal + floatval($row->importe_base);
            $iva = $iva+ floatval($row->impuesto);
            $importe = $importe + floatval($row->importe);

            //print_r($row);
            $response["data"][] = $row;
        }

        $response["subtotal"] = $subtotal;
        $response["descuento"] = $descuento;
        $response["iva"] = $iva;
        $response["importe"] = $importe;

        $response["status"] = true;
        $response["message"] = "El carrito tiene productos";
    }else{
        $response["data"] = [];
        $response["status"] = false;
        $response["message"] = "El carrito no tiene productos";
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);




?>