<?php

if(isset($_POST['id_cliente'])){
$id_cliente = $_POST['id_cliente'];
$documento = $_POST['documento'];
$path ='../../static/docs/C'.$id_cliente .'/' . $documento . '.*';

 // Buscar todos los archivos que coincidan con el patrón
 $files = glob($path);

 // Recorrer los archivos encontrados y eliminarlos
 foreach ($files as $file) {
     if (file_exists($file)) {
         unlink($file);
         $response = array("estatus" => true, "mensaje"=> "Documento eliminado correctamente");
     }else{
        $response = array("estatus" => true, "mensaje"=> "Documento no fue eliminado");

     }
 }

 echo json_encode($response, JSON_UNESCAPED_UNICODE);
}




?>