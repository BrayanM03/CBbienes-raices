<?php
session_start();

    include "../database/conexion.php";
    date_default_timezone_set('America/Matamoros');


    $cliente_id = $_POST['cliente'];
    $fecha = $_POST['fecha'];

    //Seteando nueva fecha vencimiento
    $date = new DateTime($fecha);
    $date->modify("+1 month");
    $date->setDate($date->format("Y"), $date->format("m"), 10);
    $fecha_vecimiento = $date->format("Y-m-d");

    //Nuevo estatus
    $estatus_detalle = "Vigente";


    $hora = date('h:i a');
    $usuario_id = $_SESSION["id"];
    $usuario_nombre = $_SESSION["nombre"] . " ". $_SESSION["apellido"];
    $comentario = $_POST['comentario'];
    $direccion_cliente = $_POST['direccion_cliente'];
    $correo_cliente = $_POST['correo_cliente'];
    $telefono_cliente = $_POST['telefono_cliente'];
    $estatus_nuevo = "Pagando";

    $datos_clientes =  obtenerDatosCliente($con, $cliente_id, $direccion_cliente, $correo_cliente);
    if($datos_clientes == false){
        $cliente_name = 0;
    }else{
        $cliente_name = $datos_clientes["nombre"];
        $cliente_correo = $datos_clientes["correo"];
        $cliente_direccion = $datos_clientes["direccion"];
    }


    $insertar = "INSERT INTO ordenes(id, 
                                     fecha, 
                                     hora, 
                                     id_cliente, 
                                     cliente_etiqueta, 
                                     telefono, 
                                     direccion, 
                                     correo,
                                     usuario_nombre, 
                                     usuario_id,
                                     comentario)
                             VALUES(null,?,?,?,?,?,?,?,?,?,?)";
    $resp = $con->prepare($insertar);
    $resp->execute([$fecha, 
                    $hora, 
                    $cliente_id, 
                    $cliente_name, 
                    $telefono_cliente, 
                    $cliente_direccion, 
                    $cliente_correo, 
                    $usuario_nombre, 
                    $usuario_id,
                    $comentario]); 
    $resp->closeCursor();
    
    $last_id = $con->lastInsertId();

    $comprobar = "SELECT COUNT(*) FROM detalle_preorden WHERE usuario_id = ?";
    $re = $con->prepare($comprobar);
    $re->execute([$usuario_id]);
    $total = $re->fetchColumn();
    $re->closeCursor();

if ($total > 0) {
    $traer = "SELECT * FROM detalle_preorden WHERE usuario_id = ?";
    $res = $con->prepare($traer);
    $res->execute([$usuario_id]);

    $suma_importe = 0;
    while ($row = $res->fetch()) {

        $id = $row['id'];
        $codigo = $row['codigo'];
        $id_proyecto = $row['id_proyecto'];
        $proyecto = $row["proyecto"];
        $manzana = $row['manzana'];
        $lote = $row["lote"];
        $precio = floatval($row['precio']);
        $enganche_1 = floatval($row['enganche_1']);
        $enganche_2 = floatval($row["enganche_2"]);
        $enganche_3 = floatval($row["enganche_3"]); 
        $contrato = floatval($row['contrato']);
        $plazo = $row["plazo"];
        $mensualidad = $row["mensualidad"];
        $norte = $row["norte"];
        $sur = $row["sur"];
        $este = $row["este"];
        $oeste = $row["oeste"];
        $usuario_id = $row['usuario_id'];
        $area = $row["area"];
        $abonos = 0;

        $no_abono = 0;
        $total_abonado = $enganche_1 + $enganche_2 + $enganche_3;
        $restante = $precio - $total_abonado;

        $insertar_detalle = "INSERT INTO detalle_orden (id, 
                                                            codigo, 
                                                            id_proyecto,
                                                            proyecto,
                                                            manzana, 
                                                            lote, 
                                                            precio, 
                                                            abonos, 
                                                            plazo, 
                                                            mensualidad,
                                                            norte,
                                                            sur,
                                                            este,
                                                            oeste,
                                                            usuario_id,
                                                            orden_id,
                                                            pagado,
                                                            restante,
                                                            contrato,
                                                            fecha_vencimiento,
                                                            estatus,
                                                            area)
                                VALUES(null, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $respu = $con->prepare($insertar_detalle);
        $respu->execute([$codigo, $id_proyecto, $proyecto, $manzana, $lote, $precio,
                         $abonos, $plazo, $mensualidad, $norte, $sur, $este, $oeste, $usuario_id, $last_id,
                        $total_abonado, $restante, $contrato, $fecha_vecimiento, $estatus_detalle, $area]);
        $respu->closeCursor();
        $last_id_detalle_orden = $con->lastInsertId();
        $suma_importe += floatval($row["precio"]);

        //Actualiando
        $upt = "UPDATE terrenos SET estatus = ? WHERE proyecto = ? AND manzana = ? AND lote =?";
        $upt = $con->prepare($upt);
        $upt->execute([$estatus_nuevo, $id_proyecto, $manzana, $lote]);


        //Agrenado abonos
        if ($total_abonado > 0) {

            $restante_1 = $precio - $enganche_1;
            $restante_2 = $restante_1 - $enganche_2;
            $restante_3 = $restante_2 - $enganche_3;
            $total_abonado_1 = $enganche_1;
            $total_abonado_2 = $total_abonado_1 +  $enganche_2;
            $total_abonado_3 = $total_abonado_2 +  $enganche_3;
           

            $arreglo_enganche = array(
                array("fecha"=> $fecha, "total"=> $enganche_1, "restante"=> $restante_1, "total_abonado"=> $total_abonado_1, "etiqueta"=> "Enganche 1", "tipo" => "Enganche"),
                array("fecha"=> $fecha, "total"=> $enganche_2, "restante"=> $restante_2, "total_abonado"=> $total_abonado_2, "etiqueta"=> "Enganche 2", "tipo" => "Enganche"),
                array("fecha"=> $fecha, "total"=> $enganche_3, "restante"=> $restante_3, "total_abonado"=> $total_abonado_3, "etiqueta"=> "Enganche 3", "tipo" => "Enganche"),
            );

            foreach ($arreglo_enganche as $key => $value) {

            
                if ($value["total"] > 0) {

                    $insertar_abono = "INSERT INTO abonos (id, 
                                                            no_abono, 
                                                            fecha,
                                                            total,
                                                            restante, 
                                                            total_abonado, 
                                                            etiqueta, 
                                                            orden_id, 
                                                            detalle_id, 
                                                            usuario_id,
                                                            tipo,
                                                            hora
                                                            )
                                VALUES(null, ?,?,?,?,?,?,?,?,?,?,?)";
                    $respux = $con->prepare($insertar_abono);
                    $respux->execute([$no_abono, $value["fecha"], $value["total"], $value["restante"], 
                    $value["total_abonado"], $value["etiqueta"],$last_id, $last_id_detalle_orden, $usuario_id, $value["tipo"],$hora]);
                    $respux->closeCursor();
                }
            }
        }

        }

        $res->closeCursor();


        $select_d = "SELECT * FROM detalle_orden WHERE orden_id = ?";
        $respon = $con->prepare($select_d);
        $respon->execute([$last_id]);
        while ( $rowx = $respon->fetch()){
            $array_detalle[] = $rowx;
        }


        $response = array("estatus" => true, "post"=> $_POST, "mensaje" => "Orden realizado", "datos_cliente"=> $datos_clientes, "id_orden" => $last_id, "array_detalle"=>$array_detalle);

        $truncate = "DELETE FROM detalle_preorden WHERE usuario_id = ?";
        $rrsp = $con->prepare($truncate);
        $rrsp->execute([$usuario_id]);
        $rrsp->closeCursor();


    }else{
        $array_detalle = array();
        $response = array("estatus" => false, "post"=> $_POST, "mensaje" => "Orden no realizada, no hay datos en la tabla preorden", "datos_cliente"=> $datos_clientes);

    }
        echo json_encode($response, JSON_UNESCAPED_UNICODE);





