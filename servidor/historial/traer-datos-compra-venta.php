<?php

// Incluimos el archivo de conexión a la base de datos
include '../database/conexion.php';

$_post = json_decode(file_get_contents('php://input'),true);

$folio = $_post['folio'];

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
        $data = $rows;
    }
    $re->closeCursor();


$select = "SELECT COUNT(*) FROM detalle_orden WHERE orden_id =?";
$re = $con->prepare($select);
$re->execute([$folio]);
$total = $re->fetchColumn();
$re->closeCursor();

//Trayendo detalle de la orden    

if ($total > 0) {
    $select = "SELECT * FROM detalle_orden WHERE orden_id =?";
    $re = $con->prepare($select);
    $re->execute([$folio]);
    while ($row = $re->fetch()) {
         $detalle_id = $row['id'];
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




?>