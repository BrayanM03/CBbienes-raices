<?php
    session_start();
 
       
     include "../database/conexion.php";
     date_default_timezone_set('America/Matamoros');
        $id_usuario = $_SESSION['id'];
        
        $consultar = "SELECT COUNT(*) FROM carrito_compra WHERE usuario_id  = ?";
        $resp = $con->prepare($consultar);
        $resp->execute([$id_usuario]);
        $total = $resp->fetchColumn();
        $resp->closeCursor();

       if($total>0){
        $response = array("status"=>true, "mensj"=>"Carrito listo para la venta");
       }else{
            $response = array("status"=>false, "mensj"=>"El carrito de esta vacio");
       }

       echo json_encode($response, JSON_UNESCAPED_UNICODE);



   

?>