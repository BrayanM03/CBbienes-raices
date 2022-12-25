<?php
session_start();
include "conexion.php";

if(empty($_SESSION["id"])){
    throw new Exception('La sesion no ha sido iniciada');
}else{

    $_post = json_decode(file_get_contents('php://input'),true);


$id_cliente = $_post["id"];
$tabla = $_post["tabla"];
$related = $_post["relacion"];
$tablas_relacionadas = $_post["tablas_relacionadas"];

$query = "SELECT COUNT(*) FROM $tabla WHERE id = ?";
$consultar = $con->prepare($query);
$consultar->execute([$id_cliente]);
$total = $consultar->fetchColumn();
$consultar->closeCursor();

if($total > 0){

    $consultar = $con->prepare("SELECT * FROM $tabla WHERE id  = ?");
        $consultar->execute([$id_cliente]);
        while ($row = $consultar->fetch()) {
            $data = $row;
        }


    $mensaje = array("mensaje"=> "Si existe este cliente", "data"=>$data, "related"=> $related);
    
    if($related == true) {

        foreach ($tablas_relacionadas as $key => $value) {
            $nombre_tabla_relacionada = $value["nombre"];
            $data_relacionada = array();

            $query = "SELECT COUNT(*) FROM $nombre_tabla_relacionada WHERE id_usuario = ?";
            $consultar = $con->prepare($query);
            $consultar->execute([$id_cliente]);
            $total = $consultar->fetchColumn();

            if($total > 0){
                $consulta_completa = $con->prepare("SELECT * FROM $nombre_tabla_relacionada WHERE id_usuario  = ?");
                $consulta_completa->execute([$id_cliente]);
                while ($row = $consulta_completa->fetch()) {
                    $data_relacionada[] = $row;
                   
                }
                $mensaje[$nombre_tabla_relacionada] =  $data_relacionada;
               
            }else{
                $mensaje[$nombre_tabla_relacionada] = "Sin registros";
            }

            $consultar->closeCursor();
           
        }
        
       
    }

    echo json_encode($mensaje, JSON_UNESCAPED_UNICODE);

}else{
    throw new Exception('No existe un cliente con este id');
}

}

?>