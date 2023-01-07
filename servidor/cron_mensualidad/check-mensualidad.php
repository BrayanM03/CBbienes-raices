<?php
session_start();

    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');


$codigo = $_GET['codigo'];


function setEstatus($detalle_id, $con, $estatus){
    $updte = "UPDATE detalle_orden SET estatus = ? WHERE id = ?";
    $re = $con->prepare($updte);
    $re->execute([$estatus, $detalle_id]);
    $re->closeCursor();
}

if($codigo == 1697){

    $fecha_actual = date("Y-m-d");


    $select_count = "SELECT COUNT(*) FROM detalle_orden WHERE restante != 0";
    $res = $con->prepare($select_count);
    $res->execute();
    $total = $res->fetchColumn();
    $res->closeCursor();

    if($total > 0){

        $select = "SELECT * FROM detalle_orden WHERE restante != 0";
        $res = $con->prepare($select);
        $res->execute();
        
        while( $row = $res->fetch()){
            $detalle_id = $row["id"];
            $fecha_limite = date($row["fecha_vencimiento"]);

            if(strtotime($fecha_actual) >= strtotime($fecha_limite)){
                $data["ordenes_vencidas"][] = $row["fecha_vencimiento"];
                $data["ordenes_vencidas"]["estatus"] = "Vencida";

                setEstatus($detalle_id, $con, "Vencida"); 
            }else{
                $data["ordenes_vigentes"]["estatus"] = "Vigente";
                $data["ordenes_vigentes"][] = $row["fecha_vencimiento"]; 
                setEstatus($detalle_id, $con, "Vigente"); 

            }

            
        }

        $response = array('data' => $data, "mensaje" => "ordenes encontradas");
    }else{
        $response = array('data' => null, "mensaje" => "Sin ordenes encontradas");

    }


    echo json_encode($response, JSON_UNESCAPED_UNICODE);


}else{
    $response = array('data' => null, "mensaje" => "Codigo incorrecto");
    echo json_encode($response, JSON_UNESCAPED_UNICODE);

}

?>