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

    <title>Nueva orden | PSC manager</title>

    <link href="css/app.css" rel="stylesheet">
    <link href="css/estilos-agregar-producto.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.3.0/css/responsive.dataTables.min.css" />
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2-bootstrap-5-theme@1.3.0/dist/select2-bootstrap-5-theme.rtl.min.css" />
	<link href="../vendor/nice-select/css/nice-select.css">
    <link href="../vendor/nice-select/css/style.css">
    <link rel="stylesheet" href="./css/form-field.css">
    <link rel="stylesheet" href="./css/punto-venta.css">


    <style>
       .select2-container .select2-selection--single {
        height: 20px !important;
        }
        .select2-container .select2-selection--single .select2-selection__rendered{
        padding: 0 0 0 8px !important;
        }

        .select2 {
        width:100%!important;
        }

    </style>
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
                <div class="container-fluid p-0" id="main-content">

                   
                    <?php
                        include "vistas/nueva_orden/nuevo-contrato.php";
                    ?>
                    

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
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.3.0/js/dataTables.responsive.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="../vendor/nice-select/js/jquery.nice-select.min.js"></script>

     
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js"></script>
    <script src="https://unpkg.com/jspdf-autotable@3.5.22/dist/jspdf.plugin.autotable.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>

    <!-- Mis scripts -->
    <script src="js/reportes/numero_letras.js"></script>
    <script src="./js/nueva-orden/seleccionar-cliente.js"></script>
    <script src="./js/nueva-orden/formulario.js"></script>
    <script src="./js/nueva-orden/tabla-preorden.js"></script>
    <script src="./js/nueva-orden/procesar-compra-venta.js"></script>
    <script src="./js/nueva-orden/cambiar-valor-selects.js"></script>
    <script src="./js/nueva-orden/ver-detalle-orden.js"></script>

   <script src="js/reportes/logo-monte-alto.js"></script>
    <script src="js/reportes/logo-cb.js"></script>
    <script src="js/reportes/plantilla-contrato.js"></script>
    <script src="js/reportes/guardar-contrato.js"></script>
  
    <script>
        
$( "#card-aire" ).hover(
  function() {
    $("#imagen-aire").addClass( "animate__pulse animate__infinite infinite")
  }, function() {
    $("#imagen-aire").removeClass( "animate__pulse animate__infinite infinite" );
  }
);

$( "#card-check" ).hover(
  function() {
    $("#imagen-checklist").addClass( "animate__pulse animate__infinite infinite" );
  }, function() {
    $("#imagen-checklist").removeClass( "animate__pulse animate__infinite infinite" );
  }
);
    </script>
</body>

</html>