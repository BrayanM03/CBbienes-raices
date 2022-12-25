

<div class="remision-salida-formulario">
    <div class="row mb-2">
        <div class="col-12 col-md-6">
            <h1 class="h3 mb-3 text-start">Nueva compra venta</h1>
        </div>
        <div class="col-12 col-md-3">
            <input type="date" value="<?php echo date("Y-m-d")?>" class="form-field" id="fecha"/>
        </div>
    </div>

    <div class="row mb-2">
        <div class="col-12 col-md-7">
            <div id="nombre_cliente" class="d-none"></div>
            <label for="cliente">Buscar cliente</label>
            <select class="form-field" id="cliente">
            </select>
        </div>
       <!--  <div class="col-12 col-md-3">
            <label for="sucursal">Sucursal</label>
            <select class="form-field" id="sucursal">
                <option value="1">Buena Vista</option>
            </select>
        </div> -->
        <!-- <div class="col-12 col-md-2">
        <label for="tasa">Tasa</label>
        <select class="form-field" id="tasa">
                    <option value="0.08">IEPS 8%</option>
                    <option value="0">IVA 0%</option>
                    <option value="0.16" selected>IVA 16%</option>
        </select>
        </div> -->
    </div>

    <div class="row mb-2">
        <div class="col-12 col-md-7">
           
            <label for="direccion_cliente">Dirección</label>
            <select class="form-field" id="direccion_cliente">
                <option value="null">No hay una dirección seleccionada</option>
            </select>
        </div>
        <div class="col-12 col-md-6">
             <label class="correo_cliente">Correo</label>
             <select class="form-field" id="correo_cliente">
                <option value="null">Selecciona un correo</option>
             </select>
        </div>
        <div class="col-12 col-md-6">
             <label class="telefono_cliente">Teléfono</label>
             <input type="text" class="form-field" id="telefono_cliente" placeholder="Teléfono">
        </div>
    </div>

    <div class="row mb-3">
       <!--  <div class="col-12 col-md-7">
            <label for="producto">Buscar producto</label>
            <select type="text" class="form-field" id="producto">
        </select>
        </div>
        <div class="col-6 col-md-3">
             <label class="cantidad">Cantidad</label>
             <input type="number" class="form-field" id="cantidad" placeholder="0">
        </div> -->
        
    </div>

    <div class="row mb-3" style="border: 1px solid #CDD9ED; border-radius: 8px; padding:1rem; background-color:aliceblue">
  
        <div class="col-12 col-md-3">
            <label for="costo">Proyecto</label>
            <select class="form-field" id="proyecto">
                <option value="null">Selecciona un proyecto</option>
                <option value="1">Monte alto</option>
            </select>
        </div>

        <div class="col-12 col-md-3">
            <label for="porcentaje">Manzana</label>
            <select class="form-field disabled" id="manzana" disabled>
                <option value="null">Selecciona una manzana</option>
            </select>
        </div>

        <div class="col-12 col-md-3">
            <label for="lote">Lote</label>
            <select class="form-field" id="lote" disabled>
                <option value="null">Selecciona un lote</option>
            </select>
        </div>

        <div class="col-12 col-md-3">
            <label for="precio">Precio</label>
            <input class="form-field" id="precio" placeholder="0.00" type="number">
        </div>

        <div class="row mt-3">
            <div class="col-12">
                Colindacias
            </div>
        </div>
        <div class="row mt-1 d-none" id="area-colindancias">
        <div class="col-12 col-md-3">
            <label for="norte"><b>Norte</b></label>
            <input class="form-field" id="norte" placeholder="Colindancia al norte" type="text">
        </div>

        <div class="col-12 col-md-3">
            <label for="sur"><b>Sur</b></label>
            <input class="form-field" id="sur" placeholder="Colindancia al sur" type="text">
        </div>
        <div class="col-12 col-md-3">
            <label for="este"><b>Este</b></label>
            <input class="form-field" id="este" placeholder="Colindancia al este" type="text">
        </div>
        <div class="col-12 col-md-3">
            <label for="oeste"><b>Oeste</b></label>
            <input class="form-field" id="oeste" placeholder="Colindancia al oeste" type="text">
        </div>

        <div class="row">
            <div class="col-12 col-md-4">
                <label for="enganche"><b>Enganche</b></label>
                <input class="form-field" id="enganche" placeholder="0.00" type="number">
            </div>
            <div class="col-12 col-md-4">
                <label for="plazo"><b>Plazo</b></label>
                <input class="form-field" id="plazo" placeholder="0" type="number">
            </div>
            <div class="col-12 col-md-4">
                <label for="mensualidad"><b>Mensualidad</b></label>
                <input class="form-field" id="mensualidad" placeholder="0.00" type="number">
            </div>
        </div>
        </div>
        

        <div class="col-6 col-md-2" style="margin-top:24px;">
             <div class="btn btn-info" id="agregar" onclick="agregarATabla()">Agregar</div>
        </div>

       <!--  <div class="row mt-2 justify-content-center">
            <div class="col-12 col-md-3">
                <label for="descuento">Descuento</label>
                <input class="form-field" id="descuento" placeholder="0.00" type="number">
            </div>
        </div> -->

        <!-- <div class="row mt-2 justify-content-center">
            <div class="col-12 col-md-12 text-center">
                <span>Precio base: <span id="precio_base_label">$0.00</span> MXN x <span id="cantidad_label">0</span> articulos = <span id="precio_base_total_label">$0.00</span> MXN - descuento de <span id="descuento_label">$0.00</span>MXN = <span id="precio_final_label">$0.00</span>MXN
            </div>
        </div> -->
    </div>

    <table class="table table-striped mb-3" id="example">

    </table>

    <div class="row justify-content-end">
        <div class="col-12 col-md-3">
        <div id="area-totales">
            <div class="row">
            <div class="col-12 col-md-6" style="display:flex; flex-direction:column; align-items:end">
              <!--   <span class="span-pric">Subtotal</span>
                <span class="span-pric">Descuento</span>
                <span class="span-pric">Tasa </span>
                <span class="span-pric">Impuesto</span> -->
                <span class="total">Total</span>
            </div>
            <div class="col-12 col-md-6" style="display:flex; flex-direction:column; align-items:end">
            <!-- <span class="span-pric" id="subtotal_final">$0.00</span>
            <span class="span-pric" id="descuento_final">$0.00</span>
            <span class="span-pric" id="tasa_final">0%</span>
            <span class="span-pric" id="impuesto_final">$0.00</span> -->
            <span class="span-pric total" id="total_final">$0.00</span>

            </div>
            </div>
        
        
        </div>
        </div>
    </div>

    <div class="row mb-3">
        <div class="col-12">
            <label for="comentario">Comentarios adicionales</label>
            <textarea name="comentario" class="form-field" id="comentario" rows="3"></textarea>
        </div>
    </div>

    <div class="row justify-content-center">
        <div class="col-5 col-md-3">
            <div class="btn btn-warning text-black" onclick="realizarCompraVenta()">Realizar compraventa</div>
        </div>
    </div>
</div>

