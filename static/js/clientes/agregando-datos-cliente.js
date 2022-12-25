var count_click = 0;
var count_click2 = 0;
var count_click3 = 0;
var count_click4 = 0;

function agregarDireccion(type) {
  var calle = $("#calle").val() ? $("#calle").val() : "";
  var num_ext = $("#exterior").val() ? $("#exterior").val() : "";
  var num_int = $("#interior").val() ? $("#interior").val() : "";
  var cp = $("#zip").val() ? $("#zip").val() : "";
  var colonia = $("#colonia").val() ? $("#colonia").val() : "";
  var ciudad = $("#ciudad").val() ? $("#ciudad").val() : "";
  var municipio = $("#municipio").val() ? $("#municipio").val() : "";
  var estado = $("#estado").val() ? $("#estado").val() : "";
  var pais = $("#pais").val() ? $("#pais").val() : "";

  

  let lista_direcciones = $("#direcciones-list");

  let id_li = Math.random() * (9999 - 1000) + 1;
  let id_trash = Math.random() * (9999 - 1000) + 1;
  lista_empty = $("#list-empty-dir").val();
  if (cp == 0 || cp == "") {
    alert("Agrega codigo postal");
  } else {
    
    if (lista_empty == 0) {
      lista_direcciones.empty();

      appendList(type);
    } else {
     
      appendList(type);
    }
  }

  function appendList(type) {
    //Type == 1 -> Agregar direccion en list -- type == 2 -> Actualizar direccion 
    if(type == 1){
      count_click += 1;
      lista_direcciones.append(`
      <li class="list-group-item d-flex justify-content-between hover-list"
      id="${id_li}" 
      code="${id_li}"
      calle="${calle}"
      exterior = "${num_ext}"
      interior = "${num_int}" 
      colonia="${colonia}" 
      municipio="${municipio}" 
      estado ="${estado}"
      cp="${cp}"
      ciudad="${ciudad}"
      pais="${pais}"
      onclick="editarListDireccion(${id_li})"
      index_badge="${count_click}"
      value="1">
      <span class="badge bg-primary" style="height:23px; margin-right:7px;">${count_click}</span>
      <span class="ml-3">${calle} ${num_ext} ${colonia} ${cp} ${municipio} ${estado} ${pais}</span>
      <div class="btn btn-sm btn-danger" id="I${id_trash}" onclick="eliminarDirList(${id_li}, 'Sin direcciones agregadas')" style="height:30px"><i class="fas fa-trash"></i></div>
      </li>
  `);

    }else if(type == 2){
      
      let list = document.querySelector('#direcciones-list').getElementsByTagName('li');
      let id_actual_direction = $("#btn-update-dir").attr("id_li");
      let index_badge = $("#btn-update-dir").attr("estatus_click"); 
      [].forEach.call(list, element => {
        let  id_cicle_direccion = element.getAttribute("code");
     
        if(id_actual_direction == id_cicle_direccion){
          element.setAttribute("id", id_actual_direction) 
          element.setAttribute("code", id_actual_direction);
          element.setAttribute("calle", calle);
          element.setAttribute("exterior", num_ext);
          element.setAttribute("interior", num_int); 
          element.setAttribute("colonia", colonia);
          element.setAttribute("municipio", municipio); 
          element.setAttribute("estado", estado);
          element.setAttribute("cp", cp);
          element.setAttribute("ciudad", ciudad);
          element.setAttribute("pais", pais);
          element.setAttribute("cp", cp);
          element.setAttribute("index_badge", index_badge);

          element.innerHTML = `
          <span class="badge bg-primary" style="height:23px; margin-right:7px;">${index_badge}</span>
          <span class="ml-3">${calle} ${num_ext} ${colonia} ${cp} ${municipio} ${estado} ${pais}</span>
          <div class="btn btn-sm btn-danger" id="I${id_trash}" onclick="eliminarDirList(${ id_actual_direction }, 'Sin direcciones agregadas')" style="height:30px"><i class="fas fa-trash"></i></div>
          
          `;
        
        }
        
      });
    }
   
  }

}

