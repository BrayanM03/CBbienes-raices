<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');


    $id_terreno = $_POST['id_terreno'];
    $consultar = $con->prepare("SELECT COUNT(*) FROM terrenos WHERE id=?");
    $consultar->execute([$id_terreno]);
    $total_terrenos = $consultar->fetchColumn();
    $consultar->closeCursor();

    if($total_terrenos > 0) {
        $consultar = $con->prepare("SELECT * FROM terrenos WHERE id=?");
        $consultar->execute([$id_terreno]);
        while ($row_terreno = $consultar->fetch()) {
            $response['terrenos'] = $row_terreno;
        }
    }else{
        $response['terrenos'][] = array();
    }
   
    $consultar = $con->prepare("SELECT COUNT(*) FROM proyectos");
    $consultar->execute([]);
    $total = $consultar->fetchColumn();

    if ($total > 0) {
        $consultar = $con->prepare("SELECT * FROM proyectos");
        $consultar->execute([]);
        while ($row = $consultar->fetch()) {
            $response['datos'][] = $row;
        }

        $response['estatus'] = true;
        $response['mensaje'] = "Se encontraron datos";
    }else{
        $response['estatus'] = false;
        $response['mensaje'] = "No se encontraron datos";

    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);
}