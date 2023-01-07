<?php

// Incluimos el archivo de conexión a la base de datos
include '../database/conexion.php';

$_post = json_decode(file_get_contents('php://input'),true);

$folio = $_post['folio'];
$detalle_id = $_post['detalle_id'];

$select = "SELECT COUNT(*) FROM ordenes WHERE id =?";
$re = $con->prepare($select);
$re->execute([$folio]);
$total = $re->fetchColumn();
$re->closeCursor();

if ($total > 0) {
    $select = "SELECT * FROM ordenes WHERE id =?";
    $re = $con->prepare($select);
    $re->execute([$folio]);
    while ($rows = $re->fetch()) {
        $id_cliente = $rows["id_cliente"];
        $datos_cliente = traerDatoCliente($id_cliente, $con);
        $rows["datos_cliente"] = $datos_cliente;

        $data = $rows;
    }
    $re->closeCursor();


$select = "SELECT COUNT(*) FROM detalle_orden WHERE id =?";
$re = $con->prepare($select);
$re->execute([$detalle_id]);
$total = $re->fetchColumn();
$re->closeCursor();

//Trayendo detalle de la orden    

if ($total > 0) {
    $select = "SELECT * FROM detalle_orden WHERE id =?";
    $re = $con->prepare($select);
    $re->execute([$detalle_id]);
    while ($row = $re->fetch()) {
         $detalle_id = $row['id'];
         $row["porcentaje_pago"] = floatval( number_format(floatval($row['pagado']) / floatval($row['precio']), 2));
        /*$orden_id = $row['orden_id']; */

        $select_count_abonos = "SELECT COUNT(*) FROM abonos WHERE orden_id =? AND detalle_id = ?";
        $ress = $con->prepare($select_count_abonos);
        $ress->execute([$folio, $detalle_id]);
        $total_abonos = $ress->fetchColumn();
        $ress->closeCursor();

if ($total_abonos > 0) {
    $select_abonos = "SELECT * FROM abonos WHERE orden_id =? AND detalle_id = ?";
    $resps = $con->prepare($select_abonos);
    $resps->execute([$folio, $detalle_id]);

    $row["abonos"] = array();
    while ($fila = $resps->fetch()) {
        
        $row["abonos"][] = $fila;
    }

$resps->closeCursor();

}else{
    $row["abonos"] = null;
}



        $data["detalle_orden"][] = $row; 
    }
    $re->closeCursor();

    $response = array("estatus"=> true, "mensaje"=> "Datos encontrados", "data"=> $data);

    
}else{
    $response = array("estatus"=> false, "mensaje"=> "Sin datos encontrados", "data"=> $_post);

}


}else{
    $response = array("estatus"=> false, "mensaje"=> "Sin datos encontrados", "data"=> $_post);

}




echo json_encode($response, JSON_UNESCAPED_UNICODE);


function traerDatoCliente($id, $con)
{
    $consultar = "SELECT COUNT(*) FROM clientes WHERE id = ?";
    $resp = $con->prepare($consultar);
    $resp->execute([$id]);
    $total = $resp->fetchColumn();
    $resp->closeCursor();

    if ($total>0) {
        $consultar = "SELECT * FROM clientes WHERE id = ?";
        $resp = $con->prepare($consultar);
        $resp->execute([$id]);
        while ($row = $resp->fetch()) {
            $response = $row;
        }
        return $response;

    }else{
        return array();
    }

}




?>