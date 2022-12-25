<?php

// Incluimos el archivo de conexión a la base de datos
include '../database/conexion.php';

$_post = json_decode(file_get_contents('php://input'),true);
// Obtenemos el valor del dato enviado en la petición POST
$valor = $_post['dato'];
$tabla = $_post['tabla'];
$indicador = $_post['indicador'];
// Creamos un array vacío para almacenar los datos
$datos = array();
// Creamos una consulta preparada
$contar = $con->prepare("SELECT COUNT(*) FROM $tabla WHERE $indicador = ?");
$contar->execute([$valor]);
$total = $contar->fetchColumn();
$contar->closeCursor();

if($total > 0) {
  $consulta = $con->prepare("SELECT * FROM $tabla WHERE $indicador = ?");

  $consulta->bindParam(':tabla', $tabla);
  $consulta->execute([$valor]);
  
  // Obtenemos el resultado de la consulta
  $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);;
  
  
  
  // Iteramos sobre el resultado y agregamos cada fila al array
  foreach ($resultado as $fila) {
      $datos[] = $fila;
    }
    $response = array("estatus" => true, "resultado" => $datos, "mensaje" => "Datos traidos correctamente");
}else{
  $response = array("estatus" => false, "resultado" => $datos, "post"=> $_post, "mensaje" => "Sin datos encontrados");

}

 
// Devolvemos los datos en formato JSON
echo json_encode($response, JSON_UNESCAPED_UNICODE);
