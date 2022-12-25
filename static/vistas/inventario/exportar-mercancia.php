

<div class="remision-salida-formulario">
    <div class="row mb-2">
        <div class="col-12 col-md-9">
            <h1 class="h3 mb-3 text-start">Remisión de salida de productos</h1>
        </div>
        <div class="col-12 col-md-3">
            <input type="date" class="form-field" id="fecha"/>
        </div>
    </div>

    <div class="row mb-2">
        <div class="col-12 col-md-9">
            <div id="nombre_cliente" class="d-none"></div>
            <label for="cliente">Buscar cliente</label>
            <select class="form-field" id="cliente">
            </select>
        </div>
        <div class="col-12 col-md-3">
            <label for="sucursal">Sucursal</label>
            <select class="form-field" id="sucursal">
                <option value="1">Buena Vista</option>
            </select>
        </div>
    </div>

    <div class="row mb-3">
        <div class="col-12 col-md-7">
            <label for="producto">Buscar producto</label>
            <select type="text" class="form-field" id="producto">
        </select>
        </div>
        <div class="col-6 col-md-3">
             <label class="cantidad">Cantidad</label>
             <input type="number" class="form-field" id="cantidad" placeholder="0">
        </div>
        <div class="col-6 col-md-2" style="margin-top:24px;">
             <div class="btn btn-info" id="agregar" onclick="agregarATabla()">Agregar</div>
        </div>
    </div>

    <table class="table table-striped mb-3" id="example">

    </table>

    <div class="row mb-3">
        <div class="col-12">
            <label for="comentario">Comentarios adicionales</label>
            <textarea name="comentario" class="form-field" id="comentario" rows="3"></textarea>
        </div>
    </div>

    <div class="row justify-content-center">
        <div class="col-5 col-md-3">
            <div class="btn btn-warning text-black" onclick="realizarRemision()">Realizar remisión</div>
        </div>
    </div>
</div>

