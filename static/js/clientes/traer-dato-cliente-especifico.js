let id_cliente = obtenerParametroGet("id_customer");

var related_tables = {
  "01": {
    nombre: "detalle_direccion",
  },
  "02": {
    nombre: "detalle_correo",
  },
  "03": {
    nombre: "detalle_cuenta_bancaria",
  },
};
var data = {
  id: id_cliente,
  tabla: "clientes",
  relacion: true,
  tablas_relacionadas: related_tables, 
};

fetch("../servidor/database/traer-un-solo-dato.php", {
  method: "POST",
  body: JSON.stringify(data),
  headers: { "Content-Type": "application/json" },
})
  .then((res) => res.json())
  .catch((error) => {
    console.error("Error:", error);
    Swal.fire({
      icon: "error",
      html: "<h3>No existe un cliente con ese ID, selecciona un nuevo cliente porfavor</h3>",
      confirmButtonText: "Regresar al area de clientes",
      allowOutsideClick: false,
    }).then(function (response) {
      if (response.isConfirmed) {
        window.location.href = "clientes.php";
      }
    });
  })
  .then((response) => {
   
    let razon_social = document.getElementById("razon-social");
    let rfc = document.getElementById("rfc");
    let telefono = document.getElementById("telefono");
    let contacto = document.getElementById("contacto");
    let lugar_nacimiento= document.getElementById("lugar-nac");
    let fecha_nacimiento = document.getElementById("fecha-nac");
    let ocupacion = document.getElementById("ocupacion");
    let estado_civil = document.getElementById("estado-civil");

    $datos_generales = response.data;
    $direcciones = response.detalle_direccion;
    $correos = response.detalle_correo;
    $cuentas = response.detalle_cuenta_bancaria;


    Object.keys($datos_generales).forEach((element) => {
      razon_social.value = $datos_generales.nombre;
      rfc.value = $datos_generales.rfc;
      telefono.value = $datos_generales.telefono;
      contacto.value = $datos_generales.contacto;
      estado_civil.value = $datos_generales.estado_civil;
      lugar_nacimiento.value = $datos_generales.lugar_nacimiento;
      fecha_nacimiento.value = $datos_generales.fecha_nacimiento;
      ocupacion.value = $datos_generales.ocupacion;
    });

    if ($direcciones != "Sin registros") {
      var lista_direcciones = $("#direcciones-list");
      lista_direcciones.empty();

      Object.keys($direcciones).forEach((direccion) => {
        let direccion_item = $direcciones[direccion];

        let id_li = Math.random() * (9999 - 1000) + 1;
        let id_trash = Math.random() * (9999 - 1000) + 1;
        let lista_empty = $("#list-empty-dir").val();
        appendList(1);

        function appendList(type) {
          //Type == 1 -> Agregar direccion en list -- type == 2 -> Actualizar direccion
          if (type == 1) {
            count_click += 1;
            lista_direcciones.append(`
                <li class="list-group-item d-flex justify-content-between hover-list"
                id="${id_li}" 
                code="${id_li}"
                id_db="${direccion_item.id}"
                calle="${direccion_item.calle}"
                exterior = "${direccion_item.numero_ext}"
                interior = "${direccion_item.numero_int}" 
                colonia="${direccion_item.colonia}" 
                municipio="${direccion_item.municipio}" 
                estado ="${direccion_item.estado}"
                cp="${direccion_item.cp}"
                ciudad="${direccion_item.ciudad}"
                pais="${direccion_item.pais}"
                onclick="editarListDireccion(${id_li})"
                index_badge="${count_click}"
                value="1">
                <span class="badge bg-primary" style="height:23px; margin-right:7px;">${count_click}</span>
                <span class="ml-3">${direccion_item.calle} ${direccion_item.numero_ext} ${direccion_item.colonia} ${direccion_item.cp} ${direccion_item.municipio} ${direccion_item.estado} ${direccion_item.pais}</span>
                <div class="btn btn-sm btn-danger" id="I${id_trash}" onclick="eliminarDirList(${id_li}, 'Sin direcciones agregadas')" style="height:30px"><i class="fas fa-trash"></i></div>
                </li>
            `);
          }
        }
      });
    }

    if ($correos != "Sin registros") {
      let lista_correos = $("#correos-list");
      lista_correos.empty();

      Object.keys($correos).forEach((correo) => {
        let correo_item = $correos[correo];

        let id_list = Math.random() * (9999 - 1000) + 1;
        let id_trash = Math.random() * (9999 - 1000) + 1;
        let lista_empty = $("#list-empty-email").val();
        appendList(1);

        function appendList(type) {
          //Type == 1 -> Agregar direccion en list -- type == 2 -> Actualizar direccion
          if (type == 1) {
            count_click2 += 1;
            lista_correos.append(`
            <li class="list-group-item d-flex justify-content-between hover-list"
            id=${id_list}
            onclick="editarListEmail(${id_list})" 
            code="${id_list}"
            id_db="${correo_item.id}"
            correo="${correo_item.correo}"
            etiqueta="${correo_item.etiqueta}"
            value="1"
            index_badge="${count_click2}"
            >
            <span class="badge bg-primary" style="height:23px; margin-right:7px;">${count_click2}</span>
            <span class="ml-3"><b>${correo_item.etiqueta}:</b> ${correo_item.correo}</span>
            <div class="btn btn-sm btn-danger" id="I${id_trash}" onclick="eliminarEmailList(${id_list}, 'Sin correos agregados')" style="height:30px"><i class="fas fa-trash"></i></div>
            </li>
        `);
          }
        }
      });
    }

    if ($cuentas != "Sin registros") {
      let lista_cuentas = $("#count-list");
      lista_cuentas.empty();

      Object.keys($cuentas).forEach((cuenta) => {
        let cuenta_item = $cuentas[cuenta];

        let id_list = Math.random() * (9999 - 1000) + 1;
        let id_trash = Math.random() * (9999 - 1000) + 1;
        let lista_empty = $("#list-empty-count").val();
        appendList(1);

        function appendList(type) {
          //Type == 1 -> Agregar direccion en list -- type == 2 -> Actualizar direccion
          if (type == 1) {
            count_click3 += 1;
            lista_cuentas.append(`
      <li class="list-group-item d-flex justify-content-between hover-list"
      id="${id_list}"
      onclick="editarListCuenta(${id_list})"
      code="${id_list}"
      id_db="${cuenta_item.id}"
      cuenta="${cuenta_item.cuenta}"
      nombre_cuenta="${cuenta_item.nombre}"
      banco="${cuenta_item.banco}"
      rfc="${cuenta_item.rfc_banco}"
      index_badge="${count_click3}"
      value="1"
      >
      <span class="badge bg-primary badge-pill" style="height:23px; margin-right:10px">${count_click3}</span>
      <span class="ml-3"><div class="row">
                         <div class="col-12"><b>${cuenta_item.nombre}:</b> ${cuenta_item.cuenta}</div>
                         <div class="col-12" style="font-size: 10px"><b>${cuenta_item.banco}:</b> ${cuenta_item.rfc_banco}</div></div></span>
      <div class="btn btn-sm btn-danger" id="I${id_trash}" onclick="eliminarCountList(${id_list}, 'Sin cuentas agregadas')" style="height:30px"><i class="fas fa-trash"></i></div>
      </li>
    `);
          }
        }
      });
    }
  });

function obtenerParametroGet(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

cambiandoDatos(id_cliente);
function cambiandoDatos(id_cliente) {
  $("#area-btn-cliente-nuevo").empty().append(`
    <div class="btn btn-success" tipo_cliente="empresa" onclick="actualizarCliente(${id_cliente});" id="bnt-reg-cliente">Actualizar</div>
    `);
}
