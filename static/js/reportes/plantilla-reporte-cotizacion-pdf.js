function descargarCotizacion(id){
// Landscape export, 2×4 inches
const doc = new jsPDF();


let id_orden = id//getParameterByName("id_orden")  

$.ajax({
    type: "POST",
    url: "../servidor/reportes/traer-datos-de-cotizacion.php",
    data: {id_orden: id_orden, tabla: "cotizaciones", indicador: "id"},
    dataType: "JSON",
    success: function (response) {
        console.log(response);

        response.id_sucursal == "1" ? data_logo = data_logo_aireexpress : data_logo = data_logo_serviclima;

logo = data_logo.replace(/[\s"\\]/gm, "");
icon_checked= data_checked.replace(/[\s"\\]/gm, "");
icon_unchecked = data_unchecked.replace(/[\s"\\]/gm, "");
doc.addImage(logo, "JPEG", 8, 5, 40, 17);


doc.setFont("helvetica"); // set font
doc.setFontType("bolditalic"); // set font

doc.text("Cotización C"+response.folio , 162, 10);

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

doc.text("Correo", 147, 60);

doc.setFontType("normal"); // set font
doc.text(response.datos_cliente.nombre, 28, 38)
doc.text(response.fecha, 160, 38)
doc.text(response.datos_cliente.contacto, 28, 45)
doc.text(response.datos_cliente.rfc, 165, 45)
doc.text(response.datos_cliente.direccion, 28, 53)
doc.text(response.datos_cliente.telefono, 170, 53)

 //---------Formateando importes ---//

 response.detalle_orden.forEach(element => {
  importe_do = element["importe"];
  precio_unit_do = element["precio_unit"];
  importe_formateado = currency(importe_do);
  precio_unit_formateado = currency(precio_unit_do);

  element["importe"] = importe_formateado;
  element["precio_unit"] = precio_unit_formateado;
}); 


//-----------Cuerpo de items -----//

if(response.tipo == "1" || response.tipo == "3"){
   comentario = 'Recuerde hacer limpieza de filtros de Aire Acondicionado cada mes'
}else if(response.tipo == "2"){
   comentario = ``
}else if(response.tipo == "4"){
  comentario = ""
}else{
  comentario = ""
}

let bodyTable = response.detalle_orden;
let metodo = { precio_unit: '', importe:response.metodo_pago };
importe_total_formateado = currency(response.total)
let importe_total = { descripcion: comentario, precio_unit: 'Total', importe: importe_total_formateado}

bodyTable.push(metodo, importe_total)
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
    styles: {halign: 'center'},
    columns: [
      { header: 'Cant', dataKey: 'cantidad' },
      { header: 'Descripcion', dataKey: 'descripcion' },
      { header: 'Precio Unit.', dataKey: 'precio_unit' },
      { header: 'Importe', dataKey: 'importe' },
    ],
    startY:64,
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
     let startY = 75 + alturaPartidas;



     //MAQUETANDO FOOT DEPENDIENDO DEL TIPO DE ORDENES
     //TIPO 1 VENTA SIN INSTALACION
     //TIPO 2 VENTA CON INSTALACION
     //TIPO 3 SERVICIO

  

      doc.autoTable(({
        headStyles: { fillColor: [255, 195, 0], textColor: [0, 0, 0], halign: 'center'},
        startY:startY,
        margin: { left: 8 },
        tableWidth: 186,
        columns: [
            { header: 'Esta es una nota de presupuesto o cotización', dataKey: null }
          ],
      }))
    
    
    
    
      let alturaSeries = 7.5 
    
      let startYfooter = 25 + startY + alturaSeries;
    
      
    
      
      doc.text("Firma:", 10, startYfooter);
      doc.text("Nombre:", 60, startYfooter);
      doc.text("Fecha:", 160, startYfooter);
    
    if(response.tipo =="1"){

      doc.autoTable(({
      headStyles: { fillColor: [255, 195, 0], textColor: [0, 0, 0], halign: 'center'},
      startY:startY,
      margin: { left: 8 },
      tableWidth: 193,
      columns: [
          { header: 'Venta sin instalación', dataKey: null }
        ],
    }))
  
  
    let bodySeries = [];
    let startYSeries = startY + 7.5; 
   
  
    let alturaSeries = 7.5 * (bodySeries.length)
  
    let startYfooter = 42 + startY + alturaSeries;
  
    
  
    doc.setFontType("bold");
    doc.text("Garantia:", 10, startYfooter);
    doc.setFontType("normal");
  
    //--------GARANTIA-------
    let garantia = `Garantia de fabricante MiniSplit Nuevo - Cobertura limitada a refacciones. 
  Usuario cubre costos de revisiones, mano de obra por remplazo de refacciones, para hacer valida su GARANTIA, 
  fabricante requiere factura de compra y requiere que realize MANTENIMIENTO PREVENTIVO cada año. Con AireExpress 
  o tecnico certiicado, como tener comprobantes correspondientes.`
  
  doc.text(garantia, 10, startYfooter + 5, {align: 'justify',lineHeightFactor: 1.5,maxWidth:193});
  
  let bodyGarantia = [
    {index: "5", desc: "Año(s) de garantia en compresor. Compresor no debe estar quemado, aterrizado, cruzado o con los bordes botados o zafados"},
    {index: "1", desc: "Año(s) de garantia en refacciones"},
    {index: "3", desc: "meses de garantia en componentes electronicos"}];
  doc.autoTable(({
    headStyles: { fillColor: [211, 211, 211], textColor: [54, 69, 79], halign: 'center'},
    startY:startYfooter + 25,
    body: bodyGarantia,
    margin: { left: 8 },
    tableWidth: 193,
    columns: [{header: null, dataKey: 'index'},
    {header: null, dataKey: 'desc'},]
  }))
  
  //----MINISPLIT INCLUYE
  let alturaGarantias = startYfooter + 60
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
      
      /* doc.setFontType("bold");
      doc.text("Garantia de Fabricante Mini Split Nuevo :", 10, startYfooter + 10);
      doc.setFontType("normal");
      doc.setFontSize(8);
      let garantia =  `Cobertura limitada a refacciones. Usuario cubre costos de revisiones, mano de obra y fletes 
      por reemplazo de refacciones. Para hacer valida su GARANTIA, fabricante requiere factura de compra y requiere que realize 
      MANTENIMIENTO PREVENTIVO cada Año. Con Aire Express o tecnico certificado, como tener comprobantes correspondientes.`
      doc.text(garantia, 10, startYfooter + 15);


      doc.setFontType("bold");
      doc.setFontSize(11);
      doc.text("Minisplit incluye:", 10, startYfooter + 32);
      doc.setFontType("normal");
      doc.setFontSize(8);
      let incluye = `  Precios Sujetos a cambio sin previo aviso. Se requiere deposito y/o pago para realizar los servicios de esta cotización. 
      Productos sujetos a disponibilidad, confirmar existencias con agente de ventas.`
      doc.text(incluye, 10, startYfooter + 37); */

      
    }else if(response.tipo =="2"){

      doc.setFontType("bold");
      doc.text("Garantia :", 10, startYfooter + 10);
      doc.setFontType("normal");
      doc.setFontSize(8);
      let garantia =  `      Garantia de fabricante MiniSplit Nuevo - Cobertura limitada a refacciones.
      Usuario cubre costos de revisiones, mano de obra por remplazo de refacciones, para hacer valida su GARANTIA,
      fabricante requiere factura de compra y requiere que realize MANTENIMIENTO PREVENTIVO cada año. Con AireExpress
      o tecnico certiicado, como tener comprobantes correspondientes.`
      doc.text(garantia, 10, startYfooter + 15);

      let alturaGarantias = startYfooter + 53
      let bodyGarantia = [
        {index: "5", desc: "Año(s) de garantia en compresor. Compresor no debe estar quemado, aterrizado, cruzado o con los bordes botados o zafados"},
        {index: "1", desc: "Año(s) de garantia en refacciones"},
        {index: "3", desc: "meses de garantia en componentes electronicos"}];
      doc.autoTable(({
        headStyles: { fillColor: [211, 211, 211], textColor: [54, 69, 79], halign: 'center'},
        startY:startYfooter + 27,
        body: bodyGarantia,
        styles: { cellPadding: 1.5, fontSize: 8 },
        margin: { left: 8 },
        tableWidth: 193,
        columns: [{header: null, dataKey: 'index'},
        {header: null, dataKey: 'desc'},]
      }))

      doc.text("Mini Split incluye", 10, alturaGarantias);
  doc.setFontType("normal");
  doc.setFontSize(8);
  let incluye1 = `Evaporador, Condensador, control remoto, kit de instalacion de 3 o 4 metros dependiendo de la marca de
  y modelo de su equipo.
  Favor de revisar su mercancia, ya que no habra cambios ni devoluciones.
  Si necesita su factura favor de solitarla al momento de la compra y/o servicio.`
  doc.text(incluye1, 10, alturaGarantias + 5);
      
      doc.setFontType("bold");
      doc.text("Nota :", 10, alturaGarantias + 20);
      doc.setFontType("normal");
      doc.setFontSize(8);
      let nota =  `      En dado caso de requerir instalacion especial, perforaciones adicionales, juego de escuadras, tuberia
      extra,tuberias de desague adicionales, instalacion electrica, trabajos de albañileria como ranurado, ocultacion de tuberías, 
      acabados, y/o pinturas o cualquier otro tipo de material que no incluya la instalacion mecanica basica genera un costo adicional.`
      doc.text(nota, 10, alturaGarantias + 23);

      doc.setFontType("bold");
      doc.setFontSize(8);
      doc.text("Observaciones:", 10, alturaGarantias + 35);
      doc.setFontType("normal");
      doc.setFontSize(8);
      let incluye = `      Precios Sujetos a Cambio sin Previo Aviso, Se requiere deposito en firme al autorizar los servicios de esta cotizacion. 
      Precios validos solamente para conceptos de esta cotizacion. 30 dias de Garantia en servicios de reparaciones y Mantenimientos preventivos.`
      doc.text(incluye, 10,  alturaGarantias + 39);

      doc.setFontType("bold");
      doc.setFontSize(8);
      doc.text("Incluye:", 10, alturaGarantias + 47);
      doc.setFontType("normal");
      doc.setFontSize(8);
      let incluye2 = `
      Instalacion Mecanica Basica de Aire Acondicionado, Tipo Mini Split, Instalacion Incluye: montaje de condensador,
      montaje de evaporador, y instalacion de kit de tuberias de refrigeracion de 3 o 4 metros dependiendo el modelo, cable de señal y poder. Se
      requiere luz electrica al pie del equipo`
      doc.text(incluye2, 10, alturaGarantias + 49);

      
      
    }else if(response.tipo =="3"){

      doc.setFontType("bold");
      doc.text("Observaciones :", 10, startYfooter + 10);
      doc.setFontType("normal");
      doc.setFontSize(8);
      let garantia =  `     Precios Sujetos a Cambio sin Previo Aviso, Se requiere deposito en firme al autorizar los servicios de esta cotizacion. 
      Precios validos solamente para conceptos de esta cotizacion. 30 dias de Garantia en servicios de reparaciones y Mantenimientos preventivos.`
      doc.text(garantia, 10, startYfooter + 15);

    }else if(response.tipo == "4"){
      doc.setFontType("bold");
      doc.setFontSize(11);
      doc.text("Observaciones:", 10, startYfooter + 32);
      doc.setFontType("normal");
      doc.setFontSize(8);
      let incluye = `     Precios Sujetos a cambio sin previo aviso. Se requiere deposito y/o pago para realizar el pedido de esta cotización. 
      
      Productos sujetos a disponibilidad, confirmar existencias con agente de ventas.

      Si necesita factura favor de solicitarla al momento de la compra y/o servicio.
      
      Favor de revisar su mercancía antes de salir, ya que no habrá cambio ni devoluciones.`
      doc.text(incluye, 10, startYfooter + 37);
    }
      

     
  
//doc.save("Reporte de cotización C"+ response.folio+".pdf");
var string = doc.output('datauristring');
var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
var x = window.open();
x.document.open();
x.document.write(embed);
x.document.close();



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