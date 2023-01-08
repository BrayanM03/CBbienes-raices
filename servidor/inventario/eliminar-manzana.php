<?php

include "../database/conexion.php";
date_default_timezone_set('America/Matamoros');


$id_manzana = $_POST["id_detalle"];

$delete = "DELETE FROM manzanas WHERE id = ?";
    $re = $con->prepare($delete);
    $re->execute([$id_manzana]);
    $re->closeCursor();

    $response = array("estatus"=> true, "mensaje"=>"Eliminado correctamente");

echo json_encode($response, JSON_UNESCAPED_UNICODE);

?>