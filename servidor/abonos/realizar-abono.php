<?php

// Incluimos el archivo de conexión a la base de datos
session_start();
date_default_timezone_set('America/Matamoros');

include '../database/conexion.php'; 

$orden_id = intval($_POST["orden_id"]);
$detalle_id = intval($_POST["detalle_id"]);
$hora = date("h:i a");

if(is_numeric($orden_id) && is_numeric($detalle_id) && $orden_id !== 0 && $detalle_id !== 0){

    //variables recibidas
    $monto_abono = $_POST["monto_abono"];
    $etiqueta_abono = $_POST["etiqueta_abono"];
    $tipo_recibido = $_POST["tipo_abono"];
    $fecha_abono = $_POST["fecha_abono"]; 
    $usuario_id = $_SESSION["id"];
    $estatus = "Vigente";
    $tipo = "Abono";

    

    
   

    //Traemos el registro del terrno en la orden coincidente al id
    $select = "SELECT * FROM detalle_orden WHERE id = ?";
    $re = $con->prepare($select);
    $re->execute([$detalle_id]);
    
    //Recorremos esos datos, debe de ser solo 1
    while($row = $re->fetch()){
    
        $restante = $row["restante"];
        $pagado = $row["pagado"];
        $precio = $row["precio"];
        $mensualidad = $row["mensualidad"];
      
       
        
    }
    $re->closeCursor();
    
    $no_abono = intval($total_abonos) + 1;
    $nuevo_restante = floatval($restante) - floatval($monto_abono);
    $nuevo_pagado = floatval($pagado) + floatval($monto_abono);
    $saldo_adelantado = floatval($monto_abono) - floatval($mensualidad);

    if($nuevo_restante < 0){
        $response = array("estatus"=> false, "mensaje" => "La cantidad supera el precio del terreno","post"=> $_POST);

    }else{

        $insert = $con->prepare("INSERT INTO abonos(id, no_abono, fecha, total, restante,
        total_abonado, etiqueta, orden_id, detalle_id, usuario_id, tipo, hora, saldo_adelantado)
        VALUES(null, ?,?,?,?,?,?,?,?,?,?,?,?)");
        $insert->execute([$no_abono, $fecha_abono, $monto_abono,
        $nuevo_restante, $nuevo_pagado, $etiqueta_abono, $orden_id, $detalle_id, $usuario_id, $tipo, $hora, $saldo_adelantado]);
        $insert->closeCursor();
   
        $updt = "UPDATE detalle_orden SET pagado = ?, restante = ? WHERE id = ?";
               $ree = $con->prepare($updt);
               $ree->execute([$nuevo_pagado, $nuevo_restante, $detalle_id]);
               $ree->closeCursor();



               if(floatval($monto_abono) >= floatval($mensualidad)){

                    //contamos si hay abonos relacionado con el detalle_id
            $contar = "SELECT COUNT(*) FROM abonos WHERE orden_id = ? AND detalle_id = ? AND tipo = ?";
            $res = $con->prepare($contar);
            $res->execute([$orden_id, $detalle_id, $tipo]);
            $total_abonos = $res->fetchColumn();
            $res->closeCursor();

            
            //En caso de que si ahora recorremos los abonos
            if($total_abonos > 0){

                    //contamos si hay abonos relacionado con el detalle_id
            $sel_abo = "SELECT * FROM abonos WHERE orden_id = ? AND detalle_id = ? AND tipo = ? ORDER BY fecha ASC";
            $ress = $con->prepare($sel_abo); 
            $ress->execute([$orden_id, $detalle_id, $tipo]);
            
            while($fil = $ress->fetch()){
                $tipo_abono = $fil['tipo'];
                if($tipo_abono == "Abono"){
               
               //Seteando nueva fecha vencimiento
                $fecha_ultima = $fil["fecha"];
                $date = new DateTime($fecha_ultima);
                $date->modify("+1 month");
                $date->setDate($date->format("Y"), $date->format("m"), 5);
                $fecha_vencimiento = $date->format("Y-m-d");
 
            $updte = "UPDATE detalle_orden SET fecha_vencimiento =? , estatus = ? WHERE id = ?";
            $re = $con->prepare($updte);
            $re->execute([$fecha_vencimiento, $estatus, $detalle_id]);
            $re->closeCursor();
    
                }

            }
            $ress->closeCursor();

            }  

               }
                  
       
       $response = array("estatus"=> true,"tip"=> $tipo_recibido, "mensaje" => "Abono realizado", "post"=> $_POST,
        "ides"=> "$detalle_id -- $orden_id -- $no_abono -- $nuevo_restante -- $nuevo_pagado- $usuario_id -- $");
   
    }
    
    
}else{
    $response = array("estatus"=> false, "mensaje" => "El id de la orden o del detalle no son numeros o el valor mandado es un 0","post"=> $_POST);

}



echo json_encode($response, JSON_UNESCAPED_UNICODE);

?>