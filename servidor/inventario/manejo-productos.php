<?php
if ($_POST) {
    include "../database/conexion.php";
    include '../database/eliminar-dato.php';
    date_default_timezone_set('America/Matamoros');

    function deleteDir($dir) {
        $files = array_diff(scandir($dir), array('.','..'));
         foreach ($files as $file) {
           (is_dir("$dir/$file")) ? deleteDir("$dir/$file") : unlink("$dir/$file");
         }
         return rmdir($dir);
       }

    $delete = new Eliminar;
    $type = $_POST['type'];

    if($type == 'eliminacion') {
        $id_producto = $_POST['producto'];
        $relacion_id = "producto_id";
        $has_relation = true;

        $sentencia = $delete->eliminarDato("inventario", $id_producto, $has_relation, "precios", $relacion_id, $con);

        //Remover archivos de fotos
        $dir = "../../static/img/Productos/P$id_producto";
        deleteDir($dir);

        echo json_encode($sentencia, JSON_UNESCAPED_UNICODE);


    }else if($type == 'actualizacion') {

        $codigo = $_POST["codigo"];
        $categoria = $_POST["categoria"];
        $subcategoria = $_POST["subcategoria"];
        $cantidad = $_POST["cantidad"];
        $sucursal = $_POST["sucursal"];
        $costo = $_POST["costo"];
        $precio_base = $_POST["precio_base"];
        $tasa = $_POST["tasa"];
        $precio_total = $_POST["precio_total"];
        $descripcion = $_POST["descripcion"];
        $modelo = $_POST["modelo"];
        $marca = $_POST["marca"];
        $upc = $_POST["upc"];
        $sat_key = $_POST["sat_key"];
        $estatus = "activo";
        $id_producto = $_POST["id_producto"];
        $tipo = "Aire acondicionado";
        $impuesto = ((floatval($precio_base))* floatval("0.".$tasa));


        $query = "UPDATE inventario SET codigo = ?,
                                        descripcion = ?,
                                        marca = ?,
                                        modelo = ?,
                                        costo = ?,
                                        precio_base = ?,
                                        tasa = ?,
                                        impuesto = ?,
                                        precio_total = ?,
                                        stock = ?,
                                        estatus = ?,
                                        sucursal = ?,
                                        categoria = ?,
                                        subcategoria = ?,
                                        upc = ?,
                                        sat_key = ? WHERE id =?";

        $resp = $con->prepare($query);
        $resp->bindParam(1, $codigo);                                     
        $resp->bindParam(2, $descripcion);
        $resp->bindParam(3, $marca);
        $resp->bindParam(4, $modelo);
        $resp->bindParam(5, $costo);
        $resp->bindParam(6, $precio_base);
        $resp->bindParam(7, $tasa);
        $resp->bindParam(8, $impuesto);   
        $resp->bindParam(9, $precio_total);  
        $resp->bindParam(10, $cantidad);  
        $resp->bindParam(11, $estatus);  
        $resp->bindParam(12, $sucursal);  
        $resp->bindParam(13, $categoria);  
        $resp->bindParam(14, $subcategoria);  
        $resp->bindParam(15, $upc);  
        $resp->bindParam(16, $sat_key);  
        $resp->bindParam(17, $id_producto);  
        $resp->execute();
        $resp->closeCursor();  

        $arre=[$codigo,                                  
        $descripcion,
         $marca,
         $modelo,
         $costo,
         $precio_base,
         $tasa,
         $impuesto,  
         $precio_total,  
         $cantidad,  
         $estatus,  
         $sucursal,  
         $categoria,
         $subcategoria,  
         $upc,  
         $sat_key,  
         $id_producto];
        
        
        $response = array("estatus"=> true, "mensaje"=> "Actualizado correctamente", "post"=> $arre);
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        
    }
}


?>