//Agregar dato a la lista
function agregarCorreo(type) {
  var correo = $("#email").val();
  var etiqueta = $("#etiqueta").val();
  if (etiqueta == "") {
    etiqueta = "Sin etiqueta";
  }

  var result = $("#result").attr("value");
  if (result == "valid") {
   

    var lista_correos = $("#correos-list");

    id_list = Math.random() * (9999 - 1000) + 1;
    id_trash = Math.random() * (9999 - 1000) + 1;
    let lista_empty = $("#list-empty-email").val();
    if (lista_empty == 0) {
      lista_correos.empty();
      appendListCorreo(type);
    } else {
      appendListCorreo(type);
    }
  } else {
    animateCSS("#email", "headShake");
  }


  function appendListCorreo(type) {
    
    if(type == 1){
      
      count_click2 += 1;
      lista_correos.append(`
      <li class="list-group-item d-flex justify-content-between hover-list"
      id=${id_list}
      onclick="editarListEmail(${id_list})" 
      code="${id_list}"
      correo="${correo}"
      etiqueta="${etiqueta}"
      value="1"
      index_badge="${count_click2}"
      >
      <span class="badge bg-primary" style="height:23px; margin-right:7px;">${count_click2}</span>
      <span class="ml-3"><b>${etiqueta}:</b> ${correo}</span>
      <div class="btn btn-sm btn-danger" id="I${id_trash}" onclick="eliminarEmailList(${id_list}, 'Sin correos agregados')" style="height:30px"><i class="fas fa-trash"></i></div>
      </li>
  `);

  

    }else if(type == 2){
      
      
      let list = document.querySelector('#correos-list').getElementsByTagName('li');
      let id_actual_correo = $("#btn-update-correo").attr("id_li");
      let index_badge = $("#btn-update-correo").attr("estatus_click"); 
      [].forEach.call(list, element => {
        let  id_cicle_correo = element.getAttribute("code");
     
        if(id_actual_correo == id_cicle_correo){
          element.setAttribute("id", id_actual_correo) 
          element.setAttribute("code", id_actual_correo);
          element.setAttribute("correo", correo);
          element.setAttribute("etiqueta", etiqueta);
          element.setAttribute("index_badge", index_badge);

          element.innerHTML = `
          <span class="badge bg-primary" style="height:23px; margin-right:7px;">${index_badge}</span>
          <span class="ml-3"><b>${etiqueta}:</b> ${correo}</span>
          <div class="btn btn-sm btn-danger" id="I${id_trash}" onclick="eliminarEmailList(${ id_actual_correo }, 'Sin correos')" style="height:30px"><i class="fas fa-trash"></i></div>
          
          `;
        
        }
        
      });

    }
    
  }
}

