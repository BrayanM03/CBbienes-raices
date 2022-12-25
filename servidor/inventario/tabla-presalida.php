<?php
  session_start();
  include "../database/conexion.php";
  date_default_timezone_set('America/Matamoros');

$producto_id = $_POST["id_producto"];

$eliminar = "DELETE FROM detalle_salida_tmp WHERE id =?";
$resp = $con->prepare($eliminar);
$resp->execute([$producto_id]);
$resp->closeCursor();

$response = array("mensj"=> "Producto eliminado correctamente",
                  "status"=> true,
                  );
echo json_encode($response, JSON_UNESCAPED_UNICODE);
                  ?>