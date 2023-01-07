<?php


session_start();
include '../database/conexion.php';

 date_default_timezone_set("America/Matamoros");

 $id_cliente = $_POST['cliente_id'];
 $archivos1= glob('../../static/docs/C'.$id_cliente.'/INE.*');
 // Crear un arreglo para almacenar el resultado de la verificación
$resultado = array();

 if (count($archivos1) > 0) {
    $resultado['INE'] = true;
    $extension = pathinfo($archivos1[0], PATHINFO_EXTENSION);
    $resultado['EXT_INE'] = $extension;

} else {
    $resultado['INE'] = false;
}

$archivos2 = glob('../../static/docs/C'.$id_cliente.'/COMPROBANTE DE DOMICILIO.*');

if (count($archivos2) > 0) {
    $resultado['DOMICILIO'] = true;
    $extension2 = pathinfo($archivos2[0], PATHINFO_EXTENSION);
    $resultado['EXT_DOMICILIO'] = $extension2;
} else {
    $resultado['DOMICILIO'] = false;
}

$archivos3 = glob('../../static/docs/C'.$id_cliente.'/RFC.*');

if (count($archivos3) > 0) {
    $resultado['RFC'] = true;
    $extension3 = pathinfo($archivos3[0], PATHINFO_EXTENSION);
    $resultado['EXT_RFC'] = $extension3;
} else {
    $resultado['RFC'] = false;
}

$resultado["post"] = count($archivos1) . ' ' . count($archivos2) . ' ' . count($archivos3);


// Devolver el resultado como respuesta JSON
header('Content-Type: application/json');
echo json_encode($resultado);
?>