function agregarCuentaList(type) {
  var nombre_cuenta = $("#nombre-cuenta").val();
  var cuenta = $("#cuenta").val();
  var rfc_banco = $("#banco").val();
  var banco = $("#banco option:selected").text();

  if (nombre_cuenta == "") {
    nombre_cuenta = "Sin nombre";
  }

  if (cuenta !== "") {
    count_click3 += 1;
    var lista_cuentas = $("#count-list");

    id_list = Math.random() * (9999 - 1000) + 1;
    id_trash = Math.random() * (9999 - 1000) + 1;
    lista_empty = $("#list-empty-count").val();
    if (lista_empty == 0) {
      lista_cuentas.empty();
      appendListCuenta(type);
    } else {
      appendListCuenta(type);
    }
  } else {
    animateCSS("#cuenta", "headShake");
  }

  function appendListCuenta(type) {
    if(type == 1){
      lista_cuentas.append(`
      <li class="list-group-item d-flex justify-content-between hover-list"
      id="${id_list}"
      onclick="editarListCuenta(${id_list})"
      code="${id_list}"
      cuenta="${cuenta}"
      nombre_cuenta="${nombre_cuenta}"
      banco="${banco}"
      rfc="${rfc_banco}"
      index_badge="${count_click3}"
      value="1"
      >
      <span class="badge bg-primary badge-pill" style="height:23px; margin-right:10px">${count_click3}</span>
      <span class="ml-3"><div class="row">
                         <div class="col-12"><b>${nombre_cuenta}:</b> ${cuenta}</div>
                         <div class="col-12" style="font-size: 10px"><b>${banco}:</b> ${rfc_banco}</div></div></span>
      <div class="btn btn-sm btn-danger" id="I${id_trash}" onclick="eliminarCountList(${id_list}, 'Sin cuentas agregadas')" style="height:30px"><i class="fas fa-trash"></i></div>
      </li>
    `);
    }else if(type == 2){
       
      let list = document.querySelector('#count-list').getElementsByTagName('li');
      let id_actual_cuenta = $("#btn-update-cuentas").attr("id_li");
      let index_badge = $("#btn-update-cuentas").attr("estatus_click"); 
      [].forEach.call(list, element => {
        let  id_cicle_cuenta = element.getAttribute("code");
     
        if(id_actual_cuenta == id_cicle_cuenta){
          element.setAttribute("id", id_actual_cuenta) 
          element.setAttribute("code", id_actual_cuenta);
          element.setAttribute("cuenta", cuenta);
          element.setAttribute("nombre_cuenta", nombre_cuenta);
          element.setAttribute("banco", banco);
          element.setAttribute("rfc", rfc_banco);
          element.setAttribute("index_badge", index_badge);

          element.innerHTML = `
          <span class="badge bg-primary" style="height:23px; margin-right:7px;">${index_badge}</span>
          <span class="ml-3"><div class="row">
          <div class="col-12"><b>${nombre_cuenta}:</b> ${cuenta}</div>
          <div class="col-12" style="font-size: 10px"><b>${banco}:</b> ${rfc_banco}</div></div></span>
          <div class="btn btn-sm btn-danger" id="I${id_trash}" onclick="eliminarCountList(${ id_actual_cuenta }, 'Sin cuentas agregadas')" style="height:30px"><i class="fas fa-trash"></i></div>
          
          `;
        
        }
        
      });
    }
   
  }
}

function agregarCategoriaList() {
  var categoria = $("#categoria-list option:selected").text();
  var porcentaje_ut = $("#procentaje-utilidad").val();

  console.log(porcentaje_ut);

  if (porcentaje_ut !== "") {
    count_click4 += 1;
    var lista_cuentas = $("#categoria-lista");

    id_li = Math.random() * (9999 - 1000) + 1;
    lista_empty = $("#list-empty-cat").val();
    if (lista_empty == 0) {
      lista_cuentas.empty();
      appendListCategoria();
    } else {
      appendListCategoria();
    }
  } else {
    animateCSS("#procentaje-utilidad", "headShake");
  }

  function appendListCategoria() {
    let cat = $("#btn-add-cat").attr("cat");
    lista_cuentas.append(`
      <li class="list-group-item d-flex justify-content-between" 
      code="${id_li}"
      categoria="${cat}"
      porcentaje="${porcentaje_ut}"
      value="1"
      >
      <span class="badge badge-primary badge-pill" style="height:23px">${count_click4}</span>
      <span class="ml-3">${categoria} <b>${porcentaje_ut}%</b></span>
      <div class="btn btn-sm btn-danger" 
      onclick="eliminarCatList(${id_li}, 'Sin cuentas agregadas')" style="height:30px"><i class="fas fa-trash"></i></div>
      </li>
  `);
  }
}

