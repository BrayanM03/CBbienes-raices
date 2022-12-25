<?php
session_start();
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $id_sesion = $_SESSION["id"];
    $numero_manzana = $_POST["numero_manzana"];
    $cantidad_lotes = $_POST["cantidad_lotes"];
    $proyecto = $_POST["proyecto"];

   $select = "SELECT COUNT(*) FROM manzanas WHERE proyecto_id = ? AND no_manzana = ?";
   $resp = $con->prepare($select);
   
    $resp->execute([$proyecto, $numero_manzana]);
    $total = $resp->fetchColumn();
    $resp->closeCursor();


    if($total == 0){

        $select_proj = "SELECT * FROM proyectos WHERE id = ?";
        $re = $con->prepare($select_proj);
        $re->execute([$proyecto]);

        while ($row = $re->fetch(PDO::FETCH_OBJ)) {

            $proyecto_nombre = $row->nombre; 
        
        }
        $re->closeCursor();


         $insert = "INSERT INTO manzanas(id, proyecto_id, proyecto_name, no_manzana, cantidad_lotes)
         VALUES(null, ?,?,?,?)";
         $res = $con->prepare($insert);
         $res->execute([$proyecto, $proyecto_nombre, $numero_manzana, $cantidad_lotes]);
         $res->closeCursor();

         $response = array("status"=>true, "mensaje"=> "Dato insertado correctamente");
    }else{
        $response = array("status"=>false, "mensaje"=> "Dato duplicado, el numero de manzana ya exise. Elige otro numero o selecciona otro proyecto");
    }
 
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);

}



?>