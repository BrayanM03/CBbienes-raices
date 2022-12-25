<div class="row mb-2 justify-content-center">
    <div class="col-12 col-md-8">
        <div class="row">
            <div class="col-2">
            <img src="./img/manzana.png" style="width: 30px;" alt=""/>

            </div>
            <div class="col-8">
            <h1 class="h3 mb-3 text-center">Agregar una nueva manzana</h1>
            </div>
            <div class="col-2">
        <img src="./img/manzana.png" style="width: 30px;" alt=""/>

            </div>
        </div>

       
    </div>
</div>

<div class="row justify-content-center">
    <div class="col-12 col-md-8">
        <div class="card">
            <div class="card-header text-center">
                <div class="row">
                    <div class="col-12 col-md-1" id="backbtn_area">
                        <div class="btn" onclick="RegresarAtras(1)">
                            <i class="fa-solid fa-circle-left fa-2xl icono" style="color:#E5BE01"></i>
                        </div>

                    </div>
                    <div class="col-12 col-md-11">
                        <h5 class="card-title mb-0" id="title-card">Desde este panel registra las manzanas de tu proyecto, de esa forma podras registrar un terreno nuevo</h5>
                    </div>
                </div>


            </div>
            <div class="card-body" id="card-body">

                <div class="row mb-3">

                    <div class="col-12 col-md-4">
                        <span class="mb-2">No. Manzana</span>
                        <input type="number" id="numero_manzana" class="form-field" placeholder="0">
                    </div>

                    <div class="col-12 col-md-4">
                        <label for="numero_lotes">Cantidad de lotes</label>
                        <input type="number" id="cantidad_lotes" class="form-field" placeholder="0">
                    </div>

                    <div class="col-12 col-md-4">
                        <label for="numero_lotes">Proyecto</label>
                        <select id="proyecto" class="form-field">
                            <option value="1">Monte alto</option>
                        </select>
                    </div>

                </div>


                <div class="row mb-3 justify-content-center" id="area-botones">
                    <div class="col-12 col-md-6 text-center">
                        <div class="btn btn-primary" id="btn-add-serie" onclick="agregarManzana()">Agregar</div>
                    </div>
                </div>



                <div class="row mt-5">
                    <div class="col-12 col-md-12">
                        <table id="example" class="table table-hover nowrap" style="width:100%">

                        </table>
                    </div>
                </div>


              

            </div>
        </div>
    </div>
</div>