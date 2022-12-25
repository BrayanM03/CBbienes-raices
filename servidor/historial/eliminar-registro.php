<?php

include "../database/conexion.php";
date_default_timezone_set('America/Matamoros');

include '../database/eliminar-dato.php';

$delete = new Eliminar;
$tipo = $_POST["type"];
$id_reg = $_POST["id_reg"];

switch($tipo){
    case 'salidas':
    $sentencia = $delete->eliminarDato("salidas", $id_reg, true, "detalle_salida", "salida_id", $con);
   
    break;
}

echo json_encode($sentencia, JSON_UNESCAPED_UNICODE);

?>