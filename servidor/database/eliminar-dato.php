<?php

include "../database/conexion.php";
date_default_timezone_set('America/Matamoros');

 class Eliminar {

    
    function eliminarDato($tabla, $id, $has_relation, $relacion, $relacion_id, $con){

        $del = "SELECT COUNT(*) FROM $tabla WHERE id = ?";
        $resp = $con->prepare($del);
        $resp->execute([$id]);
        $total = $resp->fetchColumn();
        $resp->closeCursor();

        if($total > 0){ 

          
                $del = "SELECT COUNT(*) FROM $relacion WHERE $relacion_id = ?";
                $resp = $con->prepare($del);
                $resp->execute([$id]);
                $total_datos_relacionados = $resp->fetchColumn();
                $resp->closeCursor();

               
                if($total_datos_relacionados > 0){

                    $del_rel = "DELETE FROM $relacion WHERE $relacion_id = ?";
                    $resp = $con->prepare($del_rel);
                    $resp->execute([$id]);
                    $resp->closeCursor();

                   

                }

                $delete = "DELETE FROM $tabla WHERE id = ?";
                $resp = $con->prepare($delete);
                $resp->execute([$id]);
                $resp->closeCursor();

                $response = array(
                    "status" => true,
                    "mensj"=> "El item se elimino de forma correcta"
                );

                return $response;
            
        }

      

    }


}


?>