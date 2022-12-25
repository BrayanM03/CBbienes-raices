<!-- TESTE DE DESARROLLO DE PAGINA -->
<?php
    session_start();
    include_once '../../../servidor/database/conexion.php'
?>
<div class="row mb-2">
    <div class="col-12 col-md-12">
        <h1 class="h3 mb-3 text-center">Actualizar información del producto</h1>
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
            <li class="nav-item">
                <a class="nav-link" id="datos-precios" data-toggle="tab" href="#precios-tab" role="tab" aria-controls="precios-tab" aria-selected="false">
                    <span style="font-size: 19px; color: Gray;"><i class="fa-solid fa-money-bill-wave"></i></span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="datos-imagenes" data-toggle="tab" href="#imagenes-tab" role="tab" aria-controls="imagenes-tab" aria-selected="false">
                    <span style="font-size: 19px; color: Gray;"><i class="fa-solid fa-images"></i></span>
                </a>
            </li>
            
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
                                <h5 class="card-title mb-0" id="title-card">Puedes actualizar los datos del producto</h5>
                            </div>
                        </div>


                    </div>
                    <div class="card-body" id="card-body">

                        <div class="row mb-3">
                            <div class="col-12 col-md-6">

                                <label for="codigo">Codigo</label>
                                <!-- <select name="proveedor" class="form-control" id="proveedor"></select> -->
                                <input name="codigo" value="<?php echo $_POST["codigo"]?>" class="form-field" id="codigo" placeholder="Escribe un codigo interno" disabled>
                                <div class="col-12 text-end"><small class="d-none" valid="false" id="small_response">Codigo en uso</small></div>
                            </div>
                            <!-- <div class="col-12 col-md-2 mt-4">
                                    <div class="btn btn-info" onclick="generarCodigo()">Generar</div>
                                </div> -->


                        </div>

                        <div class="row mb-3">
                            <div class="col-12 col-md-6">
                                <label for="modelo">Categoria</label>
                                <select class="form-field" name="categoria" id="categoria">
                                    <option value="null">Selecciona una categoria</option>
                                    <option value="computacion" <?=$_POST['categoria'] == 'computacion' ? ' selected="selected"' : '';?>>Computación</option>
                                    <option value="seguridad" <?=$_POST['categoria'] == 'seguridad' ? ' selected="selected"' : '';?>>Seguridad</option>
                                    <option value="impresion" <?=$_POST['categoria'] == 'impresion' ? ' selected="selected"' : '';?>>Impresion</option>
                                    <option value="redes" <?=$_POST['categoria'] == 'redes' ? ' selected="selected"' : '';?>>Redes</option>
                                    <option value="punto_de_venta" <?=$_POST['categoria'] == 'punto_de_venta' ? ' selected="selected"' : '';?>>Punto de venta</option>


                                </select>
                            </div>

                            <div class="col-12 col-md-6">
                                <label for="marca">Subcategoria</label>
                                <select class="form-field" style="color: gray" name="subcategoria" id="subcategoria">
                                    <option value="null">Primero elige una categoria</option>
                                    <?php

                                        switch ($_POST['categoria']) {
                                            case 'computacion':
                                              
                                            ?>
                                                 <option value="almacenamiento" <?=$_POST['subcategoria'] == 'almacenamiento' ? ' selected="selected"' : '';?>>Almacenamiento</option>
                                                 <option value="accesorios" <?=$_POST['subcategoria'] == 'accesorios' ? ' selected="selected"' : '';?>>Accesorios</option>
                                                 <option value="energia" <?=$_POST['subcategoria'] == 'energia' ? ' selected="selected"' : '';?>>Energia</option>
                                                 <option value="equipos" <?=$_POST['subcategoria'] == 'equipos' ? ' selected="selected"' : '';?>>Equipos</option>
                                                 <option value="gaming" <?=$_POST['subcategoria'] == 'gaming' ? ' selected="selected"' : '';?>>Gaming</option>
                                                 <option value="mantenimiento" <?=$_POST['subcategoria'] == 'mantenimiento' ? ' selected="selected"' : '';?>>Mantenimiento</option>
                                                 <option value="software" <?=$_POST['subcategoria'] == 'software' ? ' selected="selected"' : '';?>>Software</option>

                                            <?php

                                            break;

                                            case 'seguridad':
                                              
                                                ?>
                                                     <option value="cctv" <?=$_POST['subcategoria'] == 'cctv' ? ' selected="selected"' : '';?>>CCTV</option>
                                                     <option value="accesorios" <?=$_POST['subcategoria'] == 'accesorios' ? ' selected="selected"' : '';?>>Accesorios</option>
                                                     <option value="control_acceso" <?=$_POST['subcategoria'] == 'control_acceso' ? ' selected="selected"' : '';?>>Control de acceso</option>
                                                     
                                                <?php
    
                                            break;

                                            case 'impresion':
                                              
                                                ?>
                                                     <option value="consumibles" <?=$_POST['subcategoria'] == 'consumibles' ? ' selected="selected"' : '';?>>Consumibles</option>
                                                     <option value="impresoras" <?=$_POST['subcategoria'] == 'impresoras' ? ' selected="selected"' : '';?>>Impresoras</option>

                                                <?php
    
                                            break;
                                            
                                            case 'Redes':
                                              
                                                ?>
                                                     <option value="cableado_estructurado" <?=$_POST['subcategoria'] == 'cableado_estructurado' ? ' selected="selected"' : '';?>>Cableado estructurado</option>
                                                     <option value="conectividad" <?=$_POST['subcategoria'] == 'conectividad' ? ' selected="selected"' : '';?>>Conectividad</option>
                                                     <option value="herramientas" <?=$_POST['subcategoria'] == 'herramientas' ? ' selected="selected"' : '';?>>Herramientas</option>
                                                     <option value="telefonia" <?=$_POST['subcategoria'] == 'telefonia' ? ' selected="selected"' : '';?>>Telefonia</option>
                                                     
                                                <?php
    
                                            break;

                                            case 'punto_de_venta':
                                              
                                                ?>
                                                     <option value="cajones" <?=$_POST['subcategoria'] == 'cajones' ? ' selected="selected"' : '';?>>Cajones</option>
                                                     <option value="impresoras_termicas" <?=$_POST['subcategoria'] == 'impresoras_termicas' ? ' selected="selected"' : '';?>>Impresoras termicas</option>
                                                     <option value="escaners" <?=$_POST['subcategoria'] == 'escaners' ? 'selected="selected"'  : '';?>>Escaners</option>
                                                    
                                                <?php
    
                                            break;
                                            
                                            default:
                                                # code...
                                                break;
                                        }

                                    ?>
                                </select>
                            </div>
                        </div>



                        <div class="row mb-3">
                            <div class="col-12 col-md-6">
                                <label for="cantidad">Cantidad</label>
                                <input class="form-field" type="number" placeholder="0" name="cantidad" id="cantidad" value="<?php echo $_POST["stock"]?>">
                            </div>

                            <div class="col-12 col-md-6">
                                <span class="mb-2">Sucursal a agregar</span>
                                <select class="form-field mb-1" id="sucursal" name="sucursal">
                                    <option value="1">Buena vista</option>
                                </select>
                            </div>

                        </div>

                        <div class="row mb-3 justify-content-between">
                            <div class="col-12 col-md-3">
                                <label for="costo">Costo</label>
                                <input class="form-field" value="<?php echo $_POST["costo"]?>" placeholder="0.00" name="costo" id="costo" type="number">
                            </div>
                            <div class="col-4 col-md-3">
                                <label for="precio-base">Precio base</label>
                                <div class="row">
                                    <div class="col-9 col-md-9">
                                        <input class="form-field" value="<?php echo $_POST["precio_base"]?>" placeholder="0.00" name="precio-base" id="precio-base" type="number">
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
                                            <option value="0" <?=$_POST['tasa'] == 0 ? ' selected="selected"' : '';?>>Sin desglosar</option>
                                            <option value="8" <?=$_POST['tasa'] == 8 ? ' selected="selected"' : '';?>>IVA 8%</option>
                                            <option value="16" <?=$_POST['tasa'] == 16 ? ' selected="selected"' : '';?>>IVA 16%</option>
                                        </select>
                                    </div>
                                    <div class="col-3 col-md-3">
                                        <i class="fa-solid fa-equals fa-beat mt-3" style="color:#20c997;"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 col-md-3">
                                <label for="precio-total">Precio total</label>
                                <input class="form-field" value="<?php echo $_POST["precio_total"]?>" placeholder="0.00" name="precio-total" id="precio-total" type="number">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-12 col-md-12">
                                <label for="descripcion">Descripción</label>
                                <textarea autocapitalize="sentences" class="form-field" placeholder="Escribe una descripción del producto" id="descripcion"><?php echo $_POST["descripcion"]?></textarea>
                            </div>
                        </div>

                        <div class="row mb-3 justify-content-end">
                            <div class="col-12 col-md-3 text-end">
                                <a class="buttom-advanced-options" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                    Campos adicionales
                                </a>
                            </div>
                        </div>


                        <div class="row mb-3">
                            <div class="col-12 col-md-12">
                                <div class="collapse" id="collapseExample">
                                    <div class="card card-body">

                                        <div class="row mb-3">
                                            <div class="col-12 col-md-6">
                                                <label for="modelo">Modelo</label>
                                                <input class="form-field" value="<?php echo $_POST["modelo"]?>" placeholder="Escribe un modelo" name="modelo" id="modelo">
                                            </div>

                                            <div class="col-12 col-md-6">
                                                <label for="marca">Marca</label>
                                                <input class="form-field" value="<?php echo $_POST["marca"]?>" placeholder="Escribe una marca" name="marca" id="marca">
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-12 col-md-6">
                                                <label for="modelo">UPC</label>
                                                <input class="form-field" value="<?php echo $_POST["upc"]?>" placeholder="Escribe un codigo de barras UPC" name="upc" id="upc">
                                            </div>

                                            <div class="col-12 col-md-6">
                                                <label for="marca">Clave SAT</label>
                                                <input class="form-field" value="<?php echo $_POST["sat_key"]?>" placeholder="Escribe una clave SAT" name="sat" id="sat">
                                            </div>
                                        </div>

                                        

                                    </div>
                                </div>
                            </div>
                        </div>



                        <div class="row mb-3">
                            <div class="col-12 col-md-6">
                                <div class="btn btn-success" onclick="actualizarProducto(<?php echo $_POST['id_producto']?>)">Actualizar</div>
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
                                <h5 class="card-title mb-0" id="title-card">¡Edita o agrega mas precios a tu producto!</h5>
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
                                <div id="btn-agregar-precios" style="margin:32px;" class="btn btn-primary" onclick="agregarPrecio(<?php echo $_POST['id_producto']?>)">Agregar</div>
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

            <div class="tab-pane" id="imagenes-tab" role="tabpanel" aria-labelledby="datos-imagenes">
                 <div class="card">
                 <div class="card-header text-center">
                        <div class="row">
                            <div class="col-12 col-md-1" id="backbtn_area">
                                <div class="btn" onclick="RegresarAtras(1)">
                                    <i class="fa-solid fa-circle-left fa-2xl icono" style="color:#E5BE01"></i>
                                </div>

                            </div>
                            <div class="col-12 col-md-11">
                                <h5 class="card-title mb-0" id="title-card">¡Agrega o elimina imagenes!</h5>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center mt-3">
                        <div class="col-12 col-md-10" id="area-canv">

                           <div class="canvas" id="contenedor-canvas-1">
                               <div class="btn-delete-img d-none" id="btn-delete1" onclick="eliminarImagen(1)">
                                        <i class="fa-solid fa-x"></i>
                                </div>
                                <canvas id="canvas1" onclick="remplazarImagen(1)" action="#">
                                        
                                    <div class="fallback d-none">
                                        <input type="file" name="file" id="input-file-1" accept="image/*">
                                    </div>
                                </canvas>
                          
                           </div>
                            
                            <div class="canvas" id="contenedor-canvas-2">
                                <div class="btn-delete-img d-none" id="btn-delete2" onclick="eliminarImagen(2)">
                                        <i class="fa-solid fa-x"></i>
                                </div>
                                <canvas id="canvas2" onclick="remplazarImagen(2)" action="#">
                                    
                                    <div class="fallback d-none">
                                        <input type="file" name="file" id="input-file-2" accept="image/*">
                                    </div>
                                </canvas>
                            </div>
                           
                            <div class="canvas" id="contenedor-canvas-3">
                                <div class="btn-delete-img d-none" id="btn-delete3" onclick="eliminarImagen(3)">
                                        <i class="fa-solid fa-x"></i>
                                </div>
                                <canvas id="canvas3" onclick="remplazarImagen(3)" action="#">
                                    
                                    <div class="fallback d-none">
                                        <input type="file" name="file" id="input-file-3" accept="image/*">
                                    </div>
                                </canvas>
                            </div>
                            

                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="instrucciones">
                                    Elige una imagen para actualizarla o clickea en la equis al posicionar sobre ella para eliminarla

                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>



    </div>
</div>