  <?php
  session_start();
  include '../database/conexion.php';
  
  date_default_timezone_set("America/Matamoros");
  $detalle_id = $_POST["id_detalle"];
  $sesion_id = $_SESSION["id"];
  $response = array();

  $select = "SELECT * FROM carrito_compra WHERE id = ?";
  $resp = $con->prepare($select);
  $resp->execute([$detalle_id]);
  $subtotal = 0;
  $importe =0;
  $iva =0;
  while ($row = $resp->fetch(PDO::FETCH_OBJ)) {
      //print_r($row['importe']);
      $subtotal = floatval(($row->importe_base));
      $iva = floatval($row->impuesto);
      $importe = floatval($row->importe);
  }

  $selects = "SELECT SUM(importe_base) as suma_subtotal,
                     SUM(impuesto) as suma_impuesto, 
                     SUM(importe) as suma_importe FROM carrito_compra WHERE usuario_id = ?";
  $res = $con->prepare($selects);
  $res->execute([$sesion_id]);
  
  while ($rows = $res->fetch(PDO::FETCH_OBJ)) {
      //print_r($row['importe']);
      $subtotal_actual = floatval($rows->suma_subtotal);
      $iva_actual = floatval($rows->suma_impuesto);
      $importe_actual = floatval($rows->suma_importe);
  }

  $subtotal_restante = $subtotal_actual - $subtotal;
  $iva_restante = $iva_actual - $iva;
  $importe_restante = $importe_actual - $importe;


  $delete = "DELETE FROM carrito_compra WHERE id = ?";
  $re = $con->prepare($delete);
  $re->execute([$detalle_id]);
  $re->closeCursor();


  $response["status"] = true;
  $response["subtotal"] = $subtotal_restante;
  $response["iva"] = $iva_restante;
  $response["importe"] = $importe_restante;

  echo json_encode($response, JSON_UNESCAPED_UNICODE);


  ?>