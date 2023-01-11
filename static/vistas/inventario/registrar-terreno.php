<!-- TESTE DE DESARROLLO DE PAGINA -->

<div class="row mb-2">
    <div class="col-12 col-md-12">
        <h1 class="h3 mb-3 text-center">Agregar terreno nuevo</h1>
    </div>
</div>

<div class="row justify-content-center">
    <div class="col-12 col-md-7">

        <ul class="nav nav-tabs" id="myTab">
            <li class="nav-item">
                <a class="nav-link active" id="datos-generales" data-toggle="tab" href="#generales-tab" role="tab" aria-controls="generales-tab" aria-selected="true">
                    <span style="font-size: 19px; color: Tomato;"><i class="fa-solid fa-tags"></i></span>
                </a>
            </li>
            <!-- <li class="nav-item">
                <a class="nav-link" id="datos-precios" data-toggle="tab" href="#precios-tab" role="tab" aria-controls="precios-tab" aria-selected="false">
                    <span style="font-size: 19px; color: Gray;"><i class="fa-solid fa-money-bill-wave"></i></span>
                </a>
            </li> -->
        </ul>

        <div class="tab-content">
            <div class="tab-pane active" id="generales-tab" role="tabpanel" aria-labelledby="datos-generales">
                <div class="card">
                    <div class="card-header text-center">
                        <div class="row">
                            <div class="col-12 col-md-1" id="backbtn_area">
                                <div class="btn" onclick="RegresarAtras(1)">
                                    <i class="fa-solid fa-circle-left fa-2xl icono" style="color:#E5BE01"></i>
                                </div>

                            </div>
                            <div class="col-12 col-md-11">
                                <h5 class="card-title mb-0" id="title-card">Ingresa los datos del terreno</h5>
                            </div>
                        </div>


                    </div>
                    <div class="card-body" id="card-body">

                        <div class="row mb-3">
                            <div class="col-12 col-md-6">

                                <label for="codigo">Codigo</label>
                                <!-- <select name="proveedor" class="form-control" id="proveedor"></select> -->
                                <input name="codigo" value="" class="form-field" id="codigo" placeholder="Escribe un codigo interno">
                                <div class="col-12 text-end"><small class="d-none" valid="false" id="small_response">Codigo en uso</small></div>
                            </div>
                            <!-- <div class="col-12 col-md-2 mt-4">
                                    <div class="btn btn-info" onclick="generarCodigo()">Generar</div>
                                </div> -->


                        </div>

                        <div class="row mb-3">
                            <div class="col-12 col-md-6">
                                <label for="manzana">Manzana</label>
                                <select class="form-field" name="manzana" id="manzana">
                                    <option value="null">Selecciona una manzana</option>
                                    <?php
                                        session_start();
                                        include "../../../servidor/database/conexion.php";
                                        date_default_timezone_set('America/Matamoros');
                                        $proyecto = 1;
                                        $select = "SELECT COUNT(*) FROM manzanas WHERE proyecto_id =?";
                                        $r = $con->prepare($select);
                                        $r->execute([$proyecto]);
                                        $total = $r->fetchColumn();
                                        $r->closeCursor();

                                        if($total > 0) {
                                            $select2 = "SELECT * FROM manzanas WHERE proyecto_id =?";
                                            $re = $con->prepare($select2);
                                            $re->execute([$proyecto]);
                                            while($row = $re->fetch()){
                                               ?>
                                                <option value="<?php echo $row['id']?>"><?php echo "Manzana ".$row['no_manzana']?></option>
                                               
                                               <?php 
                                            }
                                            $r->closeCursor();
                                        }else{
                                            
                                            
                                                ?>
                                                <option value="null">No hay manzanas registradas</option>
                                                <?php
                                        }
                                    ?>
                                </select>
                            </div>

                            <div class="col-12 col-md-6">
                                <label for="marca">Lote</label>
                                <select class="form-field" style="background: rgb(231, 227, 227); color: gray" name="lote" id="lote" disabled>
                                    <option value="null">Primero elige una manzana</option>
                                </select>
                            </div>
                        </div>


                        <div class="row mb-3 justify-content-between">
                              <!-- <div class="col-12 col-md-3">
                             
                                <label for="costo">Costo</label>
                                <input class="form-field" placeholder="0.00" name="costo" id="costo" type="number">
                            </div>
                           <div class="col-4 col-md-3">
                                <label for="precio-base">Precio base</label>
                                <div class="row">
                                    <div class="col-9 col-md-9">
                                        <input class="form-field" placeholder="0.00" name="precio-base" id="precio-base" type="number">
                                    </div>
                                    <div class="col-3 col-md-3">
                                        <i class="fa-solid fa-plus mt-3" style="color:#20c997;"></i>
                                    </div>
                                </div>
                                 
                            </div>

                            <div class="col-4 col-md-3">
                                <label for="impuesto">Impuesto</label>

                                <div class="row">
                                    <div class="col-9 col-md-9">
                                        <select class="form-field" name="impuesto" id="impuesto" impuesto="">
                                            <option value="0">Sin desglosar</option>
                                            <option value="8" selected>IVA 8%</option>
                                            <option value="16">IVA 16%</option>
                                        </select>
                                    </div>
                                    <div class="col-3 col-md-3">
                                        <i class="fa-solid fa-equals fa-beat mt-3" style="color:#20c997;"></i>
                                    </div>
                                </div>
                            </div> -->
                            <div class="col-4 col-md-6">
                                <label for="precio-total">Precio total</label>
                                <input class="form-field" placeholder="0.00" name="precio-total" id="precio-total" type="number">
                            </div>
                            <div class="col-4 col-md-6">
                                <label for="area">Area(<em>m<sup>2</sup></em>)</label>
                                <input class="form-field" placeholder="0" name="area" id="area" type="number">
                            </div>
                        </div>


                        <div class="row mb-3 justify-content-end">
                            <div class="col-12 col-md-3 text-end">
                                <a class="buttom-advanced-options" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                    Colindancias
                                </a>
                            </div>
                        </div>


                        <div class="row mb-3">
                            <div class="col-12 col-md-12">
                                <div class="collapse" id="collapseExample">
                                    <div class="card card-body">

                                        <div class="row mb-3">
                                            <div class="col-12 col-md-6">
                                                <label for="norte">Al norte</label>
                                                <input class="form-field" placeholder="Escribe colindancia al norte" name="modelo" id="norte">
                                            </div>

                                            <div class="col-12 col-md-6">
                                                <label for="sur">Al sur</label>
                                                <input class="form-field" placeholder="Escribe colindancia al sur" name="marca" id="sur">
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-12 col-md-6">
                                                <label for="este">Al este</label>
                                                <input class="form-field" placeholder="colindancia al este" name="upc" id="este">
                                            </div>

                                            <div class="col-12 col-md-6">
                                                <label for="oeste">Al oeste</label>
                                                <input class="form-field" placeholder="colindancia al oeste" name="sat" id="oeste">
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>



                        <div class="row mb-3">
                            <div class="col-12 col-md-6">
                                <div class="btn btn-success" onclick="agregarProducto()">Agregar</div>
                            </div>
                        </div>



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
            </div>

            <div class="tab-pane" id="precios-tab" role="tabpanel" aria-labelledby="datos-precios">
                <div class="card">
                    <div class="card-header text-center">
                        <div class="row">
                            <div class="col-12 col-md-1" id="backbtn_area">
                                <div class="btn" onclick="RegresarAtras(1)">
                                    <i class="fa-solid fa-circle-left fa-2xl icono" style="color:#E5BE01"></i>
                                </div>

                            </div>
                            <div class="col-12 col-md-11">
                                <h5 class="card-title mb-0" id="title-card">¡Agrega mas precios a tu producto!</h5>
                            </div>
                        </div>
                    </div>

                    <div class="body-card" style="padding: 1rem;">

                    <div class="row mb-3 justify-content-between">
                            <div class="col-12 col-md-3">
                                <label for="costo-agregar">Costo</label>
                                <input class="form-field" placeholder="0.00" name="costo" id="costo-agregar" type="number">
                            </div>
                            <div class="col-4 col-md-3">
                                <label for="precio-base-agregar">Precio base</label>
                                <div class="row">
                                    <div class="col-9 col-md-9">
                                        <input class="form-field" placeholder="0.00" name="precio-base-agregar" id="precio-base-agregar" type="number">
                                    </div>
                                    <div class="col-3 col-md-3">
                                        <i class="fa-solid fa-plus mt-3" style="color:#20c997;"></i>
                                    </div>
                                </div>

                            </div>

                            <div class="col-4 col-md-3">
                                <label for="impuesto-agregar">Impuesto</label>

                                <div class="row">
                                    <div class="col-9 col-md-9">
                                        <select class="form-field" name="impuesto-agregar" id="impuesto-agregar" impuesto="">
                                            <option value="0">Sin desglosar</option>
                                            <option value="8" selected>IVA 8%</option>
                                            <option value="16">IVA 16%</option>
                                        </select>
                                    </div>
                                    <div class="col-3 col-md-3">
                                        <i class="fa-solid fa-equals fa-beat mt-3" style="color:#20c997;"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 col-md-3">
                                <label for="precio-total-agregar">Precio total</label>
                                <input class="form-field" placeholder="0.00" name="precio-total-agregar" id="precio-total-agregar" type="number">
                            </div>
                        </div>

                        <div class="row mb-3 justify-content-center">
                            <div class="col-12 col-md-8">
                                <label for="etiqueta-agregar"></label>
                                <input id="etiqueta-agregar" class="form-field" placeholder="Escribe una etiqueta">
                            </div>
                            <div class="col-12 col-md-2">
                                <div id="btn-agregar-precios" style="margin:32px;" class="btn btn-primary" onclick="agregarPrecioTmp()">Agregar</div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <table id="tabla-precios-tmp" class="table"></table>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>



    </div>
</div>