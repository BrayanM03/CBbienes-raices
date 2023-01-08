<?php

if ($_POST) {
    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');

    $id_terreno = $_POST['id_terreno'];
    $codigo = $_POST["codigo"];
    $proyecto = $_POST["proyecto"];
    $manzana = $_POST["manzana"];
    $lote = $_POST["lote"];
    $precio = $_POST["precio"];
    $norte = $_POST["norte"];
    $sur = $_POST["sur"];
    $este = $_POST["este"];
    $oeste = $_POST["oeste"];

    $consultar = $con->prepare("SELECT COUNT(*) FROM terrenos WHERE proyecto = ? AND manzana =? AND lote = ? AND id != ?");
    $consultar->execute([$proyecto, $manzana, $lote, $id_terreno]);
    $total_terrenos = $consultar->fetchColumn();
    $consultar->closeCursor();

    if ($total_terrenos == 0) {
        $query = "UPDATE terrenos SET codigo = ?,
    manzana = ?,
    lote = ?,
    precio =?,
    norte =?,
    sur=?,
    este=?,
    oeste=?,
    proyecto = ?
    WHERE id =?";

        $resp = $con->prepare($query);
        $resp->bindParam(1, $codigo);
        $resp->bindParam(2, $manzana);
        $resp->bindParam(3, $lote);
        $resp->bindParam(4, $precio);
        $resp->bindParam(5, $norte);
        $resp->bindParam(6, $sur);
        $resp->bindParam(7, $este);
        $resp->bindParam(8, $oeste);
        $resp->bindParam(9, $proyecto);
        $resp->bindParam(10, $id_terreno);
        $resp->execute();
        $resp->closeCursor();

        $response = array("estatus"=> true, "mensaje"=> "Actualizado correctamente", "post"=>$_POST);
    } else {
        $response = array("estatus"=> false, "mensaje"=> "Ya hay un terreno con ese lote");
    }







    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
}