//Funciones de edición
function editarListDireccion(id_list_item) {
  let container = $("li[code='" + id_list_item + "']");
  let actual_index_positition = $("li[code='" + id_list_item + "']").attr("index_badge");
  let code_actual = $("li[code='" + id_list_item + "']").attr("code");
  let calle_actual = $("li[code='" + id_list_item + "']").attr("calle");
  let exterior_actual = $("li[code='" + id_list_item + "']").attr("exterior");
  let interior_actual = $("li[code='" + id_list_item + "']").attr("interior");
  let colonia_actual = $("li[code='" + id_list_item + "']").attr("colonia");
  let municipio_actual = $("li[code='" + id_list_item + "']").attr("municipio");
  let estado_actual = $("li[code='" + id_list_item + "']").attr("estado");
  let cp_actual = $("li[code='" + id_list_item + "']").attr("cp");
  let ciudad_actual = $("li[code='" + id_list_item + "']").attr("ciudad");
  let pais_actual = $("li[code='" + id_list_item + "']").attr("pais");

  $("li[code='" + id_list_item + "']").toggleClass("item_seleccionado");
  if ($("li[code='" + id_list_item + "']").hasClass("item_seleccionado")) {
    $("#instrucciones-dir").text("Vuelve a hacer click sobre la direccion para cancelar");
    $("#calle").val(calle_actual);
    $("#exterior").val(exterior_actual);
    $("#interior").val(interior_actual);
    $("#zip").val(cp_actual);
    $("#colonia").val(colonia_actual);
    $("#ciudad").val(ciudad_actual);
    $("#municipio").val(municipio_actual);
    $("#estado").val(estado_actual);
    $("#pais").val(pais_actual);
    $("#area-btn-add-direction").empty().append(`
    <div class="btn btn-info" id_li="${id_list_item}" onclick="agregarDireccion(2);" id="btn-update-dir" estatus_click="${actual_index_positition}">Actualizar dirección</div>
    `)
  } else {
    $("#instrucciones-dir").text("Selecciona una dirección para editarla o agrega una nueva")
    $("#calle").val("");
    $("#exterior").val("");
    $("#interior").val("");
    $("#zip").val("");
    $("#colonia").val("");
    $("#ciudad").val("");
    $("#municipio").val("");
    $("#estado").val("TAM");
    $("#area-btn-add-direction").empty().append(`
    <div class="btn btn-primary" onclick="agregarDireccion(1);">Agregar dirección</div>
    `)
  }
  

  $("#direcciones-list").on("click", function (e) {
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $("li[code='" + id_list_item + "']").removeClass("item_seleccionado"); 
     
      
    }
  });
}

function editarListEmail(id_list_item) {
  let container = $("li[code='" + id_list_item + "']");
  let actual_index_positition = $("li[code='" + id_list_item + "']").attr("index_badge");
  let code_actual = $("li[code='" + id_list_item + "']").attr("code");
  let etiqueta_actual = $("li[code='" + id_list_item+"']").attr("etiqueta");
  let correo_actual = $("li[code='" + id_list_item+"']").attr("correo");
  $("#result").attr("value", "valid");

  $("li[code='" + id_list_item + "']").toggleClass("item_seleccionado");
  if ($("li[code='" + id_list_item + "']").hasClass("item_seleccionado")) {
  
    $("#instrucciones-correo").text("Vuelve a hacer click sobre la direccion para cancelar");
    $("#etiqueta").val(etiqueta_actual);
    $("#email").val(correo_actual);
  
    $("#area-btn-add-correo").empty().append(`
    <div class="btn btn-info" id_li="${id_list_item}" onclick="agregarCorreo(2);" id="btn-update-correo" estatus_click="${actual_index_positition}">Actualizar correo</div>
    `)
  } else {
    $("#instrucciones-correo").text("Selecciona un correo para editarlo o agrega uno nuevo")
    $("#etiqueta").val("");
    $("#email").val("");
    $("#result").attr("value", "invalid").text("");
    $("#area-btn-add-correo").empty().append(`
    <div class="btn btn-primary" onclick="agregarCorreo(1);">Agregar correo</div>
    `)
  }
  

  $("#correos-list").on("click", function (e) {
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $("li[code='" + id_list_item + "']").removeClass("item_seleccionado"); 
    
    }
  });
}

