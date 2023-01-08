<?php

include "../database/conexion.php";
date_default_timezone_set('America/Matamoros');


$id_terreno = $_POST["id_terreno"];

$delete = "DELETE FROM terrenos WHERE id = ?";
    $re = $con->prepare($delete);
    $re->execute([$id_terreno]);
    $re->closeCursor();

    $response = array("estatus"=> true, "mensaje"=>"Eliminado correctamente");

echo json_encode($response, JSON_UNESCAPED_UNICODE);

?>