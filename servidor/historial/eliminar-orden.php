<?php

// Incluimos el archivo de conexión a la base de datos
session_start();
include '../database/conexion.php';

$orden_id = intval($_POST["orden_id"]);

$count = "SELECT COUNT(*) FROM ordenes WHERE id = ?";
$res = $con->prepare($count);
$res->execute([$orden_id]);
$total_ordenes = $res->fetchColumn();
$res->closeCursor(); 

$nuevo_estatus = "Disponible";

if($total_ordenes > 0){

    $delete = "DELETE FROM ordenes WHERE id = ?";
    $re = $con->prepare($delete);
    $re->execute([$orden_id]);
    $re->closeCursor();

    $count = "SELECT COUNT(*) FROM detalle_orden WHERE orden_id = ?";
$res = $con->prepare($count);
$res->execute([$orden_id]);
$total = $res->fetchColumn();
$res->closeCursor();

if($total > 0){

    //Seteando disponibilidad en los terrenos
    $set = "SELECT * FROM detalle_orden WHERE orden_id = ?";
    $res = $con->prepare($set);
    $res->execute([$orden_id]);
  

    while ($row = $res->fetch()) {

        $proyecto = $row["id_proyecto"];
        $manzana = $row["manzana"];
        $lote = $row["lote"];

        $update_count = "SELECT COUNT(*) FROM terrenos WHERE proyecto = ? AND manzana = ? AND lote = ?";
        $resc = $con->prepare($update_count);
        $resc->execute([$proyecto, $manzana, $lote]);
        $total_terrenos = $resc->fetchColumn();
        $resc->closeCursor();

     
        if($total_terrenos > 0) {
            $updt = "UPDATE terrenos SET estatus = ? WHERE proyecto = ? AND manzana = ? AND lote = ?";
            $rr = $con->prepare($updt);
            $rr->execute([$nuevo_estatus, $proyecto, $manzana, $lote]);
            $rr->closeCursor();
        }
    }

    $res->closeCursor();


    $delete = "DELETE FROM detalle_orden WHERE orden_id = ?";
    $re = $con->prepare($delete);
    $re->execute([$orden_id]);
    $re->closeCursor();

    $delete_abono = "DELETE FROM abonos WHERE orden_id = ?";
    $r = $con->prepare($delete_abono);
    $r->execute([$orden_id]);
    $r->closeCursor();

    $response = array("estatus" => true, "mensaje" => "El terreno se elimino de la venta correctamente", "post"=> $_POST) ;
    
}else{
    $response = array("estatus" => false, "mensaje" => "No hay terrenos asociados a esta venta", "post"=> $_POST );

}


}else{
    $response = array("estatus" => false, "mensaje" => "No hay ordenes", "post"=> $_POST );

}



echo json_encode( $response, JSON_UNESCAPED_UNICODE );