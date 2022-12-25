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
                   <!--  <div class="btn">
                        <a href="inventario.php?store_id=<?php echo $_GET['store_id'] ?>&name=<?php echo $_GET['name'] ?>"><i class="fa-solid fa-circle-left fa-2xl icono" style="color:#E5BE01"></i></a>
                    </div> -->

                </div>
                <div class="col-12 col-md-11">
                    <h5 class="card-title mb-0">Registra las manzanas que usaras despues al registrar un nuevo terreno</h5>
                </div>
            </div>

            <div class="card-body">

                <div class="row justify-content-center">

                    <div class="col-12 col-md-5 mt-3">

                        <div class="option-card text-center" id="card-aire" onclick="clickNuevoProducto()">
<!--                             <img src="./img/new_item.gif" class="animate__animated" id="imagen-aire" alt="imagen-aire" style="width:120px;">
 -->                        <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_i3mq3e9v.json" background="transparent"  speed="1"  style="width: 250px; height: 250px;" loop autoplay></lottie-player>

                            <p class="mt-3">Registrar un nuevo terreno al catalogo</p>

                        </div>

                    </div>

                    <div class="col-12 col-md-5 mt-3">
                        <div class="option-card text-center" id="card-check" onclick="clickagregarSeries()">
                            <!-- <img src="./img/existing_item.gif" class="animate__animated" id="imagen-checklist" alt="imagen-cheklist" style="width:120px;"> -->
                            <lottie-player src="https://assets6.lottiefiles.com/private_files/lf30_p5tali1o.json" background="transparent"  speed="1"  style="width: 250px; height: 250px;" loop autoplay></lottie-player>

                            <p class="mt-3">Registrar manzana</p>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</div>