function obtenerDatosCliente($con, $cliente_id, $direccion_id, $correo_id){
    $queryCount = "SELECT count(*) FROM clientes WHERE id = ?";
    $resp = $con->prepare($queryCount);
    $resp->execute([$cliente_id]);
    $total = $resp->fetchColumn();

    if($total > 0){
        $selectStore = "SELECT * FROM clientes WHERE id = ?";
        $resp = $con->prepare($selectStore);
        $resp->execute([$cliente_id]);
        while ($row = $resp->fetch()) {

            if($direccion_id !== null || $direccion_id !== ""){
                $selectc = "SELECT COUNT(*) FROM detalle_direccion WHERE id = ?";
                $r = $con->prepare($selectc);
                $r->execute([$direccion_id]);
                $total_dire = $r->fetchColumn();
                $r->closeCursor();

                if($total_dire > 0){
                    $selectcm = "SELECT * FROM detalle_direccion WHERE id = ?";
                    $rv = $con->prepare($selectcm);
                    $rv->execute([$direccion_id]);
                   

                    while( $fil = $rv->fetch()){
                        $calle = ($fil['calle'] == 'null') ? '' : $fil['calle'];
                        $colonia = ($fil['colonia'] == 'null') ? '' : $fil['colonia'];
                        $numero_int = ($fil['numero_int'] == 'null') ? '' : 'interior '.$fil['numero_int'];
                        $numero_ext = ($fil['numero_ext'] == 'null') ? '' :  'numero '.$fil['numero_ext'];
                        $cp = ($fil['cp'] == 'null') ? '' : $fil['cp'];
                        $ciudad = ($fil['ciudad'] == 'null') ? '' : $fil['ciudad'];
                        $municipio = ($fil['municipio'] == 'null') ? '' : $fil['municipio'];
                        $estado = ($fil['estado'] == 'null') ? '' : $fil['estado'];
                        $pais = ($fil['pais'] == 'null') ? '' : $fil['pais'];
                        $direccion = "$calle $colonia $numero_ext $numero_int  $cp $municipio $estado $pais";

                    }
                    $rv->closeCursor();
                    $row["direccion"] = $direccion;
                }else{
                    $row["direccion"] = "Sin direccion";
                }
               
            }else{
                $row["direccion"] = "Sin direccion";
            }


            if($correo_id !== "null"){
                $selectcorr = "SELECT COUNT(*) FROM detalle_correo WHERE id = ?";
                $rz = $con->prepare($selectcorr);
                $rz->execute([$correo_id]);
                $total_corre = $rz->fetchColumn();
                

                if($total_corre > 0){
                    $selectco = "SELECT * FROM detalle_correo WHERE id = ?";
                    $rvz = $con->prepare($selectco);
                    $rvz->execute([$correo_id]);
               

                    while( $filaa = $rvz->fetch()){
                        $correo = $filaa["correo"];
                    }
                    $row["correo"] = $correo;
                }else{
                    $row["correo"] = "Sin correo";
                }
                $rz->closeCursor();
               
            }else{
                $row["correo"] = "Sin correo";

            }


            
          
          
            $data = $row;
        }
        return $data;
    }else{
        return false;
    }
}


?>