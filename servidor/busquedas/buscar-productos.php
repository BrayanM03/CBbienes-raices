<?php
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');


    $key = $_POST['id'];
    $tabla = $_POST['tabla'];
    $indicador = $_POST['indicador']; 
    $input = $_POST['input'];
    $entrada = $input["term"];
    //print_r($entrada. "--");
    $parametro = "%$entrada%";

    $consultar = $con->prepare("SELECT COUNT(*) FROM $tabla WHERE descripcion LIKE ? OR codigo LIKE ? OR upc LIKE ? OR modelo LIKE ? OR marca LIKE ? OR sat_key LIKE ?");
    $consultar->execute([$key, $parametro, $parametro, $parametro, $parametro, $parametro, $parametro]);
    $total = $consultar->fetchColumn(); 


    if($total > 0){

        $consultar = $con->prepare("SELECT * FROM $tabla WHERE $indicador  = ? AND descripcion LIKE ? OR codigo LIKE ? OR upc LIKE ? OR modelo LIKE ? OR marca LIKE ? OR sat_key LIKE ? ORDER BY id DESC");
        $consultar->execute([$key, $parametro, $parametro, $parametro, $parametro, $parametro, $parametro]);
        while ($row = $consultar->fetch()) {

            $data['data'][] = $row;
        }

        $data['status'] = true;
        $data['mensj'] = "Se encontraron datos";
        
    }else{
        $data['status'] = false;
        $data['mensj'] = "No se encontro un elemento coincidente";
        $data['data'][] = array("Agregar nuevo producto", 'status'=>false);
    }

    echo json_encode( $data['data'], JSON_UNESCAPED_UNICODE);
    //data['data']


}

?>