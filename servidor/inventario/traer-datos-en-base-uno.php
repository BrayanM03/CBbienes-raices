<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');


    $key = $_POST['id'];
    $tabla = $_POST['tabla'];
    $indicador = $_POST['indicador'];

    $consultar = $con->prepare("SELECT COUNT(*) FROM $tabla WHERE $indicador  = ?");
    $consultar->execute([$key]);
    $total = $consultar->fetchColumn(); 

    if($total > 0){

        $consultar = $con->prepare("SELECT * FROM $tabla WHERE $indicador  = ? ORDER BY id DESC");
        $consultar->execute([$key]);
        while ($row = $consultar->fetch()) {

            $data['data'][] = $row;
        }

        $data['status'] = true;
        $data['mensj'] = "Se encontraron datos";
        
    }else{
        $data['status'] = false;
        $data['mensj'] = "No se encontro un elemento coincidente";
    }

    echo json_encode($data, JSON_UNESCAPED_UNICODE);


}

?>