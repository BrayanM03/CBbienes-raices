<?php

// Incluimos el archivo de conexión a la base de datos
session_start();
include '../database/conexion.php';
date_default_timezone_set('America/Matamoros');

 
$abono_id = intval($_POST["abono_id"]);

if(is_numeric($abono_id) && $abono_id !== 0){
    
    $usuario_id = $_SESSION["id"];

    $tipo = "Abono";

      

    $contar = "SELECT COUNT(*) FROM abonos WHERE id = ?";
    $res = $con->prepare($contar);
    $res->execute([$abono_id]);
    $total_abonos = $res->fetchColumn();
    $res->closeCursor();

    if($total_abonos > 0){

        $select = "SELECT * FROM abonos WHERE id = ?";
        $re = $con->prepare($select);
        $re->execute([$abono_id]);
        
        while($row = $re->fetch()){
            $tipo_abono = $row["tipo"];
            $total_abono = $row["total"];
            $detalle_id = $row["detalle_id"];
        }

        $re->closeCursor();

        $contar_detalle = "SELECT COUNT(*) FROM detalle_orden WHERE id = ?";
            $res = $con->prepare($contar_detalle);
            $res->execute([$detalle_id]);
            $total_detalle = $res->fetchColumn();
            $res->closeCursor();


            if($total_detalle > 0){

                $traer = "SELECT * FROM detalle_orden WHERE id = ?";
                $rec = $con->prepare($traer);
                $rec->execute([$detalle_id]);

                while($fila = $rec->fetch()){

                    $restante_actual = $fila["restante"];
                    $pagado_actual = $fila["pagado"];
                    $orden_id = $fila["orden_id"];
                    $precio = $fila["precio"];
                    $mensualidad = $fila["mensualidad"];
                    $fecha_vencimiento_actual = $fila["fecha_vencimiento"]; 
                }


            //$no_abono = intval($total_abonos) - 1;
            $nuevo_restante = floatval($restante_actual) + floatval($total_abono);
            $nuevo_pagado = floatval($pagado_actual) - floatval($total_abono);

            $updt = "UPDATE detalle_orden SET pagado = ?, restante = ? WHERE id = ?";
            $ree = $con->prepare($updt);
            $ree->execute([$nuevo_pagado, $nuevo_restante, $detalle_id]);
            $ree->closeCursor();

            $del = "DELETE FROM abonos WHERE id = ?";
            $ree = $con->prepare($del);
            $ree->execute([$abono_id]);
            $ree->closeCursor();

             //contamos si hay abonos relacionado con el detalle_id
             $contar = "SELECT COUNT(*) FROM abonos WHERE orden_id = ? AND detalle_id = ?";
             $res = $con->prepare($contar);
             $res->execute([$orden_id, $detalle_id]);
             $total_abonos = $res->fetchColumn();
             $res->closeCursor();
 
             
             //En caso de que si ahora recorremos los abonos
             if($total_abonos > 0){
 
                     //contamos si hay abonos relacionado con el detalle_id
             $sel_abo = "SELECT * FROM abonos WHERE orden_id = ? AND detalle_id = ? ORDER BY fecha ASC";
             $ress = $con->prepare($sel_abo); 
             $ress->execute([$orden_id, $detalle_id]);
             
             while($fil = $ress->fetch()){
                 $tipo_abono_arr = $fil['tipo'];
            

                    //Seteando nueva fecha vencimiento
            if($tipo_abono_arr == "Abono" && floatval($fil['total']) >= floatval($mensualidad) ){
                
                $fecha_ultima = $fil["fecha"];
                $date = new DateTime($fecha_ultima);
                $date->modify("+1 month");
                $date->setDate($date->format("Y"), $date->format("m"), 5);
                $fecha_vencimiento = $date->format("Y-m-d");

                if(strtotime($fecha_vencimiento_actual) >= $fecha_vencimiento){
                    $estatus_nuevo = "Vencida";
                }else{
                    $estatus_nuevo = "Vigente";

                }


                $updte = "UPDATE detalle_orden SET fecha_vencimiento =? , estatus = ? WHERE id = ?";
                $re = $con->prepare($updte);
                $re->execute([$fecha_vencimiento,  $estatus_nuevo, $detalle_id]);
                $re->closeCursor();
            }else{

                $fecha_orden_actual = date($fil["fecha"]);
                $date = new DateTime($fecha_orden_actual);
                $date->modify("+1 month");
                $date->setDate($date->format("Y"), $date->format("m"), 5);
                $fecha_vencimiento = $date->format("Y-m-d");

                if(strtotime(date("Y-m-d")) >= strtotime($fecha_vencimiento)){
                    $estatus_nuevo = "Vencida";
                }else{
                    $estatus_nuevo = "Vigente";

                }

                $updte = "UPDATE detalle_orden SET fecha_vencimiento =? , estatus = ? WHERE id = ?";
                $re = $con->prepare($updte);
                $re->execute([$fecha_vencimiento,  $estatus_nuevo, $detalle_id]);
                $re->closeCursor();
            }

    
 
             }
             $ress->closeCursor();
 
             }        
             

            



            $response = array("estatus"=> true,
            "tipo"=>  $tipo_abono_arr . ' -- ' . $total_abonos,
            "dat"=>"$pagado_actual - $restante_actual",
            "mensaje" => "Abono eliminado", "post"=> $_POST);
       
            }else{

             $response = array("estatus"=> false, "mensaje" => "","post"=> $_POST);

            }

            



    }else{
    $response = array("estatus"=> false, "mensaje" => "No hay abonos con este id: $abono_id","post"=> $_POST);

    }
    
    
   
}else{
    $response = array("estatus"=> false, "mensaje" => "El id de la orden o del detalle no son numeros o el valor mandado es un 0","post"=> $_POST);

}



echo json_encode($response, JSON_UNESCAPED_UNICODE);

?>