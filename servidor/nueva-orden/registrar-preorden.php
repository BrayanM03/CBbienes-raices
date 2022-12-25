<?php
session_start();
if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $id_sesion = $_SESSION["id"];
    $proyecto = intval($_POST['proyecto']);
    $manzana = intval($_POST["manzana"]);
    $lote = intval($_POST["lote"]);
    $precio = floatval($_POST["precio"]);
    $norte = $_POST["norte"];
    $sur = $_POST["sur"];
    $este = $_POST["este"];
    $oeste = $_POST["oeste"];
    $enganche = floatval($_POST["enganche"]);
    $plazo = intval($_POST["plazo"]);
    $mensualidad = floatval($_POST["mensualidad"]);
    $usuario_id = intval($_SESSION["id"]);

   
        $fecha_ingreso = date("Y-m-d");

        $consulta = "SELECT COUNT(*) FROM detalle_preorden WHERE id_proyecto = ? 
                                                             AND manzana = ?
                                                             AND lote = ?";
        $resp = $con->prepare($consulta);
        $resp->execute([$proyecto, $manzana, $lote]);
        $total = $resp->fetchColumn(); 
        $resp->closeCursor();
    
        
    
        if($total == 0){

            $consultar = "SELECT nombre FROM proyectos WHERE id  = ?";
            $resp = $con->prepare($consultar);
            $resp->execute([$proyecto]);
            $nombre_proyecto = $resp->fetchColumn();
            $resp->closeCursor();

            $consultar2 = "SELECT estatus FROM terrenos WHERE proyecto = ? 
            AND manzana = ?
            AND lote = ?";
            $resp = $con->prepare($consultar2);
            $resp->execute([$proyecto,  $manzana, $lote]);
            $terreno_disp = $resp->fetchColumn();
            $resp->closeCursor();

            if($terreno_disp !== "Disponible"){

            $response = array("status"=>false, "post"=>$_POST, "message"=> "Terreno no disponible, estatus: " . $terreno_disp, "id"=>$last_id);


            }else{

                $sel = "INSERT INTO detalle_preorden(id, 
                                                     id_proyecto,
                                                     proyecto,
                                                     manzana, 
                                                     lote, 
                                                     precio,
                                                     enganche, 
                                                     plazo,
                                                     mensualidad,
                                                     norte, sur, este, oeste,
                                                     usuario_id) VALUES(null, ?,?,?,?,?,?,?,?,?,?,?,?,?)";

            $resps = $con->prepare($sel);
            $resps->execute([$proyecto, $nombre_proyecto, $manzana, $lote, $precio, $enganche, 
            $plazo, $mensualidad, $norte, $sur, $este, $oeste, $usuario_id]);
            $resps->closeCursor();
    
            $response = array("status"=>true, "post"=>$_POST, "message"=> "Terreno agregado correctamente", "id"=>$last_id);
    

            }
    
            
        }else{

            $response = array("status"=>false, "message"=> "Este terreno ya esta en la tabla");
        }
    
        
       
   
 
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);

}



?>