function editarListCuenta(id_list_item) {
  let container = $("li[code='" + id_list_item + "']");
  let actual_index_positition = $("li[code='" + id_list_item + "']").attr("index_badge");
  let code_actual = $("li[code='" + id_list_item + "']").attr("code");
  let nombre_actual = $("li[code='" + id_list_item+"']").attr("nombre_cuenta");
  let cuenta_actual = $("li[code='" + id_list_item+"']").attr("cuenta");
  let banco_actual = $("li[code='" + id_list_item+"']").attr("banco");
  let rfc_banco_actual = $("li[code='" + id_list_item+"']").attr("rfc_banco");

  $("li[code='" + id_list_item + "']").toggleClass("item_seleccionado");
  if ($("li[code='" + id_list_item + "']").hasClass("item_seleccionado")) {
  
    $("#instrucciones-cuenta").text("Vuelve a hacer click sobre la cuenta para cancelar");
    $("#nombre-cuenta").val(nombre_actual);
    $("#cuenta").val(cuenta_actual);
  
    $("#area-btn-add-cuentas").empty().append(`
    <div class="btn btn-info" id_li="${id_list_item}" onclick="agregarCuentaList(2);" id="btn-update-cuentas" estatus_click="${actual_index_positition}">Actualizar cuenta</div>
    `)
  } else {
    $("#instrucciones-correo").text("Selecciona una cuenta para editarla o agrega una nueva")
    $("#nombre-cuenta").val("");
    $("#cuenta").val("");
    $("#area-btn-add-cuentas").empty().append(`
    <div class="btn btn-primary" onclick="agregarCuentaList(1);">Agregar cuenta</div>
    `)
  }
  

  $("#count-list").on("click", function (e) {
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $("li[code='" + id_list_item + "']").removeClass("item_seleccionado"); 
    
    }
  });
}

//Funciones de eliminacion

function eliminarDirList(identificador, mensaje) {
  window.event.stopPropagation();
  let id_actual_direction = $("#btn-update-dir").attr("id_li");
  if(id_actual_direction !== undefined){
    $("li[code='" + id_actual_direction + "']").removeClass("item_seleccionado")
  }
  $("li[code='" + identificador + "']").remove();
  $("#calle").val("");
  $("#exterior").val("");
  $("#interior").val("");
  $("#zip").val("");
  $("#colonia").val("");
  $("#ciudad").val("");
  $("#municipio").val("");
  $("#estado").val("TAM");
  $("#area-btn-add-direction").empty().append(`
  <div class="btn btn-primary" onclick="agregarDireccion(1);">Agregar dirección</div>
  `)
  let lista = $("#direcciones-list");
  let lista_direcciones = $("#direcciones-list").children();
  let elementos = lista_direcciones.length;
  
  if (elementos == 0) {
    lista.append(`
        <li class="list-group-item text-center" id="list-empty-dir" value="0">${mensaje}</li>
        `);
    count_click = 1;
  }
  count_click -= 1;
}

function eliminarEmailList(identificador, mensaje) {
  $("li[code='" + identificador + "']").remove();
  let lista = $("#correos-list");
  let lista_correos = $("#correos-list").children();
  elementos = lista_correos.length;
  console.log(elementos);
  if (elementos == 0) {
    lista.append(`
        <li class="list-group-item text-center" id="list-empty-email" value="0">${mensaje}</li>
        `);
    count_click2 = 1;
  }
  count_click2 -= 1;
}

function eliminarCountList(identificador, mensaje) {
  $("li[code='" + identificador + "']").remove();
  let lista = $("#count-list");
  let lista_cuentas = $("#count-list").children();
  elementos = lista_cuentas.length;
  console.log(elementos);
  if (elementos == 0) {
    lista.append(`
        <li class="list-group-item text-center" id="list-empty-count" value="0">${mensaje}</li>
        `);
    count_click3 = 1;
  }
  count_click3 -= 1;
}

function eliminarCatList(identificador, mensaje) {
  $("li[code='" + identificador + "']").remove();
  let lista = $("#categoria-lista");
  let lista_cuentas = $("#categoria-lista").children();
  elementos = lista_cuentas.length;
  console.log(elementos);
  if (elementos == 0) {
    lista.append(`
      <li class="list-group-item text-center" id="list-empty-cat" value="0">${mensaje}</li>
      `);
    count_click4 = 1;
  }
  count_click4 -= 1;
}

//Funciones de validación

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const validate = () => {
  const $result = $("#result");
  const email = $("#email").val();
  $result.text("");

  if (validateEmail(email)) {
    $result.text("Correo valido :)");
    $result.css("color", "green");
    $result.attr("value", "valid");
  } else {
    $result.text("Correo invalido :(");
    $result.css("color", "red");
    $result.attr("value", "invalid");
  }
  return false;
};

