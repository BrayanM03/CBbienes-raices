function verContrato(detalle_id, orden_id){
// Landscape export, 2×4 inches
const doc = new jsPDF();
  

fetch('../servidor/abonos/traer-datos-abonos.php', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({folio: orden_id, detalle_id: detalle_id})
  })
  .then(response => response.json())
  .then((data) =>{


    console.log(data);
    fecha = new Date(data.data.fecha);
    fecha_nac = new Date(data.data.fecha_nacimiento);
    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const fechaNacFormateada = fecha_nac.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  

logo = data_logo_montealto.replace(/[\s"\\]/gm, "");
logo_cb = data_logo_cb.replace(/[\s"\\]/gm, "");

doc.addImage(logo, "JPEG", 75, 10, 40, 17);


doc.setFont("helvetica"); // set font
doc.setFontType("bolditalic"); // set font



  doc.setFontType("bold");
  doc.setFontSize(11);
  doc.text( "CESION DE DERECHOS DE POSESION PARCELARIA",49, 34);
  doc.setFontType("normal")

  cliente_mayus = data.data.cliente_etiqueta.toUpperCase();
  lugar_nac_mayus = data.data.datos_cliente.lugar_nacimiento.toUpperCase();
  ocupacion_mayus = data.data.datos_cliente.ocupacion.toUpperCase();


  let introduccion =  `     En la ciudad de Heroica Matamoros, Tamaulipas, del día ${fechaFormateada}, comparecen
    por una parte, la Persona CESAR ALBERTO BERNAL MONTALVO, quien comparece mediante 
    poder para pleitos y cobranzas y actos de administración pasado por la fe del Lic. Arturo 
    Francisco Hinojosa Rodríguez, notario público número 322 de esta ciudad de 
    Matamoros, Tamaulipas, otorgado por el  C.  NORMAN SAIT EMMANUEL CAMPOS HERNANDEZ, 
    a quien en lo sucesivo se le  denominara  "EL VENDEDOR y  por la  otra parte,  La 
    Señor(a) ${cliente_mayus} a quien en lo sucesivo se le denominara "EL   COMPRADOR", 
    quien manifiesta ser mexicano(a), mayor de edad, originario de ${lugar_nac_mayus} 
    donde nació el día ${fechaNacFormateada}, ocupación ${ocupacion_mayus}, Estado Civil ${data.data.datos_cliente.estado_civil}, 
    con domicilio Legal el ubicado en ${data.data.direccion}, en plano goce de todos 
    sus derechos civiles y con entera libertad, se suscribe el presente 
    CONTRATO DE CESION DE DERECHOS PARCELARIOS, sujetándose al tenor de las siguientes:`

    //Declaraciones

    let primera_declaracion = `
    PRIMERA: 
    
    Declara "EL VENDEDOR", que es legítimo propietario de la parcela Ejidal No. 17 Z-1 P-1/1 ubicado en el Ejido La Luz, con una superficie de 12-39-82.03 hectáreas doce hectáreas treinta y nueve áreas y ochenta y dos punto cero tres centiáreas de las siguientes medidas y colindancias:
    
    AL NORESTE: en 422.58 mts. Con la parcela doce.
    AL SURESTE: en 47.87 mts. Con parcela 13 y 256 mts. Con parcela 39
    AL SUROESTE: en 393.76 mts. Con parcela treinta y ocho
    AL NOROESTE: en 303.21 mts. Con parcela 16.

    Lo que se acredita con el contrato de cesión de derechos parcelarios celebrado por el C. Norman Sait Emmanuel Campos Hernández la c. Yolanda Torres Alvarado respecto del certificado parcelario numero 000000204660 inscrito en el REGISTRO AGRARIO NACIONAL bajo folio 28FD00100893, y cuya cesión fue inscrita a su vez mediante número de folio de tramite 28220007412 ante el registro Agracio nacional en fecha 22 de junio de 2022.
    `;

    let segunda_declaracion = `
    SEGUNDA:
    
    Continúa declarando "EL VENDEDOR" que le fue conferido Poder para pleitos y cobranzas, actos de administración y de dominio por parte de Norman Sait Emmanuel Campos Hernández, en fecha 05 de Julio del 2022, pasada ante la fe del Lic. Arturo Francisco Hinojosa Rodríguez, Notario Público No. 322, con ejercicio en la ciudad de Heroica Matamoros, Tamaulipas. 
    
    
    `;

    let detalle_orden = data.data.detalle_orden[0];

    let tercera_declaracion = `
    TERCERA:
    
    Declara "EL COMPRADOR", que le hizo saber a "EL VENDEDOR", su interés en adquirir a plazos, un Lote de Terreno que se encuentra constituido en el terreno descrito en la declaración primera, identificado como Lote número 34, Manzana 3 en el Ejido la Luz de esta ciudad, con una superficie de terreno de 200m2 (doscientos metros cuadrados), con las siguientes medidas y colindancias:
    
    Al NORTE, ${detalle_orden.norte} ---------------------
    AL SUR, ${detalle_orden.sur} --------------------- --- 
    AL ESTE, ${detalle_orden.este} ------------------------------ 
    AL OESTE, ${detalle_orden.oeste} - ----------------------------

    `;

    let cuarta_declaracion = `
    CUARTA:
    
    Declara "EL COMPRADOR", que conoce el bien inmueble a que se han hecho mención en la Declaración anterior de este instrumento. --
---Hechas las declaraciones anteriores, en las que estuvieron de acuerdo las partes por ser ciertas, y además por conocer el inmueble descrito con antelación, y por esa razón, celebran el presente contrato sujetándose ambas partes al tenor de las siguientes: ----------------------
    
    `;

    let number = parseFloat(detalle_orden.precio);
    let formattedNumber = numeral(number).format('$0,0.00');
    
    
    
    let letras = numeroALetras(number, {
      plural: "PESOS",
      singular: "PESO",
      centPlural: "CENTAVOS",
      centSingular: "CENTAVO"
    });
    //Clausulas

    let primera_consentimiento = `
    PRIMERA. - CONSENTIMIENTO. 
    
    Ambas partes otorgan su expreso consentimiento para la celebración y validez del presente acto jurídico, reconociendo que su voluntad no se encuentra afectada de invalidez o nulidad, lesión, violencia, mala fe, enriquecimiento ilegitimo de ninguna de las partes o cualquier otra causa que pudiera invalidar su voluntad y por ende afectar del presente instrumento.`;

    let segunda_objecto = `
    SEGUNDA. - OBJETO.
    
    Constituye el objeto de esta operación la cesión de derechos de posesión del inmueble descrito en la Declaración Tercera que antecede, con la ubicación, superficie, medidas y colindancias que ahí se especifican y que en esta cláusula se tiene por aquí reproducidas integra y totalmente como si a la letra se insertasen.
    `;
    let tercera_precio = `
    TERCERA. - PRECIO.
    
    "EL VENDEDOR" y "EL COMPRADOR", convinieron que el precio de la operación, lo fue por la cantidad de ${formattedNumber} (${letras} PESOS 00/100 MONEDA NACIONAL).
    `;



let abonos = detalle_orden.abonos 

if(abonos.length > 0 ){
   total_enganche = 0;
  
  abonos.forEach(element => {
    if(element.tipo == "Enganche"){
      let monto_abono = parseFloat(element.total)
      total_enganche += monto_abono
      console.log(total_enganche);
    }
  })
}else{
  total_enganche = 0;
}

let total_enganche_formatted = numeral(total_enganche).format('$0,0.00');

let total_enganche_letras = numeroALetras(total_enganche, {
  plural: "PESOS",
  singular: "PESO",
  centPlural: "CENTAVOS",
  centSingular: "CENTAVO"
});


let restante = number - total_enganche

let restante_formatted = numeral(restante).format('$0,0.00');

let restante_letras = numeroALetras(restante, {
  plural: "PESOS",
  singular: "PESO",
  centPlural: "CENTAVOS",
  centSingular: "CENTAVO"
});

let plazo = detalle_orden.plazo
let mensualidad = parseFloat(detalle_orden.mensualidad)

let mensualidad_formatted = numeral(mensualidad).format('$0,0.00');

let mensualidad_letras = numeroALetras(mensualidad, {
  plural: "PESOS",
  singular: "PESO",
  centPlural: "CENTAVOS",
  centSingular: "CENTAVO"
});


    let cuarta_forma_pago = `
    CUARTA. - FORMA DE PAGO.

    a).- A la firma del presente instrumento "EL COMPRADOR hace entrega de la cantidad de ${total_enganche_formatted} (${total_enganche_letras} 00/100 MONEDA NACIONAL), en efectivo a "EL VENDEDOR en concepto A enganche equivalente al valor total del inmueble.- ----------
b). - El remanente, es decir la cantidad de ${restante_formatted} (${restante_letras} 00/100 MONEDA NACIONAL) será liquidado, mediante ${plazo} pagos mensuales de ${mensualidad_formatted} (${mensualidad_letras} 00/100 MONEDA NACIONAL) pagaderos los primeros cinco días de cada mes. -------------------------------------------------- -----------------
Se hace la aclaración que "EL COMPRADOR" puede hacer pagos por adelantado siempre y cuando no existan adeudos anteriores
    `;
    let quinta_penalizacion = `
    QUINTA. - PENALIZACION MORATORIA. 
    
    En caso de que "EL COMPRADOR se llegara a atrasar en el pago de la mensualidad después del día cinco, causará un interés moratorio de $250.00 (DOSCIENTOS CINCUENTA PESOS 00/100 MONEDA NACIONAL)
    `;
    let sexta_saneamiento = `
    SEXTA. - SANEAMIENTO.
    
    "EL VENDEDOR" se obliga al saneamiento de la propiedad para el caso de su entrega física. 
    `;
    let septima_lugar_pago = `
    SEPTIMA: LUGAR DE PAGO. 
    
    Las partes acuerdan que el lugar de pago será en las oficinas constituidas en calle ESPAÑA número 65 colonia Buenavista de esta H. Matamoros Tamaulipas
    `;
    let octava_entrega = `
    OCTAVA. ENTREGA FÍSICA Y MATERIAL DEL BIEN INMUEBLE. 
    
    Las partes establecen que al momento de la firma del presente contrato se hace la entrega de la posesión material del Lote descrito en la Declaración Tercera de este instrumento, el cual quedará bajo el resguardo y responsabilidad de "EL COMPRADOR", deslindándose "EL VENDEDOR" de cualquier acto delictivo que llegará a suceder con bien inmueble a partir de su entrega material.
    `;
    let novena_recision = `
    NOVENA.- RECISIÓN. 
    
    El incumplimiento de pago de 3 mensualidades de forma consecutiva rescindirá los efectos de éste contrato, para lo cual, quedan conformes las partes se dé por rescindido, sin que "EL COMPRADOR" tenga derecho a exigir devolución
de las cantidades de que hubiera hecho entrega, aceptando desde este momento que esta cantidad quede a beneficio de "EL VENDEDOR en calidad de renta, obligándose "EL COMPRADOR" a entregar el inmueble a más tardar 30 días a partir de que se le requiera.
    

`;
    let decima_devoluciones = `
    
DECIMA. - DEVOLUCIONES. 

"EL COMPRADOR acepta que no hay devoluciones de los pagos efectuados al "VENDEDOR", por motivo de cancelación de contrato, solo se respetaran los pagos en caso de una reubicación del lote. 

Para la interpretación y cumplimiento del presente instrumento, ambas partes se someten a las leyes del Estado de Tamaulipas; y señalan como competentes a los tribunales de esta ciudad; renunciando al fuero que pudiera corresponderles en razón de su domicilio presente o futuro.
   




`;

    let final = `
                                                                         "EL VENDEDOR"

                                                 ________________________________________

                                                        CESAR ALBERTO BERNAL MONTALVO

 
                                                                        
                                                        
                                                                        "EL COMPRADOR"
                                      
                                                      __________________________________
  
                                                            C. ${cliente_mayus}
 

                                                                         TESTIGOS 


                                  ___________________________ ___________________________

                                   C.                                                 C.
    `;



    bodyContract = [{data: introduccion}, {data: 
      "                 ===================== D E C L A R A C I O N E S:=================="},
      {data: primera_declaracion},
      {data: segunda_declaracion},
      {data: tercera_declaracion},
      {data: cuarta_declaracion},
    
      {data: "                 ===================== D E C L A R A C I O N E S:=================="},

      {data: primera_consentimiento},
      {data: segunda_objecto},
      {data: tercera_precio},
      {data: cuarta_forma_pago},
      {data: quinta_penalizacion},
      {data: sexta_saneamiento},
      {data: septima_lugar_pago},
      {data: octava_entrega},
      {data: novena_recision},
      {data: decima_devoluciones},
      {data: final},

    ]
  doc.autoTable(({
    headStyles: { fillColor: [211, 211, 211], textColor: [54, 69, 79], halign: 'justify'},
    startY:45,
    body: bodyContract,
    styles: { cellPadding: 4, fontSize: 11 },
    margin: { left: 8, top: 8},
    tableWidth: 190,
    columns: [{header: null, dataKey: 'data'}]
  }))

  
  doc.addImage(logo_cb, "JPEG", 85, 215, 40, 13);


cliente = $("#nombre_cliente").attr("id_cliente")

var string = doc.output('datauristring');
/* var blob = doc.output('blob');
var formData = new FormData();
formData.append('pdf', blob);
formData.append('cliente', cliente);

$.ajax({
  url: '../servidor/reportes/guardar-contrato-servidor.php',
 
  method: 'POST',
  data: formData,
  processData: false,
                contentType: false,
  success: function(response) {
    console.log('Archivo guardado en el servidor');
  },
  error: function(error) {
    console.error('Error al guardar el archivo en el servidor');
  }
}); */

var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
var x = window.open();
x.document.open();
x.document.write(embed);
x.document.close();

  })
       



}

/* 
console.log(doc.getFontList()); */




function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  function cerrar() { 
    window.open('','_parent',''); 
    window.close(); 
 } 

 const currency = function(number) {
  return new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN', minimunFractionDigits: 2}).format(number);
 }