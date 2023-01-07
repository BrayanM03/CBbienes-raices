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
    $contrato = floatval($_POST["contrato"]);
    $norte = $_POST["norte"];
    $sur = $_POST["sur"];
    $este = $_POST["este"];
    $oeste = $_POST["oeste"];
    $enganche_1 = floatval($_POST["enganche_1"]);
    $enganche_2 = floatval($_POST["enganche_2"]);
    $enganche_3 = floatval($_POST["enganche_3"]);
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

            $consultar2 = "SELECT codigo, estatus FROM terrenos WHERE proyecto = ? 
            AND manzana = ?
            AND lote = ?";
            $resp = $con->prepare($consultar2);
            $resp->execute([$proyecto,  $manzana, $lote]);
            while ($fil = $resp->fetch()) {
                $codigo_terreno = $fil["codigo"];
                $terreno_disp = $fil["estatus"];
            }
           
            $resp->closeCursor();

            if($terreno_disp !== "Disponible"){

            $response = array("status"=>false, "post"=>$_POST, "message"=> "Terreno no disponible, estatus: " . $terreno_disp, "id"=>$last_id);


            }else{

                $sel = "INSERT INTO detalle_preorden(id, 
                                                     codigo,
                                                     id_proyecto,
                                                     proyecto,
                                                     manzana, 
                                                     lote, 
                                                     precio,
                                                     contrato,
                                                     plazo,
                                                     enganche_1,
                                                     enganche_2,
                                                     enganche_3,
                                                     mensualidad,
                                                     norte, sur, este, oeste,
                                                     usuario_id) VALUES(null, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

            $resps = $con->prepare($sel);
            $resps->execute([$codigo_terreno, $proyecto, $nombre_proyecto, $manzana, $lote, $precio, $contrato, $plazo, $enganche_1, $enganche_2, $enganche_3,
             $mensualidad, $norte, $sur, $este, $oeste, $usuario_id]);
            $resps->closeCursor();
    
            $response = array("status"=>true, "post"=>$_POST, "message"=> "Terreno agregado correctamente");
    

            }
    
            
        }else{

            $response = array("status"=>false, "message"=> "Este terreno ya esta en la tabla");
        }
    
        
       
   
 
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);

}



?>