<!DOCTYPE html>
<?php
    session_start();
    include '../../../servidor/database/conexion.php';
    date_default_timezone_set("America/Matamoros");
    setlocale(LC_MONETARY,"es_MX");

    $id_orden = $_GET["id"];
   
    $query = "SELECT COUNT(*) FROM ordenes WHERE id =?";
    $resp = $con->prepare($query);
    $resp->execute([$id_orden]);
    $total = $resp->fetchColumn();
    $resp->closeCursor();
    
    if($total > 0){

        $traer = "SELECT * FROM ordenes WHERE id =?";
        $respu = $con->prepare($traer);
        $respu->execute([$id_orden]);

        while ($row = $respu->fetch()) {
            $id_cliente = $row['cliente_id'];
            $fecha = $row['fecha'];
            $hora = $row['hora'];
            $subtotal_ = floatval($row['subtotal']);
            $impuesto_ = $row['impuesto'];
            $total_ = $row['total'];
            $metodo_pago = $row['metodo_pago'];
            $estatus = $row['estatus'];
            $id_usuario = $row['usuario_id'];

            $traer_cliente = "SELECT * FROM clientes WHERE id =?";
            $re = $con->prepare($traer_cliente);
            $re->execute([$id_cliente]);
            while ($row_2 = $re->fetch()) {
                $nombre_cliente = $row_2['nombre'];
            }
            $re->closeCursor();

            $traer_usuario = "SELECT * FROM usuarios WHERE id =?";
            $rsp = $con->prepare($traer_usuario);
            $rsp->execute([$id_usuario]);
            while ($row_3 = $rsp->fetch()) {
                $nombre_usuario = $row_3['nombre'] . " " . $row_3['apellido'];
            }
            $rsp->closeCursor();
        }
        $subtotal = number_format($subtotal_);
        $impuesto = number_format($impuesto_);
        $total = number_format($total_);

        $respu->closeCursor();

    }
    

    ?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket folio <?php echo $id_orden ?></title>
    <link rel="stylesheet" href="../../css/ticket.css">
</head>
<body>

    <div class="container">
        <div class="header">
            <img src="../../img/logo.jpg" alt="img" class="img-logo">
            <div class="title"><b>PSC</b></div>
            <div class="subtitle">Sistemas y Servicios</div>
            <div class="subtitle-2">
                Calle Diesciseis Entre Jaime Nuno y Fco Gonzalez Bocanegra,
                #582A Colonia Buena Vista 87350
                SSH180309TY1<br>
                Tel: 868-8179502
            </div>
        </div>

        <div class="datos-ticket">
            <span>Cliente: <?php echo $nombre_cliente ?></span> 
            <span>Fecha: <?php echo $fecha ?>  Hora: <?php echo $hora ?></span>
            <span>Vendedor: <?php echo $nombre_usuario ?></span>
             

        </div>
        <span>************************************</span>

        <div class="body">
        <table class="table">
            <thead>
                <th>Cant</th>
                <th>Descripcion</th>
                <th>Precio</th>
            </thead>
            <tbody>
                <?php
                    $traer_detalle = "SELECT * FROM detalle_orden WHERE orden_id = ?";
                    $rr = $con->prepare($traer_detalle);
                    $rr->execute([$id_orden]);
                    while ($row_4 = $rr->fetch()) {
                       
                        ?>
                        
                        <tr>
                            <td><?php echo $row_4["cantidad"]?></td>
                            <td><?php echo $row_4["descripcion"]?></td>
                            <td>$<?php echo number_format($row_4["importe"])?></td>
                        </tr>
                        <?php
                    }
                    $rr->closeCursor();
                ?>
                
            </tbody>
        </table>

        <span>************************************</span>
        <table class="totales">
            <thead>
                <th class="cell-spacing"></th>
                <th>Total</th>
                <th>$<?php echo $total; ?></th>
            </thead>
            <tbody>
                <tr>
                    <td class="cell-spacing"></td>
                    <td>IVA</td>
                    <td>$<?php echo $impuesto; ?></td>
                </tr>
                <tr>
                    <td class="cell-spacing"></td>
                    <td>Subtotal</td>
                    <td>$<?php echo $subtotal; ?></td>
                </tr>
            </tbody>
        </table>
        </div>

        <div class="footer">
            <span>¡Muchas gracias por su compra!</span><br>
            <span style="font-size: 12px; text-align:center;">www.powerpsc.com.mx</span>
        </div>
       
    </div>

</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function(event) {
  // window.print()
});
/* var source = window.document.getElementsByTagName("body")[0];

// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF({
    orientation: 'p',
        unit: 'mm',
        format: [240, 300]
});

doc.fromHTML(
    source,
    15,
    15,
    {
      'width': 180
    })

var string = doc.output('datauristring');
var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
var x = window.open();
x.document.open();
x.document.write(embed);
x.document.close(); */
</script>
</html>