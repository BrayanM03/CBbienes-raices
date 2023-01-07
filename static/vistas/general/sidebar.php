<nav id="sidebar" class="sidebar js-sidebar">
    <div class="sidebar-content js-simplebar">
        <a class="sidebar-brand" href="index.php">
            <img src="./img/logo.jpg" alt="" style="width:80px; border-radius:7px; margin-right:1rem;">
            <span class="align-middle">App</span>
        </a>

        <ul class="sidebar-nav">
            <li class="sidebar-header">
                Inicio
            </li>

            <li class="sidebar-item">
                <a class="sidebar-link" href="index.php">
                    <i class="align-middle" data-feather="sliders"></i> <span class="align-middle">Panel</span>
                </a>
            </li>

            <li class="sidebar-item">
                <a class="sidebar-link" href="nueva-orden.php">
                    <i class="align-middle" data-feather="shopping-cart"></i> <span class="align-middle">Nueva venta</span>
                </a>
            </li>

            <!-- <li class="sidebar-item">
                <a class="sidebar-link" href="nueva-cotizacion.php">
                    <i class="align-middle" data-feather="clipboard"></i> <span class="align-middle">Nueva cotización</span>
                </a>
            </li> -->

            <div class="accordion" id="accordionExample2">
                <div class="accordion-item">

                    <li class="sidebar-item accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseHistory" aria-expanded="true" aria-controls="collapseHistory">
                        <a class="sidebar-link" href="#">
                            <i class="align-middle" data-feather="folder"></i> <span class="align-middle">Historial</span>
                        </a>
                    </li>

                    <div id="collapseHistory" class="accordion-collapse collapse" style="margin-left:13px;" aria-labelledby="headingHistory" data-bs-parent="#accordionExample2">
                        <div class="accordion-body">
                            <li class="sidebar-item">
                                <a class="sidebar-link" href="ordenes-venta.php">
                                    <i class="align-middle" data-feather="book"></i> <span class="align-middle">Ordenes</span>
                                </a>
                            </li>
                           <!--  <li class="sidebar-item">
                                <a class="sidebar-link" href="historial-cotizaciones.php">
                                    <i class="align-middle" data-feather="book"></i> <span class="align-middle">Cotizaciones</span>
                                </a>
                            </li>
                            <li class="sidebar-item">
                                <a class="sidebar-link" href="gastos.php">
                                    <i class="align-middle" data-feather="book"></i> <span class="align-middle">Gastos</span>
                                </a>
                            </li>

                            <li class="sidebar-item">
                                <a class="sidebar-link" href="historial-entradas.php">
                                    <i class="align-middle" data-feather="book"></i> <span class="align-middle">Ingreso de material</span>
                                </a>
                            </li> -->

                            <!-- <li class="sidebar-item">
                                <a class="sidebar-link" href="historial-salidas.php">
                                    <i class="align-middle" data-feather="book"></i> <span class="align-middle">Salida de material</span>
                                </a>
                            </li> -->
                        </div>
                    </div>

                </div>
            </div>

            <!-- <li class="sidebar-item">
                <a class="sidebar-link" href="pages-blank.html">
                    <i class="align-middle" data-feather="book"></i> <span class="align-middle">Blank</span>
                </a>
            </li> -->

            <li class="sidebar-header">
                Inventario
            </li>

            <li class="sidebar-item">
                <a class="sidebar-link" href="registrar-terreno.php">
                    <i class="align-middle" data-feather="plus-circle"></i> <span class="align-middle">Registrar terreno</span>
                </a>
            </li>

            <li class="sidebar-item">
                <a class="sidebar-link" href="inventario.php">
                    <i class="align-middle" data-feather="plus-circle"></i> <span class="align-middle">Inventario</span>
                </a>
            </li>


            <li class="sidebar-header">
                Personas
            </li>

            <li class="sidebar-item">
                <a class="sidebar-link" href="clientes.php">
                    <i class="align-middle" data-feather="heart"></i> <span class="align-middle">Clientes</span>
                </a>
            </li>

            <!-- <li class="sidebar-item">
                <a class="sidebar-link" href="usuarios.php">
                    <i class="align-middle" data-feather="user"></i> <span class="align-middle">Usuarios</span>
                </a>
            </li> -->
<!-- 
            <li class="sidebar-item">
                <a class="sidebar-link" href="maps-google.html">
                    <i class="align-middle" data-feather="users"></i> <span class="align-middle">Usuarios</span>
                </a>
            </li> -->
        </ul>

        <div class="sidebar-cta">
            <div class="sidebar-cta-content">
                <strong class="d-inline-block mb-2">Sistema en proceso</strong>
                <div class="mb-3 text-sm">
                    Algunas funciones estan en proceso de desarollo.
                </div>
                <!-- <div class="d-grid">
                    <a href="upgrade-to-pro.html" class="btn btn-primary">Upgrade to Pro</a>
                </div> -->
            </div>
        </div>
    </div>
</nav>