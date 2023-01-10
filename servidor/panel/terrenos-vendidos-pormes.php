<?php


    session_start();
    include '../database/conexion.php';
    
     date_default_timezone_set("America/Matamoros");

    if (!$con) {
        echo "maaaaal";
    }

    $arreglo_mes = array("Enero"=>1, "Febrero"=>2, "Marzo"=>3, "Abril"=>4,
    "Mayo"=>5, "Junio"=>6, "Julio"=>7,"Agosto"=>8, "Septiembre"=>9, "Octubre"=>10,
    "Noviembre"=>11, "Diciembre"=>12);

    $year = date("Y");
  foreach ($arreglo_mes as $key => $value) {
    
        $contar = "SELECT COUNT(*) FROM ordenes WHERE MONTH(fecha) = ? AND YEAR(fecha) = ?";
        $re = $con->prepare($contar);
        $re->execute([$value, $year]);
        $total_ventas = $re->fetchColumn();
        $count = $re->fetchColumn();

        $arreglo_response[$key] = $total_ventas;
  }

  echo json_encode($arreglo_response, JSON_UNESCAPED_UNICODE);
    
    

    


    ?>