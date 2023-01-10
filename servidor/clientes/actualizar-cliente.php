<?php


    session_start();
    include '../database/conexion.php';
    
     date_default_timezone_set("America/Matamoros");

    if (!$con) {
        echo "maaaaal";
    }

    if (!isset($_SESSION['user'])) {
    header("Location:../../static/login.php"); 
    }

   $arrResultado=array();


   $id_cliente = $_POST['id_cliente'];
   $nombre = $_POST["razon_social"];
   $telefono = $_POST["telefono"];
   $rfc = $_POST["rfc"];
   $contacto = $_POST["contacto"];
   $estaus = "Activo";
   $fecha = date("Y-m-d"); 
   $estado_civil = $_POST["estado_civil"];
   $ocupacion = $_POST["ocupacion"];
   $lugar_nacimiento = $_POST["lugar_nacimiento"];
   $fecha_nacimiento = $_POST["fecha_nacimiento"];
   $direcciones = json_decode($_POST["direcciones"], true);
   $correos = json_decode($_POST["correos"], true);
   $cuentas = json_decode($_POST["cuentas"], true);
   $trash_flag = "No borrar";

   function setearTrashFlag($id_cliente, $con, $tabla){
    $trash_flag = "borrar";
    $actualizar_direccion = "UPDATE $tabla SET trash_flag = ? WHERE id_usuario = ?";

    $res = $con->prepare($actualizar_direccion);
    $res->bindParam(1,$trash_flag);
    $res->bindParam(2,$id_cliente);
    $res->execute();
    $res->closeCursor();
   }

   //Setando banderas de borrado
   setearTrashFlag($id_cliente, $con, "detalle_direccion");
   setearTrashFlag($id_cliente, $con, "detalle_correo");
   setearTrashFlag($id_cliente, $con, "detalle_cuenta_bancaria");

   function ingresarDireccion($id_cliente, $con, $element, $trash_flag) {

    $calle_i = $element["calle"] ? $element["calle"] : null;
    $colonia_i = $element["colonia"] ? $element["colonia"] : null;
    $interior_i = $element["interior"] ? $element["interior"] : null;
    $exterior_i = $element["exterior"] ? $element["exterior"] : null;
    $cp_i = $element["cp"] ? $element["cp"] : null;
    $ciudad_i = $element["ciudad"] ? $element["ciudad"] : null;
    $municipio_i = $element["municipio"] ? $element["municipio"] : null;
    $estado_i = $element["estado"] ? $element["estado"] : null;
    $pais_i = $element["pais"] ? $element["pais"] : null;

    $insert_detail_customer = "INSERT INTO detalle_direccion(id, 
                                                             calle, 
                                                             colonia, 
                                                             numero_int, 
                                                             numero_ext, 
                                                             cp, 
                                                             ciudad, 
                                                             municipio, 
                                                             estado, 
                                                             pais, 
                                                             id_usuario, 
                                                             trash_flag) VALUES(null,?,?,?,?,?,?,?,?,?,?,?)";
            $result = $con->prepare($insert_detail_customer);
            $result->bindParam(1, $calle_i);
            $result->bindParam(2, $colonia_i);
            $result->bindParam(3, $interior_i);
            $result->bindParam(4, $exterior_i);
            $result->bindParam(5, $cp_i);
            $result->bindParam(6, $ciudad_i);
            $result->bindParam(7, $municipio_i);
            $result->bindParam(8, $estado_i);
            $result->bindParam(9, $pais_i);
            $result->bindParam(10,$id_cliente);
            $result->bindParam(11,$trash_flag);

            $result->execute();
            $result->closeCursor();

}

  function ingresarCorreo($id_cliente, $con, $element, $trash_flag){
    $insert_detail_customer = "INSERT INTO detalle_correo(id, etiqueta, correo, id_usuario, trash_flag) VALUES(null,?,?,?,?)";
    $res = $con->prepare($insert_detail_customer);
    $res->bindParam(1,$element["etiqueta"]);
    $res->bindParam(2,$element["correo"]);
    $res->bindParam(3,$id_cliente);
    $res->bindParam(4,$trash_flag);

    $res->execute();
    $res->closeCursor();
  }

  function ingresarCuenta($id_cliente, $con, $element, $trash_flag){
    $insert_detail_customer = "INSERT INTO detalle_cuenta_bancaria(id, nombre, cuenta, banco, rfc_banco, id_usuario, trash_flag) VALUES(null,?,?,?,?,?,?)";
    $res = $con->prepare($insert_detail_customer);
    $res->bindParam(1,$element["nombre_cuenta"]);
    $res->bindParam(2,$element["no_cuenta"]);
    $res->bindParam(3,$element["banco"]);
    $res->bindParam(4,$element["rfc_banco"]);
    $res->bindParam(5,$id_cliente);
    $res->bindParam(6,$trash_flag);

    $res->execute();
    $res->closeCursor();
  }

 function eliminarDatos($id_cliente, $con, $tabla){
     $trash_flag = "borrar";
    $delete_detail_customer = "DELETE FROM $tabla WHERE trash_flag = ? AND id_usuario =?";
    $res = $con->prepare($delete_detail_customer);
    $res->bindParam(1,$trash_flag);
    $res->bindParam(2,$id_cliente);
    $res->execute();
    $res->closeCursor();
 }

  

   $comprobar_usuario = "SELECT COUNT(*) FROM clientes WHERE id= ?";
   $res = $con->prepare($comprobar_usuario);
   $res->execute([$id_cliente]);
   $total = $res->fetchColumn();
   $res->closeCursor();
 
   if ($total > 0) {

    $upd = "UPDATE clientes SET nombre =?, 
                                telefono =?, 
                                rfc = ?, 
                                contacto =?,
                                fecha_nacimiento =?,
                                lugar_nacimiento =?,
                                ocupacion =?,
                                estado_civil =? WHERE id = ?";
    $rr = $con->prepare($upd);
    $rr->execute([$nombre, $telefono, $rfc, $contacto, $fecha_nacimiento, $lugar_nacimiento, $ocupacion, $estado_civil, $id_cliente]);
    $rr->closeCursor();

   


    $post_total_direcciones = count($direcciones);
    $post_total_correos =  count($correos);
    $post_total_cuentas =  count($cuentas);


    //Traer total de direccion que coicidan con el id del cliente
/* 
    $contar_direccion = "SELECT COUNT(*) FROM detalle_direccion WHERE id_usuario = ?";
                $res = $con->prepare($contar_direccion);
                $res->execute([$id_cliente]);
                $total_direcciones_match_customer = $res->fetchColumn();
                $res->closeCursor(); */


    //Si el usuario envio mas de una direcion  comprobamos si esta ya existe en la base de datos
    if($post_total_direcciones > 0){
       
        foreach ($direcciones as $index => $element){

            if(empty($element["id_bd"])){
                ingresarDireccion($id_cliente, $con, $element, $trash_flag);

            }else{
              

                $comprobar_direccion = "SELECT COUNT(*) FROM detalle_direccion WHERE id = ?";
                $res = $con->prepare($comprobar_direccion);
                $res->execute([$element["id_bd"]]);
                $no_direcciones_encontradas = $res->fetchColumn();
                $res->closeCursor();
    
                if($no_direcciones_encontradas > 0){

                   
                    $calle_i = $element["calle"] ? $element["calle"] : null;
                    $colonia_i = $element["colonia"] ? $element["colonia"] : null;
                    $interior_i = $element["interior"] ? $element["interior"] : null;
                    $exterior_i = $element["exterior"] ? $element["exterior"] : null;
                    $cp_i = $element["cp"] ? $element["cp"] : null;
                    $ciudad_i = $element["ciudad"] ? $element["ciudad"] : null;
                    $municipio_i = $element["municipio"] ? $element["municipio"] : null;
                    $estado_i = $element["estado"] ? $element["estado"] : null;
                    $pais_i = $element["pais"] ? $element["pais"] : null;
                   /*  print_r($element); */

                    $actualizar_direccion = "UPDATE detalle_direccion SET calle = ?,
                                                                          colonia = ?,
                                                                          numero_int = ?,
                                                                          numero_ext = ?,
                                                                          cp = ?,
                                                                          ciudad = ?, 
                                                                          municipio = ?, 
                                                                          estado = ?, 
                                                                          pais = ?,
                                                                          trash_flag = ?
                                                                          WHERE id = ?";
                    $nueva_flag = "No borrar";
                    $res = $con->prepare($actualizar_direccion);
                   
                    $res->execute([$calle_i, $colonia_i, $interior_i, $exterior_i, $cp_i, $ciudad_i, 
                    $municipio_i, $estado_i, $pais_i, $nueva_flag, $element["id_bd"]]);
                    $res->closeCursor();
                }else{
    
                      ingresarDireccion($id_cliente, $con, $element, $trash_flag);

                }

            }
        

        }
    }

  
    if($post_total_correos > 0){
        foreach ($correos as $index => $element){

           

            if(empty($element["id_bd"])){

                ingresarCorreo($id_cliente, $con, $element, $trash_flag);

            }else{

                $comprobar_correo = "SELECT COUNT(*) FROM detalle_correo WHERE id = ?";
                $res = $con->prepare($comprobar_correo);
                $res->execute([$element["id_bd"]]);
                $no_correos_encontrados = $res->fetchColumn();
                $res->closeCursor();
    
                if($no_correos_encontrados > 0){
                    $actualizar_correo = "UPDATE detalle_correo SET etiqueta = ?,
                                                                    correo = ?,
                                                                    trash_flag = ?
                                                                    WHERE id = ?";
    
                    $nueva_flag = "No borrar";
                    $res = $con->prepare($actualizar_correo);
                    $res->bindParam(1,$element["etiqueta"]);
                    $res->bindParam(2,$element["correo"]);
                    $res->bindParam(3,$nueva_flag);
                    $res->bindParam(4,$element["id_bd"]);
                    $res->execute();
                    $res->closeCursor();

                }else{
    
                    ingresarCorreo($id_cliente, $con, $element, $trash_flag);
    
                }

            }
        

            }
    }

    
    if($post_total_cuentas > 0){
        foreach ($cuentas as $index => $element){

           

            if(empty($element["id_bd"])){

                ingresarCuenta($id_cliente, $con, $element, $trash_flag);

            }else{

                $comprobar_cuenta = "SELECT COUNT(*) FROM detalle_cuenta_bancaria WHERE id = ?";
                $res = $con->prepare($comprobar_cuenta);
                $res->execute([$element["id_bd"]]);
                $no_cuentas_encontradas = $res->fetchColumn();
                $res->closeCursor();
    
                if($no_cuentas_encontradas > 0){
                    $actualizar_cuenta = "UPDATE detalle_cuenta_bancaria SET nombre = ?,
                                                                             cuenta = ?,
                                                                             banco = ?,
                                                                             rfc_banco = ?,
                                                                             trash_flag = ?
                                                                             WHERE id = ?";
                    $nueva_flag = "No borrar";
                    $res = $con->prepare($actualizar_cuenta);
                    $res->bindParam(1,$element["nombre_cuenta"]);
                    $res->bindParam(2,$element["no_cuenta"]);
                    $res->bindParam(3,$element["banco"]);
                    $res->bindParam(4,$element["rfc_banco"]);
                    $res->bindParam(5,$nueva_flag);
                    $res->bindParam(6,$element["id_bd"]);
                    $res->execute();
                    $res->closeCursor();

                }else{
    
                    ingresarCuenta($id_cliente, $con, $element, $trash_flag);
    
                }

            }
        

            }
    }



     eliminarDatos($id_cliente, $con, "detalle_direccion");
        eliminarDatos($id_cliente, $con, "detalle_correo");
        eliminarDatos($id_cliente, $con, "detalle_cuenta_bancaria");

        //Insertar documentos
       
        if(count($_FILES) > 0){

    

            // Establecer la ruta de destino de los archivos
            $targetDir = '../../static/docs/C'.$id_cliente .'/';

            if (!is_dir($targetDir)) {
              mkdir($targetDir, 0777, true);
          }

           // Mover el archivo INE a la carpeta de destino
           if(isset($_FILES['file_ine'])){
            $fileIne = $_FILES['file_ine'];
            $extIne = pathinfo($fileIne['name'], PATHINFO_EXTENSION);
            $fileIne['name'] = "INE." . $extIne;

            if (move_uploaded_file($fileIne['tmp_name'], $targetDir . $fileIne['name'])) {
                // Mostrar un mensaje de éxito
                /* echo "El archivo INE se ha subido correctamente<br>"; */
              } else {
                // Mostrar un mensaje de error
                /* echo "Se ha producido un error al subir el archivo INE<br>"; */
              }
           }
          
           if(isset($_FILES['file_domicilio'])){
            $fileDomicilio = $_FILES['file_domicilio'];
            $extDomicilio = pathinfo($fileDomicilio['name'], PATHINFO_EXTENSION);
            $fileDomicilio['name'] = "COMPROBANTE DE DOMICILIO." . $extDomicilio;
            // Mover el archivo de comprobante de domicilio a la carpeta de destino
            if (move_uploaded_file($fileDomicilio['tmp_name'], $targetDir . $fileDomicilio['name'])) {
                // Mostrar un mensaje de éxito
            /*  echo "El archivo de comprobante de domicilio se ha subido correctamente<br>"; */
            } else {
                // Mostrar un mensaje de error
                /* echo "Se ha producido un error al subir el archivo de comprobante de domicilio<br>"; */
            }
           }
          
           if(isset($_FILES['file_rfc'])){
            $fileRfc = $_FILES['file_rfc'];
            $extRfc = pathinfo($fileRfc['name'], PATHINFO_EXTENSION);
            $fileRfc['name'] = "RFC." . $extRfc;
                // Mover el archivo de RFC a la carpeta de destino
                if (move_uploaded_file($fileRfc['tmp_name'], $targetDir . $fileRfc['name'])) {
                    // Mostrar un mensaje de éxito
                /*  echo "El archivo de RFC se ha subido correctamente<br>"; */
                } else {
                    // Mostrar un mensaje de error
                /*  echo "Se ha producido un error al subir el archivo de RFC<br>"; */
                }
                };
           }
          
    

    print_r(1);
    //echo json_encode($_POST, JSON_UNESCAPED_UNICODE);


   }else{
    echo "No hay clientes con ese id";
   }




?>