<?php
if ($_POST) {
    session_start();
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $codigo = $_POST["codigo"];
    $manzana = $_POST["manzana"];
    $lote = $_POST["lote"];
    $precio = $_POST["precio"];
    $norte = $_POST["norte"];
    $sur = $_POST["sur"];
    $este = $_POST["este"];
    $oeste = $_POST["oeste"];
    $usuario_id = $_SESSION["id"];
    $proyecto = 1;

    $estatus = "Disponible";
    $fecha_ingreso = date("Y-m-d");

    $select = "SELECT COUNT(*) FROM terrenos WHERE manzana = ? AND lote = ? AND proyecto = ?";
    $re = $con->prepare($select);
    $re->execute([$manzana, $lote, $proyecto]);
    $total = $re->fetchColumn();

    if($total ==0){
        $insercion = "INSERT INTO terrenos(id, 
                codigo, 
                manzana, 
                lote, 
                precio,
                norte,
                sur,
                este,
                oeste,
                estatus,
                proyecto) VALUES(null,?,?,?,?,?,?,?,?,?,?)";
        $resp = $con->prepare($insercion);

        $resp->execute([$codigo, $manzana, $lote, $precio, $norte, $sur, $este, $oeste, $estatus, $proyecto]);

        $resp->closeCursor();

        $last_id = $con->lastInsertId(); 

        $response = array("status"=>true, "message"=> "Producto agregado correctamente", "id"=>$last_id, "data"=>$_POST);
    }else{

        $response = array("status"=>false, "message"=> "Este terreno ya fue agregado", "id"=>$last_id, "data"=>$_POST);
    }

   

    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);

}



?>