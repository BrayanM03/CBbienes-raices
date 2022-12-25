<?php

if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');
 
    $parametro = $_POST["param"];
    $_parametro = "%$parametro%";
    $estatus = "Activo";
    $sucursal = 1;
    
    $contar = "SELECT COUNT(*) FROM inventario WHERE estatus = ? AND sucursal = ? 
    AND ( codigo LIKE ? OR upc LIKE ? OR descripcion LIKE ? OR modelo LIKE ? OR marca LIKE ? OR
    categoria LIKE ? OR subcategoria LIKE ? OR sat_key LIKE ?)";

    $res = $con->prepare($contar);
    $res->execute([$estatus, $sucursal, $_parametro, $_parametro, $_parametro, $_parametro, $_parametro, $_parametro, $_parametro, $_parametro]);
    $total = $res->fetchColumn();
    
    if($total > 0){
        
    $select = "SELECT * FROM inventario WHERE estatus = ? AND sucursal = ? 
    AND ( codigo LIKE ? OR upc LIKE ? OR descripcion LIKE ? OR modelo LIKE ? OR marca LIKE ? OR
    categoria LIKE ? OR subcategoria LIKE ? OR sat_key LIKE ?)";

    $resp = $con->prepare($select);
    $resp->execute([$estatus, $sucursal, $_parametro, $_parametro, $_parametro, $_parametro, $_parametro, $_parametro, $_parametro, $_parametro]);
    while ($row = $resp->fetch()) {

        $response["status"] = true;
        $response["message"] = "Tu busqueda encontro resultados";
        $row["descripcion"] = str_replace('"', '\"', $response["descripcion"]);
        $response["data"][] = $row;
    }
    }else{
        $response["status"] = false;
        $response["message"] = "No se encontrarón productos";
        $response["data"] = [];
    }

}else{
    $response["status"] = false;
    $response["message"] = "No se envio una petición POST";
    $response["data"] = [];
}


    echo json_encode($response, JSON_UNESCAPED_UNICODE);

?>