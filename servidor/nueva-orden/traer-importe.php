<?php
  
function traerImporte($con){
    $contar = "SELECT COUNT(*) FROM detalle_preorden WHERE usuario_id = ?";
    $re = $con->prepare($contar);
    $re->execute([$_SESSION["id"]]);
    $count = $re->fetchColumn();
    
    if($count > 0) {
        
        $consultar = "SELECT * FROM detalle_preorden WHERE usuario_id = ?";
        $resp = $con->prepare($consultar);
        $resp->execute([$_SESSION["id"]]);
        $precio = 0;
        while ($row = $resp->fetch()) {
    
            $precio += $row["precio"];   
        }
    
        return $precio;
    
    }else {
        return 0.00;
    }
}





?>