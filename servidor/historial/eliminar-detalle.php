<?php
 
// Incluimos el archivo de conexión a la base de datos
session_start();
include '../database/conexion.php';

$detalle_id = intval($_POST["detalle_id"]);

$count = "SELECT COUNT(*) FROM detalle_orden WHERE id = ?";
$res = $con->prepare($count);
$res->execute([$detalle_id]);
$total = $res->fetchColumn();
$res->closeCursor();
$nuevo_estatus = "Disponible";


if ($total > 0) {
    //Seteando disponibilidad en los terrenos
    $set = "SELECT * FROM detalle_orden WHERE id = ?";
    $res = $con->prepare($set);
    $res->execute([$detalle_id]);


    while ($row = $res->fetch()) {
        $proyecto = $row["id_proyecto"];
        $manzana = $row["manzana"];
        $lote = $row["lote"];
        

        $update_count = "SELECT COUNT(*) FROM terrenos WHERE proyecto = ? AND manzana = ? AND lote = ?";
        $resc = $con->prepare($update_count);
        $resc->execute([$proyecto, $manzana, $lote]);
        $total_terrenos = $resc->fetchColumn();
        $resc->closeCursor();

        if ($total_terrenos > 0) {
            $updt = "UPDATE terrenos SET estatus = ? WHERE proyecto = ? AND manzana = ? AND lote = ?";
            $rr = $con->prepare($updt);
            $rr->execute([$nuevo_estatus, $proyecto, $manzana, $lote]);
            $rr->closeCursor();

        }else{

        }
    }

    $res->closeCursor();

    $delete = "DELETE FROM detalle_orden WHERE id = ?";
    $re = $con->prepare($delete);
    $re->execute([$detalle_id]);
    $re->closeCursor();

    $delete_abono = "DELETE FROM abonos WHERE detalle_id = ?";
    $r = $con->prepare($delete_abono);
    $r->execute([$detalle_id]);
    $r->closeCursor();

    $response = array("estatus" => true, "mensaje" => "El terreno se elimino de la venta correctamente", "post"=> $_POST) ;
    
}else{
    $response = array("estatus" => false, "mensaje" => "No hay terrenos asociados a esta venta", "post"=> $_POST );

}

echo json_encode( $response, JSON_UNESCAPED_UNICODE );
