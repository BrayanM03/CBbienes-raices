function guardarContrato(detalle_id, orden_id, cliente_correo, cliente_nombre,cliente_id){
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
   

doc.setFont("helvetica", "bold"); // set font

doc.setFontSize(11);
doc.text( "CESION DE DERECHOS DE POSESION PARCELARIA",49, 34);
doc.setFont("helvetica", "normal"); // set font


cliente_mayus = data.data.cliente_etiqueta.toUpperCase();
lugar_nac_mayus = data.data.datos_cliente.lugar_nacimiento.toUpperCase();
ocupacion_mayus = data.data.datos_cliente.ocupacion.toUpperCase();


let introduccion =  `En la ciudad de Heroica Matamoros, Tamaulipas, del día ${fechaFormateada}, comparecen por una parte, la Persona CESAR ALBERTO BERNAL MONTALVO, quien comparece mediante poder para pleitos y cobranzas y actos de administración pasado por la fe del Lic. Arturo Francisco Hinojosa Rodríguez, notario público número 322 de esta ciudad de Matamoros, Tamaulipas, otorgado por el  C.  NORMAN SAIT EMMANUEL CAMPOS HERNANDEZ, a quien en lo sucesivo se le  denominara  "EL VENDEDOR y  por la  otra parte,  La Señor(a) ${cliente_mayus} a quien en lo sucesivo se le denominara "EL   COMPRADOR", quien manifiesta ser mexicano(a), mayor de edad, originario de ${lugar_nac_mayus} donde nació el día ${fechaNacFormateada}, ocupación ${ocupacion_mayus}, Estado Civil ${data.data.datos_cliente.estado_civil}, con domicilio Legal el ubicado en ${data.data.direccion}, en plano goce de todos sus derechos civiles y con entera libertad, se suscribe el presente CONTRATO DE CESION DE DERECHOS PARCELARIOS, sujetándose al tenor de las siguientes:`

  //Declaraciones

  let primera_declaracion = `PRIMERA:

Declara "EL VENDEDOR", que es legítimo propietario de la parcela Ejidal No. 17 Z-1 P-1/1 ubicado en el Ejido La Luz, con una superficie de 12-39-82.03 hectáreas doce hectáreas treinta y nueve áreas y ochenta y dos punto cero tres centiáreas de las siguientes medidas y colindancias:
  `
  let colindancias_parcela = `
  AL NORESTE: en 422.58 mts. Con la parcela doce.
  AL SURESTE: en 47.87 mts. Con parcela 13 y 256 mts. Con parcela 39
  AL SUROESTE: en 393.76 mts. Con parcela treinta y ocho
  AL NOROESTE: en 303.21 mts. Con parcela 16.`

let final_primera_declaracion =  `Lo que se acredita con el contrato de cesión de derechos parcelarios celebrado por el C. Norman Sait Emmanuel Campos Hernández la c. Yolanda Torres Alvarado respecto del certificado parcelario numero 000000204660 inscrito en el REGISTRO AGRARIO NACIONAL bajo folio 28FD00100893, y cuya cesión fue inscrita a su vez mediante número de folio de tramite 28220007412 ante el registro Agracio nacional en fecha 22 de junio de 2022.`;

  let segunda_declaracion = `SEGUNDA:
  
Continúa declarando "EL VENDEDOR" que le fue conferido Poder para pleitos y cobranzas, actos de administración y de dominio por parte de Norman Sait Emmanuel Campos Hernández, en fecha 05 de Julio del 2022, pasada ante la fe del Lic. Arturo Francisco Hinojosa Rodríguez, Notario Público No. 322, con ejercicio en la ciudad de Heroica Matamoros, Tamaulipas.`;

  let detalle_orden = data.data.detalle_orden[0];
  let myConverter = new Converter();
  let area_letras = myConverter.convertToText(detalle_orden.area);
  console.log(area_letras);
  
  
  let tercera_declaracion = `TERCERA:
 
Declara "EL COMPRADOR", que le hizo saber a "EL VENDEDOR", su interés en adquirir a plazos, un Lote de Terreno que se encuentra constituido en el terreno descrito en la declaración primera, identificado como Lote número ${detalle_orden.lote} , Manzana ${detalle_orden.manzana}  en el Ejido la Luz de esta ciudad, con una superficie de terreno de ${detalle_orden.area}m2 (${area_letras} metros cuadrados), con las siguientes medidas y colindancias:
  `
  let colindancias_lote =`
  Al NORTE, ${detalle_orden.norte} ---------------------
  AL SUR, ${detalle_orden.sur} --------------------- --- 
  AL ESTE, ${detalle_orden.este} ------------------------------ 
  AL OESTE, ${detalle_orden.oeste} - ----------------------------

  `;

  let cuarta_declaracion_a = `CUARTA:

Declara "EL COMPRADOR", que conoce el bien inmueble a que se han hecho mención en la Declaración anterior de este instrumento.`
let cuarta_declaracion_b = `Hechas las declaraciones anteriores, en las que estuvieron de acuerdo las partes por ser ciertas, y además por conocer el inmueble descrito con antelación, y por esa razón, celebran el presente contrato sujetándose ambas partes al tenor de las siguientes:`;

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
Ambas partes otorgan su expreso consentimiento para la celebración y validez del presente acto jurídico, reconociendo que su voluntad no se encuentra afectada de invalidez o nulidad, lesión, violencia, mala fe, enriquecimiento ilegitimo de ninguna de las partes o cualquier otra causa que pudiera invalidar su voluntad y por ende afectar del presente instrumento.`;

  let segunda_objecto = `
Constituye el objeto de esta operación la cesión de derechos de posesión del inmueble descrito en la Declaración Tercera que antecede, con la ubicación, superficie, medidas y colindancias que ahí se especifican y que en esta cláusula se tiene por aquí reproducidas integra y totalmente como si a la letra se insertasen.
  `;
  let tercera_precio = `
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


  let cuarta_forma_pago_a = `a).- A la firma del presente instrumento "EL COMPRADOR hace entrega de la cantidad de ${total_enganche_formatted} (${total_enganche_letras} 00/100 MONEDA NACIONAL), en efectivo a "EL VENDEDOR en concepto A enganche equivalente al valor total del inmueble.`
  let cuarta_forma_pago_b = `b). - El remanente, es decir la cantidad de ${restante_formatted} (${restante_letras} 00/100 MONEDA NACIONAL) será liquidado, mediante ${plazo} pagos mensuales de ${mensualidad_formatted} (${mensualidad_letras} 00/100 MONEDA NACIONAL) pagaderos los primeros cinco días de cada mes.`
  let cuarta_aclaracion = `Se hace la aclaración que "EL COMPRADOR" puede hacer pagos por adelantado siempre y cuando no existan adeudos anteriores`;
  let quinta_penalizacion = `
En caso de que "EL COMPRADOR se llegara a atrasar en el pago de la mensualidad después del día cinco, causará un interés moratorio de $250.00 (DOSCIENTOS CINCUENTA PESOS 00/100 MONEDA NACIONAL)
  `;
  let sexta_saneamiento = `
"EL VENDEDOR" se obliga al saneamiento de la propiedad para el caso de su entrega física. 
  `;
  let septima_lugar_pago = `    
Las partes acuerdan que el lugar de pago será en las oficinas constituidas en calle ESPAÑA número 65 colonia Buenavista de esta H. Matamoros Tamaulipas`;
  let octava_entrega = `  
Las partes establecen que al momento de la firma del presente contrato se hace la entrega de la posesión material del Lote descrito en la Declaración Tercera de este instrumento, el cual quedará bajo el resguardo y responsabilidad de "EL COMPRADOR", deslindándose "EL VENDEDOR" de cualquier acto delictivo que llegará a suceder con bien inmueble a partir de su entrega material.
  `;
  let novena_recision = ` 
El incumplimiento de pago de 3 mensualidades de forma consecutiva rescindirá los efectos de éste contrato, para lo cual, quedan conformes las partes se dé por rescindido, sin que "EL COMPRADOR" tenga derecho a exigir devolución de las cantidades de que hubiera hecho entrega, aceptando desde este momento que esta cantidad quede a beneficio de "EL VENDEDOR en calidad de renta, obligándose "EL COMPRADOR" a entregar el inmueble a más tardar 30 días a partir de que se le requiera.
  

`;
  let decima_devoluciones = `
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

                                    C.                                          C.
  `;



doc.text(introduccion, 8,50,{maxWidth: 186, align: 'justify'});
doc.text("                      =================== D E C L A R A C I O N E S:==================", 12,110,{maxWidth: 186, align: 'justify'});
let texto_dividido_primera_declaracion = doc.splitTextToSize(primera_declaracion, 176);
doc.text(texto_dividido_primera_declaracion, 8,120,{maxWidth: 186, align: 'justify'});
doc.text(colindancias_parcela, 8,143,{maxWidth: 186, align: 'left'});
doc.text(final_primera_declaracion, 8,175,{maxWidth: 186, align: 'justify'});
doc.text(segunda_declaracion, 8,210,{maxWidth: 186, align: 'justify'});
let texto_dividido_tercera_declaracion = doc.splitTextToSize(tercera_declaracion, 176);
doc.text(texto_dividido_tercera_declaracion, 8,250,{maxWidth: 186, align: 'justify'});
doc.addPage();
let texto_dividido_cuarta_declaracion_a = doc.splitTextToSize(cuarta_declaracion_a, 176);
let texto_dividido_cuarta_declaracion_b = doc.splitTextToSize(cuarta_declaracion_b, 176);
doc.text(texto_dividido_cuarta_declaracion_a, 8,10,{maxWidth: 186, align: 'justify'});
doc.text(texto_dividido_cuarta_declaracion_b, 8,30,{maxWidth: 186, align: 'justify'});

doc.text("                            =================== C L A U S U L A S:==================", 12,55,{maxWidth: 186, align: 'left'});
doc.text("PRIMERA - CONSENTIMIENTO.", 8,70,{maxWidth: 186, align: 'left'});
doc.text(primera_consentimiento, 8,73,{maxWidth: 186, align: 'justify'});
doc.text("SEGUNDA - OBJETO.", 8,105,{maxWidth: 186, align: 'left'});
doc.text(segunda_objecto, 8,108,{maxWidth: 186, align: 'justify'});
doc.text("TERCERA - PRECIO.", 8,140,{maxWidth: 186, align: 'left'});
doc.text(tercera_precio, 8,143,{maxWidth: 186, align: 'justify'});
doc.text("CUARTA. - FORMA DE PAGO.", 8,167,{maxWidth: 186, align: 'left'});
let texto_dividido_cuarta_forma_pago_a = doc.splitTextToSize(cuarta_forma_pago_a, 176);
let texto_dividido_cuarta_forma_pago_b = doc.splitTextToSize(cuarta_forma_pago_b, 176);
let texto_dividido_cuarta_aclaracion = doc.splitTextToSize(cuarta_aclaracion, 176);
doc.text(texto_dividido_cuarta_forma_pago_a, 8,175,{maxWidth: 186, align: 'justify'});
doc.text(texto_dividido_cuarta_forma_pago_b, 8,191,{maxWidth: 186, align: 'justify'});
doc.text(texto_dividido_cuarta_aclaracion, 8,212,{maxWidth: 186, align: 'justify'});

doc.text("QUINTA. - PENALIZACION MORATORIA.", 8,226,{maxWidth: 186, align: 'left'});
doc.text(quinta_penalizacion, 8,229,{maxWidth: 186, align: 'justify'});
doc.text("SEXTA. - SANEAMIENTO.", 8,257,{maxWidth: 186, align: 'left'});
doc.text(sexta_saneamiento, 8,260,{maxWidth: 186, align: 'justify'});

doc.addPage();
doc.text("SEPTIMA: LUGAR DE PAGO.", 8,15,{maxWidth: 186, align: 'left'});
let texto_dividido_septima_lugar_pago = doc.splitTextToSize(septima_lugar_pago, 176);
doc.text(texto_dividido_septima_lugar_pago, 8,18,{maxWidth: 186, align: 'justify'});
doc.text("OCTAVA. ENTREGA FÍSICA Y MATERIAL DEL BIEN INMUEBLE.", 8,43,{maxWidth: 186, align: 'left'});
let texto_dividido = doc.splitTextToSize(octava_entrega, 176);
doc.text(texto_dividido, 8,46,{ maxWidth: 186, align: 'justify'});
/* doc.text(octava_entrega, 8,46,{maxWidth: 186, align: 'justify'}); */
doc.text("NOVENA.- RECISIÓN.-", 8,80,{maxWidth: 186, align: 'left'});
let texto_dividido_novena_recision = doc.splitTextToSize(novena_recision, 176);
doc.text(texto_dividido_novena_recision, 8,83,{maxWidth: 186, align: 'justify'});
doc.text("DECIMA. - DEVOLUCIONES.", 8,125,{maxWidth: 186, align: 'left'});
doc.text(decima_devoluciones, 8,128,{maxWidth: 186, align: 'justify'});
doc.text(final, 8,170,{maxWidth: 186, align: 'left'});



doc.addImage(logo_cb, "JPEG", 85, 275, 40, 13);
    
    cliente = $("#nombre_cliente").attr("id_cliente")
    
    var string = doc.output('datauristring');
    var blob = doc.output('blob');
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

        $.ajax({
            type: "POST",
            url: "../servidor/correo/enviar-correo.php",
            data: {"nombre_cliente": cliente_nombre, "correo_cliente": cliente_correo, "cliente_id": cliente_id},
            dataType: "JSON",
            success: function (response) {
                if(response.estatus == false){
                    $("#estatus-correo").text(response.mensaje)
                }
            }
        });

      },
      error: function(error) {
        console.error('Error al guardar el archivo en el servidor');
      }
    });
    
  /*   var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
    var x = window.open();
    x.document.open();
    x.document.write(embed);
    x.document.close(); */
    
      })
           
    
    
    
    }
    
    /* 
    console.log(doc.getFontList()); */
    
    
    
    
  