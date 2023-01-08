<?php
session_start();
date_default_timezone_set('America/Matamoros');
if (empty($_SESSION["id"])) {
    header("Location:login.php");
} ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Responsive Admin &amp; Dashboard Template based on Bootstrap 5">
    <meta name="author" content="AdminKit">
    <meta name="keywords" content="adminkit, bootstrap, bootstrap 5, admin, dashboard, template, responsive, css, sass, html, theme, front-end, ui kit, web">

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="shortcut icon" href="img/icons/icon-48x48.png" />

    <link rel="canonical" href="https://demo-basic.adminkit.io/pages-blank.html" />

    <title>Agregar abono | CB manager</title>

    <link href="css/app.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.3.0/css/responsive.dataTables.min.css" />
    <link rel="stylesheet" href="./css/form-field.css">
    <link rel="stylesheet" href="./css/lista-abonos.css">


</head>

<body>
    <div class="wrapper">

        <?php
        include "vistas/general/sidebar.php"
        ?>
        <div class="main">
            <?php
            include "vistas/general/navbar.php"
            ?>

            <main class="content">
                <div class="container-fluid p-0">

                    <div class="row mb-2">
                        <div class="col-12 col-md-6">
                            <h1 class="h3 mb-3">Agregar abono</h1>
                        </div>
                    </div>



                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header">
                                    <h5 class="card-title mb-0">Detalle de compra venta</h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12 col-md-12">
                                            <div class="detalle-terreno">

                                            <div class="row">
                                            <div class="col-12 col-md-12">
                                                        <label for="cliente">Cliente</label>
                                                        <input type="text" class="form-field" id="cliente" disabled>
                                                    </div>
                                            </div>
                                                <div class="row mt-3">
                                                    <div class="col-12 col-md-3">
                                                        <label for="proyecto">Proyecto</label>
                                                        <input type="text" class="form-field" id="proyecto" disabled>
                                                    </div>
                                                    <div class="col-12 col-md-3">
                                                        <label for="manzana">Manzana</label>
                                                        <input type="text" class="form-field" id="manzana" disabled>
                                                    </div>
                                                    <div class="col-12 col-md-3">
                                                        <label for="lote">Lote</label>
                                                        <input type="text" class="form-field" id="lote" disabled>
                                                    </div>

                                                    <div class="col-12 col-md-3">
                                                        <label for="abonos">abonos</label>
                                                        <input type="text" class="form-field" id="abonos" disabled>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-12 col-md-3">
                                                            <label for="precio-total">Precio total</label>
                                                            <input type="text" class="form-field" id="precio-total" disabled>
                                                        </div>
                                                        <div class="col-12 col-md-3">
                                                            <label for="total-abonado">Total abonado</label>
                                                            <input type="text" class="form-field" id="total-abonado" disabled>
                                                        </div>
                                                        <div class="col-12 col-md-3">
                                                            <label for="restante">Restante</label>
                                                            <input type="text" class="form-field" id="restante" disabled>
                                                        </div>

                                                        <div class="col-12 col-md-3">
                                                            <label for="mensualidad">Mensualidad</label>
                                                            <input type="text" value="1/60" class="form-field" id="mensualidad" disabled>
                                                        </div>
                                                    </div>

                                                    <div class="row mt-3">
                                                        <div class="col-12">
                                                            <span>Porcentaje pagado</span>
                                                            <div id="barra"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="nuevo-abono">

                                                <div class="row mt-4">
                                                    <div class="col-12 col-md-12 text-center">
                                                        <h3><b>Nuevo abono</b></h3>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-12 col-md-3">
                                                        <label for="cant-abono">Cantidad a abonar</label>
                                                        <input type="number" class="form-field" id="monto-abono" placeholder="0.00">
                                                    </div>

                                                    <div class="col-12 col-md-3">
                                                        <label for="etiqueta">Etiqueta</label>
                                                        <input type="text" class="form-field" id="etiqueta-abono" placeholder="Etiqueta">
                                                    </div>

                                                    <div class="col-12 col-md-2">
                                                        <label for="tipo-abono">Tipo</label>
                                                        <select id="tipo-abono"  class="form-field">
                                                            <option value="Abono">Abono</option>
                                                            <option value="Enganche">Enganche</option>
                                                        </select>
                                                    </div>


                                                    <div class="col-12 col-md-2">
                                                        <label for="cant-abono">Fecha</label>
                                                        <input type="date" id="fecha-abono" value="<?php echo date("Y-m-d") ?>" class="form-field">
                                                    </div>

                                                    <div class="col-12 col-md-2">
                                                        <div type="text" class="btn btn-success mt-3" onclick="realizarAbono(<?php echo $_GET['orden_id'] ?>, <?php echo $_GET['terreno_detalle_id'] ?>)">Abonar</div>
                                                    </div>
                                                </div>

                                                <div class="row mt-5">
                                                    <div class="col-12">
                                                        <span>Abonos realizados</span>
                                                    </div>

                                                    <div class="col-12 mt-3">
                                                        <div class="table-resposive">
                                                        <table id="tabla-abonos" class="table table-bordered table-hover">
                                                            <thead class="table-primary">
                                                                <tr>
                                                                    <th>Folio</th>
                                                                    <th>No. abono</th>
                                                                    <th>Fecha</th>
                                                                    <th>Hora</th>
                                                                    <th>Total abonado</th>
                                                                    <th>Etiqueta</th>
                                                                    <th>Tipo</th>
                                                                    <th>Acción</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="tbody-abonos">

                                                            </tbody>
                                                        </table>
                                                        </div>
                                                       
                                                    </div>
                                                </div>

                                                </div>



                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
                

            <footer class="footer">
                <div class="container-fluid">
                    <div class="row text-muted">
                        <div class="col-6 text-start">
                            <p class="mb-0">
                                <a class="text-muted" href="https://adminkit.io/" target="_blank"><strong>AdminKit</strong></a> &copy;
                            </p>
                        </div>
                        <div class="col-6 text-end">
                            <ul class="list-inline">
                                <li class="list-inline-item">
                                    <a class="text-muted" href="https://adminkit.io/" target="_blank">Support</a>
                                </li>
                                <li class="list-inline-item">
                                    <a class="text-muted" href="https://adminkit.io/" target="_blank">Help Center</a>
                                </li>
                                <li class="list-inline-item">
                                    <a class="text-muted" href="https://adminkit.io/" target="_blank">Privacy</a>
                                </li>
                                <li class="list-inline-item">
                                    <a class="text-muted" href="https://adminkit.io/" target="_blank">Terms</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            </div>
        </div>
    

    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="js/app.js"></script>

    <!-- Librerias -->
    <script src="https://kit.fontawesome.com/5c955c6e98.js" crossorigin="anonymous"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.3.0/js/dataTables.responsive.min.js"></script>
      
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js"></script>
    <script src="https://unpkg.com/jspdf-autotable@3.5.22/dist/jspdf.plugin.autotable.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
    <script src="js/progressjs/progressbarmin.js"></script>

    <!-- Mis scripts --> 
    <script src="js/abonos/reload.js"></script>
    <script src="js/abonos/nuevo-abono.js"></script>
    <script src="js/abonos/realizar-abono.js"></script>
    <script src="js/reportes/logo-monte-alto.js"></script>
    <script src="js/reportes/logo-cb.js"></script>
    <script src="js/reportes/ticket-abono-pdf.js"></script>
 -->
</body>

</html>