$("#email").on("input", validate);

$("#banco").select2({
  placeholder: "Busca un banco...",
  theme: "bootstrap-5",
  minimumInputLength: 0,

  language: {
    inputTooShort: function () {
      return "Busca un banco...";
    },

    noResults: function () {
      return "Sin resultados";
    },
    searching: function () {
      return "Buscando..";
    },
  },

  templateResult: formatState,
});

function formatState(state) {
  if (!state.id) {
    return state.text;
  }

  $state = $(
    '<div class="row justify-content-center">' +
      '<div class="col-md-3"><img src="./img/bancos/' +
      state.id +
      '.jpg" style="width:50px"></div>' +
      '<div class="col-md-9">' +
      "<span>" +
      state.text +
      "</span><br>" +
      '<span style="font-size: 12px"><b>RFC:</b> ' +
      state.id +
      "</span>" +
      "</div>" +
      "</div>"
  );

  return $state;
}

//Select2 categorias de precios deducibles
$("#categoria-list").select2({
  placeholder: "Busca una categoria...",
  theme: "bootstrap",
  minimumInputLength: 0,

  language: {
    inputTooShort: function () {
      return "Busca una categoria...";
    },

    noResults: function () {
      return "Sin resultados";
    },
    searching: function () {
      return "Buscando..";
    },
  },

  templateResult: formatStates,
  templateSelection: formatRepoSelectionS,
});

function formatStates(state) {
  if (!state.id) {
    return state.text;
  }
  icon = "HOla";
  switch (state.id) {
    case "almacenamiento":
      icon = '<i class="fas fa-hdd nav-icon"></i>';
      break;
    case "accesorios":
      icon = '<i class="fas fa-mouse nav-icon"></i>';
      break;
    case "energia":
      icon = '<i class="fas fa-bolt nav-icon"></i>';
      break;
    case "equipos":
      icon = '<i class="fas fa-laptop nav-icon"></i>';
      break;
    case "gaming":
      icon = '<i class="fas fa-gamepad nav-icon"></i>';
      break;
    case "mantenimiento":
      icon = '<i class="fas fa-pump-soap nav-icon"></i>';
      break;
    case "software":
      icon = '<i class="fas fa-window-restore nav-icon"></i>';
      break;
    case "accesorioscctv":
      icon = '<i class="fas fa-tools nav-icon"></i>';
      break;
    case "cctv":
      icon = ' <i class="fas fa-video nav-icon"></i>';
      break;
    case "control_acceso":
      icon = '<i class="fas fa-id-badge nav-icon"></i>';
      break;
    case "consumibles":
      icon = '<i class="fas fa-tint nav-icon"></i>';
      break;
    case "impresoras":
      icon = '<i class="fas fa-print nav-icon"></i>';
      break;
    case "cableado":
      icon = '<i class="fas fa-network-wired nav-icon"></i>';
      break;
    case "conectividad":
      icon = '<i class="fas fa-globe nav-icon"></i>';
      break;
    case "herramientas":
      icon = '<i class="fas fa-screwdriver nav-icon"></i>';
      break;
    case "telefonia":
      icon = '<i class="fas fa-phone nav-icon"></i>';
      break;
    case "cajones":
      icon = '<i class="fas fa-hdd nav-icon"></i>';
      break;
    case "impresora_termica":
      icon = ' <i class="fas fa-print nav-icon"></i>';
      break;
    case "escaner":
      icon = '<i class="fas fa-barcode nav-icon"></i>';
      break;
    default:
      icon = '<i class="fas fa-barcode nav-icon"></i>';
      break;
  }

  $state = $(
    '<div class="row justify-content-center">' +
      '<div class="col-md-1">' +
      icon +
      "</div>" +
      '<div class="col-md-11">' +
      "<span>" +
      state.text +
      "</span><br>" +
      "</div>" +
      "</div>"
  );

  return $state;
}

function formatRepoSelectionS(repo) {
  $("#btn-add-cat").attr("cat", repo.id);

  return repo.text || repo.id;
}
