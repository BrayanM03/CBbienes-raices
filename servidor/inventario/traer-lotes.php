<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');


    $key = $_POST['manzana'];
    $consultar = $con->prepare("SELECT COUNT(*) FROM manzanas WHERE id  = ?");
    $consultar->execute([$key]);
    $total = $consultar->fetchColumn();

    if ($total > 0) {
        $consultar = $con->prepare("SELECT * FROM manzanas WHERE id  = ? ORDER BY id DESC");
        $consultar->execute([$key]);
        while ($row = $consultar->fetch()) {
            $response['cantidad_lotes'] = $row['cantidad_lotes'];
        }

        $response['status'] = true;
        $response['mensajes'] = "Se encontraron datos";
    }else{
        $response['status'] = false;
        $response['mensj'] = "No se encontraron datos";

    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);
}