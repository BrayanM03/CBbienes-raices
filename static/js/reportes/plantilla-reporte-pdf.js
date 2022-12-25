function descargarOrden(id){


// Landscape export, 2×4 inches
const doc = new jsPDF();
pageHeight= doc.internal.pageSize.height;



let id_orden =id// getParameterByName("id_orden")  

$.ajax({
    type: "POST",
    url: "../servidor/reportes/traer-datos-de-orden.php",
    data: {id_orden: id_orden, tabla: "ordenes", indicador: "id"},
    dataType: "JSON",
    success: function (response) {
        console.log(response);

response.id_sucursal == "1" ? data_logo = data_logo_aireexpress : data_logo = data_logo_serviclima
logo = data_logo.replace(/[\s"\\]/gm, "");
icon_checked= data_checked.replace(/[\s"\\]/gm, "");
icon_unchecked = data_unchecked.replace(/[\s"\\]/gm, "");
doc.addImage(logo, "JPEG", 8, 5, 40, 17);


doc.setFont("helvetica"); // set font
doc.setFontType("bolditalic"); // set font

doc.text("Orden de servicio F" + response.folio, 137, 10);

doc.setFontSize(12);
doc.text(`(868)817-5256
(868)813-8071`, 170, 17);

doc.setDrawColor(255,0,0); // draw red lines
doc.line(8, 30, 200, 30); //Line
doc.setDrawColor(10,10,10); // draw black lines
doc.line(8, 31, 200, 31); //Line

//Diseño de formulario de datoa de cliente - maquetacion
doc.setDrawColor(220,220,220); // draw gray lines
doc.rect(8,32,192,15)
doc.line(8, 39, 200, 39); //Line
doc.line(145, 32, 145, 47); // vertical line

doc.rect(8,47,192,15)
doc.line(8, 55, 200, 55); //Line
doc.line(145, 47, 145, 62); // vertical line

doc.setDrawColor(10,10,10); // draw black lines
doc.setFontType("normal"); // set font
doc.setFontSize(9);
if(response.id_sucursal == "1"){

let direccion_sucursal = response.datos_sucursal.direccion;
doc.text(direccion_sucursal,68, 28); //"Calle 16 No. 33 Col. Buena Vista, H. Matamoros, Tamp. CP.87350, ventas@aireexpress.com"
doc.text(response.datos_sucursal.correo, 164,28); 

}else if(response.id_sucursal == "2"){

  let direccion_sucursal = response.datos_sucursal.direccion;
  doc.text(direccion_sucursal,24, 28); //"Calle 16 No. 33 Col. Buena Vista, H. Matamoros, Tamp. CP.87350, ventas@aireexpress.com"
  doc.text(response.datos_sucursal.correo, 158,28);
}
doc.setFontSize(10); 
//Datos cliente
doc.setFontType("bold"); // set font
doc.text("Nombre", 10, 38);
doc.text("Fecha", 147, 38);
doc.text("Contacto", 10, 45);
doc.text("RFC", 147, 45);
doc.text("Domicilio", 10, 53);
doc.text("Telefono", 147, 53);
doc.text("Forma de pago", 10, 60);
doc.text("Correo", 147, 60);

doc.setFontType("normal"); // set font
doc.text(response.datos_cliente.nombre, 28, 38)
doc.text(response.fecha, 160, 38)
doc.text(response.datos_cliente.contacto, 28, 45)
doc.text(response.datos_cliente.rfc, 165, 45)
doc.text(response.datos_cliente.direccion, 28, 53)
doc.text(response.datos_cliente.telefono, 170, 53)
doc.text(response.metodo_pago, 40, 60)


 //---------Cuerpo de seires ---//
 let bodySeries = [];
 let contador = 1;
 response.detalle_orden.forEach(element => {

    importe_do = element["importe"];
    precio_unit_do = element["precio_unit"];
    importe_formateado = currency(importe_do);
    precio_unit_formateado = currency(precio_unit_do);

    element["importe"] = importe_formateado;
    element["precio_unit"] = precio_unit_formateado;

    if(element["series"]){
      element["series"].forEach(serie => {
        bodySeries.push({index: contador, condensador: serie.serie_condensador, evaporador: serie.serie_evaporador, desc: serie.descripcion})
        contador++;
      });
    }
});


//-----------Cuerpo de items -----//

if(response.tipo == "1" || response.tipo == "3"){
   comentario = 'Recuerde hacer limpieza de filtros de Aire Acondicionado cada mes'
}else if(response.tipo == "2"){
   comentario = `Recuerde hacer limpieza de filtros de Aire Acondicionado cada mes.`
}else if(response.tipo == "4"){
  comentario = ""
}else{
  comentario = ""
}

let bodyTable = response.detalle_orden;
//let metodo = { precio_unit: 'Metodo', importe:response.metodo_pago };
importe_total_formateado = currency(response.total)
let importe_total = { descripcion: comentario, precio_unit: 'Total', importe: importe_total_formateado}

bodyTable.push(importe_total)
/* [
    { cantidad: '2', descripcion: 'Toshiba T-15300 2 TON 220V', precio_unit: '9,500.00', importe:'19,000.00' },
    { precio_unit: 'Metodo', importe:'Tarjeta' },
    { descripcion: 'Recuerde hacer limpieza de filtros de Aire Acondicionado cada mes', precio_unit: 'Total', importe:'76,000.00' },
  ]; */

 
  //---------END------


doc.autoTable(({
    theme: 'grid',
    /* columnStyles: { 0: { halign: 'left', fillColor: [255, 255, 255] } }, */
    /* headStyles: { 0: { halign: 'left', fillColor: [211, 211, 211] } }, */
    headStyles: { fillColor: [211, 211, 211], textColor: [54, 69, 79]},
    body: bodyTable,
    styles: { cellPadding: 1.5, fontSize: 9, halign: 'center'},
    columnStyles: { descripcion: { halign: 'center' } },
    columns: [
      { header: 'Cant', dataKey: 'cantidad' },
      { header: 'Descripcion', dataKey: 'descripcion'},
      { header: 'Precio Unit.', dataKey: 'precio_unit' },
      { header: 'Importe  ', dataKey: 'importe'},
    ],
    startY:72.5,
    margin: { left: 8 },
    tableWidth: 193
  }))

  //Tabla medidas de StartY a partir de la primera pártida. 7.5 puntos de altura por partida
  //86.5 puntos de altura inicial
  /* 1 item = 94 puntos en Y
     2 item = 101.5 puntos en Y
     3 item = 109 puntos en Y
     4 item = 116.5 puntos en Y */
     let alturaPartidas = 8.5 * (bodyTable.length)   
     let startY = 71.5 + alturaPartidas;



     //MAQUETANDO FOOT DEPENDIENDO DEL TIPO DE ORDENES
     //TIPO 1 VENTA SIN INSTALACION
     //TIPO 2 VENTA CON INSTALACION
     //TIPO 3 SERVICIO

     if(response.tipo == 1){

      doc.autoTable(({
        headStyles: { fillColor: [255, 195, 0], textColor: [0, 0, 0], halign: 'center'},
        startY:65,
        margin: { left: 8 },
        tableWidth: 193,
        columns: [
            { header: 'Venta sin instalación', dataKey: null }
          ],
      }))
    
    
    
      let startYSeries = startY + 7.5; 
      doc.autoTable(({
        headStyles: { fillColor: [211, 211, 211], textColor: [54, 69, 79], halign: 'center'},
        startY:startYSeries,
        body: bodySeries,
        margin: { left: 8 },
        tableWidth: 193,
        columns: [
            { header: '#', dataKey: "index" },
            { header: 'Serie condensador', dataKey: "condensador" },
            { header: 'Serie evaporador', dataKey: "evaporador" },
            { header: 'Equipo', dataKey: "desc"}
          ],
      }))
    
      let alturaSeries = 7.5 * (bodySeries.length)
    
      let startYfooter = 35 + startY + alturaSeries;
    
      
    
    
      doc.text("Firma:", 10, startYfooter);
      doc.text("Nombre:", 60, startYfooter);
      doc.text("Fecha:", 160, startYfooter);
    
      doc.setFontSize(8);
      doc.setFontType("normal");
      let contrato = `Recibi(mos) de conformidad los equipos, materiales y trabajos mencionados debo y pagare(mos) incondicionalmente a la orden de Maria Dolores Gon-
      zalez Ramirez, el total descrito en esta orden. De no ser cubierto el importe de la misma de 8 dias, causara el 10% de interes moratorio mensual. 
      Rev. 1 2022`
      doc.text(contrato, 10, startYfooter + 5, {align: 'justify',lineHeightFactor: 1.5,maxWidth:193});
    
    
      //--------GARANTIA-------
      let garantia = `Para hacer valida su GARANTIA, fabricante requiere factura de compra y requiere que realize MANTENIMIENTO PREVENTIVO cada año. 
Con AireExpress o tecnico certificado, como tener comprobantes correspondientes.`
      doc.setFontType("bold"); // set font
      doc.text("Garantia de fabricante MiniSplit Nuevo:", 10, startYfooter+18);
      doc.text("Cobertura limitada a refacciones. Usuario cubre costos de revisiones, mano de obra y fletes por remplazo de refacciones:", 10, startYfooter+ 23);
      doc.setFontType("normal");
      doc.text(garantia, 10, startYfooter + 28, {align: 'justify',lineHeightFactor: 1.5,maxWidth:193});
    
    let bodyGarantia = [
      {index: "5", desc: "Año(s) de garantia en compresor. Compresor no debe estar quemado, aterrizado, cruzado o con los bordes botados o zafados"},
      {index: "1", desc: "Año(s) de garantia en refacciones"},
      {index: "3", desc: "meses de garantia en componentes electronicos"}];
    doc.autoTable(({
      headStyles: { fillColor: [211, 211, 211], textColor: [54, 69, 79], halign: 'center'},
      startY:startYfooter + 35,
      body: bodyGarantia,
      margin: { left: 8 },
      tableWidth: 193,
      columns: [{header: null, dataKey: 'index'},
      {header: null, dataKey: 'desc'},]
    }))
    
    //----MINISPLIT INCLUYE
    let alturaGarantias = startYfooter + 70
    doc.setFontType("bold"); // set font
    doc.setFontSize(11);
    
    doc.text("Mini Split incluye", 10, alturaGarantias);
    doc.setFontType("normal");
    doc.setFontSize(9);
    let incluye = `Evaporador, Condensador, control remoto, kit de instalacion de 3 o 4 metros dependiendo de la marca de
y modelo de su equipo.
Favor de revisar su mercancia, ya que no habra cambios ni devoluciones.
Si necesita su factura favor de solitarla al momento de la compra y/o servicio.`
    doc.text(incluye, 10, alturaGarantias + 5);

     }else if(response.tipo == 2){

      

     
      doc.autoTable(({
        headStyles: { fillColor: [255, 195, 0], textColor: [0, 0, 0], halign: 'center'},
        startY:65,
        margin: { left: 8 },
        tableWidth: 193,
        columns: [
            { header: 'Venta con instalación', dataKey: null }
          ],
      }))

      let startYSeriess = startY + 7.5; 
      doc.autoTable(({
        headStyles: { fillColor: [211, 211, 211], textColor: [54, 69, 79], halign: 'center'},
        startY:startYSeriess,
        body: bodySeries,
        margin: { left: 8 },
        styles: { cellPadding: 1.5, fontSize: 8, haling:'center'},
        tableWidth: 193,
        columns: [
            { header: '#', dataKey: "index" },
            { header: 'Serie condensador', dataKey: "condensador" },
            { header: 'Serie evaporador', dataKey: "evaporador" },
            { header: 'Equipo', dataKey: "desc"}
          ],
      }))
    
      let alturaSeries = 8 * (bodySeries.length);
    
    
      let bodyDatosInstalacion = [{index: 1, cantidad_personal: response.cantidad_personal,
                                  tiempo_horas: response.tiempo_horas,
                                  nombre_personal: response.nombre_personal}] 

      let startYpersonal = startYSeriess  + alturaSeries + 7.5;
      doc.autoTable(({
        headStyles: { fillColor: [211, 211, 211], textColor: [54, 69, 79], halign: 'center'},
        startY:startYpersonal,
        body: bodyDatosInstalacion,
        margin: { left: 8 },
        styles: { cellPadding: 1.5, fontSize: 8, haling: 'center'},
        tableWidth: 193,
        columnStyles: {index: {haling: 'center'}, cantidad_personal: { halign: 'center' }, tiempo_horas: { halign: 'center'}, nombre_personal: { halign: 'center'} },
        columns: [
            { header: '#', dataKey: "index" },
            { header: 'Cantidad de personal', dataKey: "cantidad_personal" },
            { header: 'Tiempo en horas', dataKey: "tiempo_horas" },
            { header: 'Nombre de personal', dataKey: "nombre_personal"}
          ],
      }))
    
      let alturaDatosInstalacion = 8 * (bodyDatosInstalacion.length)
    
      let startOptions = 12 + startYpersonal + alturaDatosInstalacion;

      doc.setFontType("bold");
      doc.setFontSize(8);
      doc.text("Pago en domicilio:", 8, startOptions);
      doc.text("pago en sucursal:", 40, startOptions);
      doc.text("Verificar electrico:", 75, startOptions );
      doc.text("Cliente ya cuenta con electrico:", 120, startOptions);

      if(response.pago_domicilio == "true"){
        doc.addImage(icon_checked, "JPEG", 35, startOptions-2.5, 3,  3);
      }else{
        doc.addImage(icon_unchecked, "JPEG", 35, startOptions-2.5, 3,  3);
      }

      if(response.pago_sucursal == "true"){
        doc.addImage(icon_checked, "JPEG", 66, startOptions-2.5,3,  3);
      }else{
        doc.addImage(icon_unchecked, "JPEG", 66, startOptions-2.5,3,  3);
      }

      
      if(response.verificar_electrico == "true"){
        doc.addImage(icon_checked, "JPEG", 102, startOptions-2.5 ,3,  3);
      }else{
        doc.addImage(icon_unchecked, "JPEG", 102, startOptions-2.5,3,  3);
      }

      
      if(response.tiene_electrico == "true"){
        doc.addImage(icon_checked, "JPEG", 165, startOptions-2.5 ,3,  3);
      }else{
        doc.addImage(icon_unchecked, "JPEG", 165, startOptions-2.5 ,3,  3);
      }
      
    
      // Black sqaure with rounded corners
      doc.setFontType("normal");
      doc.text("Extras u observaciones", 10, startOptions + 8);
      doc.setDrawColor(0)
      doc.setFillColor(255, 255, 255)
      doc.roundedRect(8, startOptions + 10, 190, 14, 1, 1, 'FD')
      
    let startYfooter =  startOptions + 40;
    
      doc.text("Firma", 10, startYfooter);
      doc.text("Nombre", 60, startYfooter);
      doc.text("Fecha", 160, startYfooter);

      

      
      if (startYfooter >= pageHeight)
      {
        doc.addPage();
       // y = 0 // Restart height position
      }
    
      doc.setFontSize(7);
      doc.setFontType("normal");
      let contrato = `Recibi(mos) de conformidad los equipos, materiales y trabajos mencionados debo y pagare(mos) incondicionalmente a la orden de Maria Dolores Gon-
      zalez Ramirez, el total descrito en esta orden. De no ser cubierto el importe de la misma de 8 dias, causara el 10% de interes moratorio mensual. 
      Rev. 1 2022`
      doc.text(contrato, 10, startYfooter + 5, {align: 'justify',lineHeightFactor: 1.5,maxWidth:193});
    
    
      //--------GARANTIA-------
      let garantia = `Para hacer valida su GARANTIA, fabricante requiere factura de compra y requiere que realize MANTENIMIENTO PREVENTIVO cada año. 
Con AireExpress o tecnico certiicado, como tener comprobantes correspondientes.`
    doc.setFontType("bold"); // set font
      doc.text("Garantia de fabricante MiniSplit Nuevo:", 10, startYfooter+18);
      doc.text("Cobertura limitada a refacciones. Usuario cubre costos de revisiones, mano de obra y fletes por remplazo de refacciones:", 10, startYfooter+ 21);
      doc.setFontType("normal");
    doc.text(garantia, 10, startYfooter + 25, {align: 'justify',lineHeightFactor: 1.5,maxWidth:193});
    
    let bodyGarantia = [
      {index: "5", desc: "Año(s) de garantia en compresor. Compresor no debe estar quemado, aterrizado, cruzado o con los bordes botados o zafados"},
      {index: "1", desc: "Año(s) de garantia en refacciones"},
      {index: "3", desc: "meses de garantia en componentes electronicos, control remoto y gas refrigerante."}];
    doc.autoTable(({
      headStyles: { fillColor: [211, 211, 211], textColor: [54, 69, 79], halign: 'center'},
      startY:startYfooter + 33,
      styles: { cellPadding: 1.5, fontSize: 7 },
      body: bodyGarantia,
      margin: { left: 8 },
      tableWidth: 193,
      columns: [{header: null, dataKey: 'index'},
      {header: null, dataKey: 'desc'},]
    }))
    
    //----MINISPLIT INCLUYE
    let alturaGarantias = startYfooter + 56
    doc.setFontType("bold"); // set font
    doc.setFontSize(7);
    
    diferenciaAlturaTotalX = pageHeight - (alturaGarantias)
    alturaLimite = alturaGarantias - diferenciaAlturaTotalX +89
    js = alturaGarantias
    if (alturaGarantias > 270)
      {
        doc.addPage();
        js = alturaGarantias
        alturaGarantias = 15
       // y = 0 // Restart height position
      }
     

    doc.text("Observaciones:", 10, alturaGarantias);
    doc.setFontType("normal");
    doc.setFontSize(7);
    let incluye = `  Es obligacion del cliente despejar el area donde se llevara a cabo la ejecución del servicio ya que AIRE EXPRESS(Maria 
      Dolores Gonzalez Ramirez) no se hace responsable por la perdida, daños y/o pertenencias personales o de valor en el lugar del servicio.
      Se requiere instalacion electrica al pie de MiniSplit
      -Instalacion mecanica basica en Mini Split incluye:
      -Montaje y fijacion de evaporador Mini Split, motaje y anclaje de condensador Mini Split.
      -Tuberias de refrigeracion, Asilamiento termico, Cinta protectiva, cable de senal y poder entre evaprador y condensador
       de 3 o 4 metros dependiendo de la marca y modelo de su equipo.

      Instalación mecanica no incluye en caso de ser requerido:
      -Tuberias de refrigración adicionales, desmontajes de Mini Split, tuberia de desague adicionales, base metalica o de concreto para condensador,
      trabajos de albañileria como ranurado, ocultacion de tuberias, acabados y/o pinturas.
       
      *Para agendar cualquier servicio es necesario llamar a la oficina.
      *Favor de revisar su mercancia antes de salir, ya que no habra cambios ni devoluciones.
      *Si necesita factura favor de solicitarla al momento de la compra y/o servicio.
      *Para cualquier aclaración o correcion en su factura, tiene 5 dias habiles dentro del mismo mes para solicitarlo.
      *Precios no incluyen IVA(16%)
      *Toda cancelacion de servicio genera costo de revisión y/o visita del tecnico.`
    doc.text(incluye, 10, alturaGarantias + 5);


     }else if (response.tipo ==3){
      
      
      doc.autoTable(({
        headStyles: { fillColor: [255, 195, 0], textColor: [0, 0, 0], halign: 'center'},
        startY:65,
        margin: { left: 8 },
        tableWidth: 193,
        columns: [
            { header: 'Venta de servicio', dataKey: null }
          ],
      }))
    
    
      let bodyDatosInstalacion = [{index: 1, cantidad_personal: response.cantidad_personal,
                                  tiempo_horas: response.tiempo_horas,
                                  nombre_personal: response.nombre_personal}] 
      let startYSeries = startY + 7.5; 
      doc.autoTable(({
        headStyles: { fillColor: [211, 211, 211], textColor: [54, 69, 79], halign: 'center'},
        startY:startYSeries,
        body: bodyDatosInstalacion,
        margin: { left: 8 },
        tableWidth: 193,
        columns: [
            { header: '#', dataKey: "index" },
            { header: 'Cantidad de personal', dataKey: "cantidad_personal" },
            { header: 'Tiempo en horas', dataKey: "tiempo_horas" },
            { header: 'Nombre de personal', dataKey: "nombre_personal"}
          ],
      }))
    
      let alturaDatosInstalacion = 7.5 * (bodyDatosInstalacion.length)
    
      let startOptions = 30 + startY + alturaDatosInstalacion;

      doc.setFontType("bold");
      doc.text("Pago en domicilio:", 20, startOptions);
      doc.text("pago en sucursal:", 80, startOptions);

      if(response.pago_domicilio == "true"){
        doc.addImage(icon_checked, "JPEG", 55, startOptions - 5, 5,  5);
      }else{
        doc.addImage(icon_unchecked, "JPEG", 55, startOptions - 5, 5,  5);
      }

      if(response.pago_sucursal == "true"){
        doc.addImage(icon_checked, "JPEG", 113, startOptions -5,5,  5);
      }else{
        doc.addImage(icon_unchecked, "JPEG", 113, startOptions -5,5,  5);
      }
      
    
      
    let startYfooter =  startY + alturaDatosInstalacion +45

    doc.setFontType("normal");
    
      doc.text("Firma", 10, startYfooter);
      doc.text("Nombre", 60, startYfooter);
      doc.text("Fecha", 160, startYfooter);
    
      doc.setFontSize(8);
      doc.setFontType("normal");
      let contrato = `Recibi(mos) de conformidad los equipos, materiales y trabajos mencionados debo y pagare(mos) incondicionalmente a la orden de Maria Dolores Gon-
      zalez Ramirez, el total descrito en esta orden. De no ser cubierto el importe de la misma de 8 dias, causara el 10% de interes moratorio mensual. 
      Rev. 11 2022`
      doc.text(contrato, 10, startYfooter + 5, {align: 'justify',lineHeightFactor: 1.5,maxWidth:193});
    
    
      //--------GARANTIA-------
     /*  let garantia = `Garantia de fabricante MiniSplit Nuevo - Cobertura limitada a refacciones. 
    Usuario cubre costos de revisiones, mano de obra por remplazo de refacciones, para hacer valida su GARANTIA, fabricante requiere factura de compra
    y requiere que realize MANTENIMIENTO PREVENTIVO cada año. Con AireExpress o tecnico certiicado, como tener comprobantes correspondientes.`
    
    doc.text(garantia, 10, startYfooter + 15, {align: 'justify',lineHeightFactor: 1.5,maxWidth:193});
     */
    let bodyGarantia = [
      {index: "30", desc: "dias de garantia en servicios de reparación y mantenimiento preventivo."},
     ];
    doc.autoTable(({
      headStyles: { fillColor: [211, 211, 211], textColor: [54, 69, 79], halign: 'center'},
      startY:startYfooter + 18,
      body: bodyGarantia,
      margin: { left: 8 },
      tableWidth: 193,
      columns: [{header: null, dataKey: 'index'},
      {header: null, dataKey: 'desc'},]
    }))
    
    //----MINISPLIT INCLUYE
    let alturaGarantias = startYfooter + 30
    doc.setFontType("bold"); // set font
    doc.setFontSize(11);
    
    doc.text("Observaciones", 10, alturaGarantias);
    doc.setFontType("normal");
    doc.setFontSize(8);
    let incluye = `Es obligacion del cliente despejar el area donde se llevara a cabo la ejecución del servicio ya que AIRE EXPRESS(Maria 
      Dolores Gonzalez Ramirez) no se hace responsable por la perdida, daños y/o pertenencias personales o de valor en el lugar del servicio.
      
      Para agendar cualquier servicio es necesario llamar a la oficina.

      Favor de revisar su mercancia antes de salir, ya que no habra cambios ni devoluciones.
      
      Si necesita factura favor de solicitarla al momento de la compra y/o servicio.
      
      Para cualquier aclaración o correcion en su factura, tiene 5 dias habiles dentro del mismo mes para solicitarlo.
      
      Precios no incluyen IVA(16%)
      
      Toda cancelacion de servicio genera costo de revisión y/o visita del tecnico.`
    doc.text(incluye, 10, alturaGarantias + 5);

     }else if (response.tipo ==4){
      
      
      doc.autoTable(({
        headStyles: { fillColor: [255, 195, 0], textColor: [0, 0, 0], halign: 'center'},
        startY:65,
        margin: { left: 8 },
        tableWidth: 193,
        columns: [
            { header: 'Venta de refacción', dataKey: null }
          ],
      }))
    
    
      /* let bodyDatosInstalacion = [{index: 1, cantidad_personal: response.cantidad_personal,
                                  tiempo_horas: response.tiempo_horas,
                                  nombre_personal: response.nombre_personal}]  */
      /* let startYSeries = startY + 7.5;  */
      /* doc.autoTable(({
        headStyles: { fillColor: [211, 211, 211], textColor: [54, 69, 79], halign: 'center'},
        startY:startYSeries,
        body: bodyDatosInstalacion,
        margin: { left: 8 },
        tableWidth: 193,
        columns: [
            { header: '#', dataKey: "index" },
            { header: 'Cantidad de personal', dataKey: "cantidad_personal" },
            { header: 'Tiempo en horas', dataKey: "tiempo_horas" },
            { header: 'Nombre de personal', dataKey: "nombre_personal"}
          ],
      })) */
    
      /* let alturaDatosInstalacion =  bodyDatosInstalacion.length */
    
      let startOptions = 3 + startY; /* alturaDatosInstalacion; */

    /*   doc.setFontType("bold");
      doc.text("Pago en domicilio:", 20, startOptions);
      doc.text("pago en sucursal:", 80, startOptions); */

      /* if(response.pago_domicilio == "true"){
        doc.addImage(icon_checked, "JPEG", 55, startOptions - 5, 5,  5);
      }else{
        doc.addImage(icon_unchecked, "JPEG", 55, startOptions - 5, 5,  5);
      }

      if(response.pago_sucursal == "true"){
        doc.addImage(icon_checked, "JPEG", 113, startOptions -5,5,  5);
      }else{
        doc.addImage(icon_unchecked, "JPEG", 113, startOptions -5,5,  5);
      } */
      
    
      
    let startYfooter =  startY + 25

    doc.setFontType("normal");
    
      doc.text("Firma", 10, startYfooter);
      doc.text("Nombre", 60, startYfooter);
      doc.text("Fecha", 160, startYfooter);
    
      doc.setFontSize(8);
      doc.setFontType("normal");
      let contrato = `Recibi(mos) de conformidad los equipos, materiales y trabajos mencionados debo y pagare(mos) incondicionalmente a la orden de Maria Dolores Gon-
      zalez Ramirez, el total descrito en esta orden. De no ser cubierto el importe de la misma de 8 dias, causara el 10% de interes moratorio mensual. 
      Rev. 1 2022`
      doc.text(contrato, 10, startYfooter + 5, {align: 'justify',lineHeightFactor: 1.5,maxWidth:193});
    
    
      //--------GARANTIA-------
     /*  let garantia = `Garantia de fabricante MiniSplit Nuevo - Cobertura limitada a refacciones. 
    Usuario cubre costos de revisiones, mano de obra por remplazo de refacciones, para hacer valida su GARANTIA, fabricante requiere factura de compra
    y requiere que realize MANTENIMIENTO PREVENTIVO cada año. Con AireExpress o tecnico certiicado, como tener comprobantes correspondientes.`
    
    doc.text(garantia, 10, startYfooter + 15, {align: 'justify',lineHeightFactor: 1.5,maxWidth:193});
     */
    let bodyGarantia = [
      {index: "30", desc: "dias de garantia en servicios de reparación y mantenimiento preventivo."},
     ];
    doc.autoTable(({
      headStyles: { fillColor: [211, 211, 211], textColor: [54, 69, 79], halign: 'center'},
      startY:startYfooter + 18,
      body: bodyGarantia,
      margin: { left: 8 },
      tableWidth: 193,
      columns: [{header: null, dataKey: 'index'},
      {header: null, dataKey: 'desc'},]
    }))
    
    //----MINISPLIT INCLUYE
    let alturaGarantias = startYfooter + 40
    doc.setFontType("bold"); // set font
    doc.setFontSize(11);
    
    doc.text("Observaciones", 10, alturaGarantias);
    doc.setFontType("normal");
    doc.setFontSize(8);
    let incluye = `Precios Sujetos a cambio sin previo aviso. Se requiere deposito y/o pago para realizar el pedido de esta cotización. Productos sujetos a disponibilidad, 
confirmar existencias con agente de ventas.

Si necesita factura favor de solicitarla al momento de la compra y/o servicio.
    
Favor de revisar su mercancía antes de salir, ya que no habrá cambio ni devoluciones..`
    doc.text(incluye, 10, alturaGarantias + 5);

     }


  
//doc.save("Orden F"+ response.folio+".pdf");
var string = doc.output('datauristring');
var embed = "<embed width='100%' height='100%' src='" + string + "' style='margin:0px; padding:0px;'/>"
var x = window.open();

x.document.open();
x.document.write(embed);
x.document.close();
x.document.body.id = 'embed';
/*doc = document.getElementById("embed")
doc.style.margin = "0px 0px 0px 0px";
doc.style.padding = "0px 0px 0px 0px";*/


  }
});

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

 function addFooters() {
  const pageCount = doc.internal.getNumberOfPages();
  for(var i = 1; i <= pageCount; i++) {
      doc.text(String(i), 196, 285);
  }
}