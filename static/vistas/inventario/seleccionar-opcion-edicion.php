<div class="row mb-2">
    <div class="col-12 col-md-12">
        <h1 class="h3 mb-3 text-center">Selecciona una opción</h1>
    </div>
</div>

<div class="row justify-content-center">
    <div class="col-12 col-md-10">
        <div class="card">
            <div class="card-header text-center">
            <div class="col-12 col-md-1" id="backbtn_area">
                    <div class="btn"> 
                        <a href="inventario.php?store_id=<?php echo $_GET['store_id'] ?>&name=<?php echo $_GET['name'] ?>"><i class="fa-solid fa-circle-left fa-2xl icono" style="color:#E5BE01"></i></a>
                    </div>

                </div>
                <div class="col-12 col-md-11">
                <h5 class="card-title mb-0">Okey, ¿Quieres registrar un nuevo producto o ingresar nueva mercancia?</h5>
                </div>

              
            </div>
            <div class="card-body">

            <div class="row justify-content-center">

                <div class="col-12 col-md-4">

                        <div class="option-card" id="card-aire" onclick="clickEditarProducto()">
                            <img src="./img/compu.png" class="animate__animated" id="imagen-aire" alt="imagen-aire" style="width:120px;">
                            <p class="mt-3">Editar datos generales del producto</p>

                        </div>
                
                </div>

                <div class="col-12 col-md-4">
                        <div class="option-card" id="card-check" onclick="clickEditarSeries()">
                                <img src="./img/checklist.png" class="animate__animated" id="imagen-checklist" alt="imagen-cheklist" style="width:120px;">
                                 <p class="mt-3">Agregar/editar series a producto</p>
                        </div>
                </div>

            </div>

            </div>
        </div>
    </div>
</div>