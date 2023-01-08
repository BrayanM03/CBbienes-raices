<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');


    $key = $_POST['proyecto_id'];
    $consultar = $con->prepare("SELECT COUNT(*) FROM manzanas WHERE proyecto_id  = ?");
    $consultar->execute([$key]);
    $total = $consultar->fetchColumn();

    if ($total > 0) {
        $consultar = $con->prepare("SELECT * FROM manzanas WHERE proyecto_id  = ? ORDER BY no_manzana ASC");
        $consultar->execute([$key]);
        while ($row = $consultar->fetch()) {
            $arreglo_manzana[] = $row;
        }

        $response['estatus'] = true;
        $response['arreglo_manzanas'] = $arreglo_manzana;
        $response['mensajes'] = "Se encontraron datos";
    }else{
        $response['arreglo_manzanas'] = null;
        $response['estatus'] = false;
        $response['mensj'] = "No se encontraron datos";

    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);
}