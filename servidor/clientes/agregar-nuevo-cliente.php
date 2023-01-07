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
  

    if ($_POST) {

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

           
       

           $insert_customer = "INSERT INTO clientes(id, 
                                                    nombre, 
                                                    telefono, 
                                                    rfc, 
                                                    contacto, 
                                                    estatus, 
                                                    fecha_ingreso,
                                                    fecha_nacimiento,
                                                    lugar_nacimiento,
                                                    ocupacion,
                                                    estado_civil) VALUES(null,?,?,?,?,?,?,?,?,?,?)";
           $resultado = $con->prepare($insert_customer);
           if($resultado){
             $resultado->bindParam(1,$nombre);
             $resultado->bindParam(2,$telefono);
             $resultado->bindParam(3,$rfc);
             $resultado->bindParam(4,$contacto);
             $resultado->bindParam(5,$estaus);
             $resultado->bindParam(6,$fecha);
             $resultado->bindParam(7,$fecha_nacimiento);
             $resultado->bindParam(8,$lugar_nacimiento);
             $resultado->bindParam(9,$ocupacion);
             $resultado->bindParam(10,$estado_civil);

             $resultado->execute();
             $id_cliente = $con->lastInsertId();
             $resultado->closeCursor();
  
            
              
                
            foreach($direcciones as $index => $element){
              $calle_i = $element["calle"] ? $element["calle"] : null;
              $colonia_i = $element["colonia"] ? $element["colonia"] : null;
              $interior_i = $element["interior"] ? $element["interior"] : null;
              $exterior_i = $element["exterior"] ? $element["exterior"] : null;
              $cp_i = $element["cp"] ? $element["cp"] : null;
              $ciudad_i = $element["ciudad"] ? $element["ciudad"] : null;
              $municipio_i = $element["municipio"] ? $element["municipio"] : null;
              $estado_i = $element["estado"] ? $element["estado"] : null;
              $pais_i = $element["pais"] ? $element["pais"] : null;
       
                $tash = "null";
                $insert_detail_customer_direction = "INSERT INTO detalle_direccion (id,
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
                                                                          trash_flag) VALUES (null,?,?,?,?,?,?,?,?,?,?,?)";
                $result = $con->prepare($insert_detail_customer_direction);
              
                

                $result->execute([
                  $calle_i,
                  $colonia_i,
                  $interior_i,
                  $exterior_i,
                  $cp_i,
                  $ciudad_i,
                  $municipio_i,
                  $estado_i,
                  $pais_i,
                  $id_cliente,
                  $tash
                ]);
                $result->closeCursor();

              }

             
          
              foreach($correos as $index => $element2){

                $etiqueta_i = $element2["etiqueta"] ? $element2["etiqueta"]: null;
                $correo_i = $element2["correo"] ? $element2["correo"]: null;

                $insert_detail_customer_mail = "INSERT INTO detalle_correo(id, etiqueta, correo, id_usuario) VALUES(null,?,?,?)";
        
                $result2 = $con->prepare($insert_detail_customer_mail);
                $result2->bindParam(1,$etiqueta_i);
                $result2->bindParam(2,$correo_i);
                $result2->bindParam(3,$id_cliente);
                $result2->execute();
                $result2->closeCursor();

              }

             
              foreach ($cuentas as $index => $element3){
                $nombre_cuenta_i = $element3["nombre_cuenta"] ? $element3["nombre_cuenta"]: null;
                $no_cuenta_i = $element3["no_cuenta"] ? $element3["no_cuenta"]: null;
                $banco_i = $element3["banco"] ? $element3["banco"]: null;
                $rfc_banco_i = $element3["rfc_banco"] ? $element3["rfc_banco"]: null;
                
                $insert_detail_customer_count = "INSERT INTO detalle_cuenta_bancaria(id, nombre, cuenta, banco, rfc_banco, id_usuario) VALUES(null,?,?,?,?,?)";
               
                $result3 = $con->prepare($insert_detail_customer_count);
                $result3->bindParam(1,$nombre_cuenta_i);
                $result3->bindParam(2,$no_cuenta_i);
                $result3->bindParam(3,$banco_i);
                $result3->bindParam(4,$rfc_banco_i);
                $result3->bindParam(5,$id_cliente);
                $result3->execute();
                $result3->closeCursor();
              }


              //Insertar documentos
              $targetDir = '../../static/docs/C'.$id_cliente .'/';

              if (!is_dir($targetDir)) {
                mkdir($targetDir, 0777, true);
            }
              if(count($_FILES) > 0){

                $fileIne = $_FILES['file_ine'];
                $extIne = pathinfo($fileIne['name'], PATHINFO_EXTENSION);
                $fileIne['name'] = "INE." . $extIne;

                $fileDomicilio = $_FILES['file_domicilio'];
                $extDomicilio = pathinfo($fileDomicilio['name'], PATHINFO_EXTENSION);
                $fileDomicilio['name'] = "COMPROBANTE DE DOMICILIO." . $extDomicilio;

                $fileRfc = $_FILES['file_rfc'];
                $extRfc = pathinfo($fileRfc['name'], PATHINFO_EXTENSION);
                $fileRfc['name'] = "RFC." . $extRfc;

                // Establecer la ruta de destino de los archivos
                $targetDir = '../../static/docs/C'.$id_cliente .'/';

                if (!is_dir($targetDir)) {
                  mkdir($targetDir, 0777, true);
              }

               // Mover el archivo INE a la carpeta de destino
              if (move_uploaded_file($fileIne['tmp_name'], $targetDir . $fileIne['name'])) {
                // Mostrar un mensaje de éxito
                /* echo "El archivo INE se ha subido correctamente<br>"; */
              } else {
                // Mostrar un mensaje de error
                /* echo "Se ha producido un error al subir el archivo INE<br>"; */
              }

              // Mover el archivo de comprobante de domicilio a la carpeta de destino
              if (move_uploaded_file($fileDomicilio['tmp_name'], $targetDir . $fileDomicilio['name'])) {
                // Mostrar un mensaje de éxito
               /*  echo "El archivo de comprobante de domicilio se ha subido correctamente<br>"; */
              } else {
                // Mostrar un mensaje de error
                /* echo "Se ha producido un error al subir el archivo de comprobante de domicilio<br>"; */
              }

              // Mover el archivo de RFC a la carpeta de destino
              if (move_uploaded_file($fileRfc['tmp_name'], $targetDir . $fileRfc['name'])) {
                // Mostrar un mensaje de éxito
               /*  echo "El archivo de RFC se ha subido correctamente<br>"; */
              } else {
                // Mostrar un mensaje de error
               /*  echo "Se ha producido un error al subir el archivo de RFC<br>"; */
              }
              };

             print_r(1);

           }else{
                $arrResultado['error']='Hubo un fallo en la consulta: '.$connect->error;
                 print_r($arrResultado);
           }
          

}


    ?>
