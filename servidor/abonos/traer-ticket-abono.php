<?php

// Incluimos el archivo de conexión a la base de datos
include '../database/conexion.php';

$_post = json_decode(file_get_contents('php://input'),true);

$folio = $_post['abono_id'];

$select = "SELECT COUNT(*) FROM abonos WHERE id =?";
$re = $con->prepare($select);
$re->execute([$folio]);
$total = $re->fetchColumn();
$re->closeCursor();

if ($total > 0) {
    $select = "SELECT * FROM abonos WHERE id =?";
    $re = $con->prepare($select);
    $re->execute([$folio]);
    while ($rows = $re->fetch()) {
         $orden_id = $rows["orden_id"];
         $detalle_id = $rows["detalle_id"];

         $select_c = "SELECT COUNT(*) FROM ordenes WHERE id =?";
         $re = $con->prepare($select_c);
         $re->execute([$orden_id]);
         $total_ordenes = $re->fetchColumn();
         $re->closeCursor();

         if($total_ordenes > 0) {
            $select = "SELECT * FROM ordenes WHERE id =?";
            $rez = $con->prepare($select);
            $rez->execute([$orden_id]);
            while($rowz = $rez->fetch()){
                $cliente = $rowz["cliente_etiqueta"];
                $data["cliente"] = $cliente;
            }
            $rez->closeCursor();
         }

         $select_c = "SELECT COUNT(*) FROM detalle_orden WHERE id =?";
         $re = $con->prepare($select_c);
         $re->execute([$detalle_id]);
         $total_ordenes = $re->fetchColumn();
         $re->closeCursor();

         if($total_ordenes > 0) {
            $select = "SELECT * FROM detalle_orden WHERE id =?";
            $rexz = $con->prepare($select);
            $rexz->execute([$detalle_id]);
            while($rowxz = $rexz->fetch()){
                $pagado = $rowxz["pagado"];
                $saldo = $rowxz["restante"];
                $proyecto = $rowxz["proyecto"];
                $manzana = $rowxz["manzana"];
                $lote = $rowxz["lote"];
                $precio = $rowxz["precio"];

                $data["pagado"] = $pagado;
                $data["saldo"] = $saldo;
                $data["proyecto"] = $proyecto;
                $data["manzana"] = $manzana;
                $data["lote"] = $lote;
                $data["precio"] = $precio;
            }
            $rexz->closeCursor();
         }

        /*$datos_cliente = traerDatoCliente($id_cliente, $con);
        $rows["datos_cliente"] = $datos_cliente; */

        $data["datos_abono"] = $rows;
    }
    $re->closeCursor();

    $response =  array("estatus" => true, "mensaje"=> "Datos encontrados", "datos" => $data);
}else{
    $response =  array("estatus" => false, "mensaje"=> "No hay datos encontrados","datos" => null);

}

echo json_encode($response, JSON_UNESCAPED_UNICODE);



?>