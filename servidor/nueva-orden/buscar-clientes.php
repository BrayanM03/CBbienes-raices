<?php

    if($_POST){
       
     include "../database/conexion.php";
     date_default_timezone_set('America/Matamoros');

        $input = '%'.$_POST["input"].'%';
        $consultar = "SELECT COUNT(*) FROM clientes WHERE nombre LIKE ? OR rfc = ?";
        $resp = $con->prepare($consultar);
        $resp->execute([$input, $input]);
        $total = $resp->fetchColumn();
        $resp->closeCursor();

       if($total>0){
        $input = '%'.$_POST["input"].'%';
        $consultar = "SELECT * FROM clientes WHERE nombre LIKE ? OR rfc = ?";
        $resp = $con->prepare($consultar);
        $resp->execute([$input, $input]);
        while ($row = $resp->fetch()) {

            $id_cliente = $row['id'];

            $select_count = "SELECT COUNT(*) FROM detalle_direccion WHERE id_usuario = ?";
            $re = $con->prepare($select_count);
            $re->execute([$id_cliente]);
            $total_dir = $re->fetchColumn();
            $re->closeCursor();

            //trayendo direccion
            if($total_dir > 0) {

                $select_count = "SELECT * FROM detalle_direccion WHERE id_usuario = ?";
                $rex = $con->prepare($select_count);
                $rex->execute([$id_cliente]);
                while ( $fila = $rex->fetch()){
                    $row["direccion"][] = $fila;
                }
                $rex->closeCursor();
            }else{
                $row["direccion"] = false;
            }

            //trayendo correo
            $select_count_correo = "SELECT COUNT(*) FROM detalle_correo WHERE id_usuario = ?";
            $rez = $con->prepare($select_count_correo);
            $rez->execute([$id_cliente]);
            $total_corr = $rez->fetchColumn();
            $rez->closeCursor();

            if($total_corr > 0) {

                $select_count_c = "SELECT * FROM detalle_correo WHERE id_usuario = ?";
                $rexz = $con->prepare($select_count_c);
                $rexz->execute([$id_cliente]);
                while ( $filaz = $rexz->fetch()){
                    $row["correos"][] = $filaz;
                }
                $rexz->closeCursor();
            }else{
                $row["correos"] = false;
            }
             //trayendo telefono

            $data[] = $row;
        }
        $resp->closeCursor();

        
       }else{
        $data[] = array("id"=>false, "mensj"=>"No se encontarón coincidencias");
       }

       echo json_encode($data, JSON_UNESCAPED_UNICODE);

    }

   

?>