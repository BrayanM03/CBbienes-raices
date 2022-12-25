<?php
  
session_start();
include "../database/conexion.php";

function traerData($con, $tabla, $identificador, $parametro){
    $contar = "SELECT COUNT(*) FROM $tabla WHERE $identificador = ?";
    $re = $con->prepare($contar);
    $re->execute([$parametro]);
    $count = $re->fetchColumn();
    
    if($count > 0) {
    
        
        $consultar = "SELECT * FROM $tabla WHERE $identificador = ?";
        $resp = $con->prepare($consultar);
        $resp->execute([$parametro]);
        while ($row = $resp->fetch()) {
    
         $respuesta[] = $row;
             /* $respuesta["costo"]= $row["costo"];
             $respuesta["precio_base"]= $row["precio_base"];
             $respuesta["tasa"]= $row["tasa"];
             $respuesta["impuesto"]= $row["impuesto"];
             $respuesta["precio_total"]= $row["precio_base"]; */
        }
    
        return $respuesta;

    
    }else {
        return "No se encontro información";
    }
}

$producto_id = $_POST['product_id'];
$datos_precio_inv = traerData($con, "inventario", "id", $producto_id);
$datos_precios = traerData($con, "precios", "producto_id", $producto_id);
$datos_carrito = traerData($con, "carrito_compra", "producto_id", $producto_id);

if($datos_carrito !== "No se encontro información"){
    $items_total = $datos_carrito[0]["cantidad"];
}else{
    $items_total =0;
}

$precio_principal = array("costo"=> $datos_precio_inv[0]["costo"], 
                          "precio_base"=> $datos_precio_inv[0]["precio_base"],
                          "tasa"=> $datos_precio_inv[0]["tasa"],
                          "impuesto"=> $datos_precio_inv[0]["impuesto"],
                          "precio_total"=> $datos_precio_inv[0]["precio_base"],
                          "tipo"=> "precio_principal",
                          "etiqueta"=> "Precio principal");
/* foreach ($datos_precios as $key => $value) {
    $respuesta["costo"]= $datos_precios["costo"];
    $respuesta["precio_base"]= $datos_precios["precio_base"];
    $respuesta["tasa"]= $datos_precios["tasa"];
    $respuesta["impuesto"]= $datos_precios["impuesto"];
    $respuesta["precio_total"]= $datos_precios["precio_base"];
}    */                      
$datos_precios.array_push($precio_principal);


$response = array("status" =>true, "precio_principal" =>$precio_principal, "data_precios"=>$datos_precios, "post"=>$_POST, "total_carrito"=> $items_total);

echo json_encode($response, JSON_UNESCAPED_UNICODE);




?>