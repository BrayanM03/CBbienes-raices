<?php
session_start();

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

    <title>Ordenes de venta | ERP manager</title>

    <link href="css/app.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.3.0/css/responsive.dataTables.min.css" />
    <link rel="stylesheet" href="css/contextual-menu.css">
    <link rel="stylesheet" href="css/detalle-orden.css">
    
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
                            <h1 class="h3 mb-3">Registro de ventas realizadas</h1>
                        </div>
                        <!-- <div class="col-12 col-md-6 text-end">
                            <a href="agregar-cliente.php"><div class="btn btn-success">Agregar nuevo</div></a>
                        </div> -->
                    </div>



                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header">
                                    <h5 class="card-title mb-0">Ventas realizadas</h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12 col-md-12">
                                            <table id="example" class="table table-hover nowrap" style="width:100%">
                                            <!-- <thead>
                                                <tr>
                                                    <th>Subscriber ID</th>
                                                    <th>Install Location</th>
                                                    <th>Subscriber Name</th>
                                                    <th>some data</th>
                                                </tr>
                                            </thead> -->
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-3">
                                <?php include_once('vistas/general/contextual-menu-ventas.php'); ?>


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
    <script src="https://kit.fontawesome.com/31a28ea63e.js" crossorigin="anonymous"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.3.0/js/dataTables.responsive.min.js"></script>
  
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js"></script>
   <!--  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script> -->
   <!-- <script src="./js/reportes/dist/jspdf.debug.js"></script> -->
    <script src="https://unpkg.com/jspdf-autotable@3.5.22/dist/jspdf.plugin.autotable.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>

    <!-- Mis scripts -->
    <script src="js/reportes/numero_letras.js"></script>
    <script src="js/historial/lista-ordenes.js"></script>
    <script src="js/contextual-menu/contextual-menu.js"></script>
    <script src="js/nueva-orden/ver-detalle-orden.js"></script>
    <script src="js/reportes/logo-monte-alto.js"></script>
    <script src="js/reportes/logo-cb.js"></script>
    <script src="js/reportes/plantilla-contrato.js"></script>
    <script src="js/historial/eliminar-orden.js"></script>
    <script src="js/historial/eliminar-abono.js"></script>
    <script src="js/historial/eliminar-detalle.js"></script>
    <script src="js/historial/documentos.js"></script>


</body>

</html>