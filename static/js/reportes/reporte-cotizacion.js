
 function verRemision(id_remision){
  
    //Creando objecto JSPDF
    const doc = new jsPDF();
    pageHeight= doc.internal.pageSize.height;


    //Llamada Ajax que traer datos del reporte
    $.ajax({
        type: "POST",
        url: "../servidor/reportes/traer-datos-de-orden.php",
        data: {id_orden: id_remision, tabla: "cotizaciones", indicador: "id", tabla_detalle: "detalle_cotizacion", tipo: "cotizacion", indicador_detalle: "cotizacion_id"},
        dataType: "JSON",
        success: function (response) {
            console.log(response);

            setHeader(doc, response)
            setContentHeader(doc, response)
            setContentBody(doc, response)
          

            //Mostrando pdf
            //doc.save("Orden F"+ response.folio+".pdf");
            var string = doc.output('datauristring');
            var embed = "<embed width='100%' height='100%' src='" + string + "' style='margin:0px; padding:0px;'/>"
            var x = window.open();

            x.document.open();
            x.document.write(embed);
            x.document.close();
            x.document.body.id = 'embed';
        }
    });
}


function setHeader(doc, res){

    logo = data_logo.replace(/[\s"\\]/gm, "");
    doc.addImage(logo, "JPEG", 8, 5, 33, 16);

    doc.addFont("Monaco-bold.ttf", "bold");
    doc.text("Sistemas y Servicios HC", 80, 10);
    doc.setFontSize(11);
    doc.setTextColor(0,0,0);
    doc.text("Cotización", 170, 10);
    doc.text("C"+res.folio, 180, 18);
    doc.setDrawColor(0,170,228);
    doc.roundedRect(169, 12, 28, 9, 3, 3, 'S')
    doc.setTextColor(107,107,107);
    doc.addFont("Monaco-normal.ttf", "normal");
    let split = res.datos_sucursal.direccion.split("Heroica Matamoros")
    doc.text(split[0], 75, 16);
    doc.text("Matamoros Tamaulipas", 90, 20);
    doc.text("SSH180309TY1 8688179502", 85, 25);
    
    
}

function setContentHeader(doc, res){
doc.setFontType('bold');
doc.setFontSize(14);
doc.setTextColor(0,0,0);
doc.text(res.datos_cliente, 10, 50);

doc.setFontSize(12);
doc.setFontType('normal');
doc.setTextColor(107,107,107);
doc.text(res.direccion, 10, 56);
doc.text(res.correo, 10, 62);
doc.text(res.telefono, 10, 68);

doc.setDrawColor(0,170,228); // draw blue lines
doc.line(8, 75, 200, 75); //Line
doc.setDrawColor(10,10,10); // draw black lines
doc.line(8, 76, 200, 76); //Line



}

function setContentBody(doc, response){

    let bodyTable = response.detalle_orden;

    const $body_table = bodyTable.map((value, key) => {
        value.precio_unitario = Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(value.precio_unitario)
        value.descuento = Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(value.descuento)
        value.importe = Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(value.importe)
        return value;
    })

    console.log($body_table);

    doc.autoTable(({
        theme: 'grid',
        /* columnStyles: { 0: { halign: 'left', fillColor: [255, 255, 255] } }, */
        /* headStyles: { 0: { halign: 'left', fillColor: [211, 211, 211] } }, */
        headStyles: { fillColor: [211, 211, 211], textColor: [54, 69, 79]},
        body: $body_table,
        styles: { cellPadding: 1.5, fontSize: 9, halign: 'center'},
        columnStyles: { descripcion: { halign: 'center' } },
        columns: [
          { header: 'Codigo', dataKey: 'codigo' },
          { header: 'Cantidad', dataKey: 'cantidad' },
          { header: 'Descripcion', dataKey: 'descripcion'},
          { header: 'Prec. unit', dataKey: 'precio_unitario'},
          { header: 'Descuento', dataKey: 'descuento'},
          { header: 'Importe', dataKey: 'importe'},
        ],
        startY:80,
        margin: { left: 8 },
        tableWidth: 193
      }))

      let alturaPartidas = 8.5 * (bodyTable.length)

      let subtotal = Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(response.subtotal)
      let descuento = Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(response.descuento)
      let impuesto = Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(response.impuesto)
      let neto = Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(response.neto)
      let tasa = response.tasa.split().pop()


      doc.setTextColor(107,107,107);
      doc.text("Subtotal", 135, alturaPartidas + 94)
      doc.text("Descuento", 135, alturaPartidas + 100)
      doc.text("Impuesto "+tasa + "%", 135, alturaPartidas + 106)
      doc.text("Total", 135, alturaPartidas + 114)


      doc.setTextColor(1,1,1);
      doc.text(subtotal, 175, alturaPartidas + 94)
      doc.text(descuento, 175, alturaPartidas + 100)
      doc.text(impuesto, 175, alturaPartidas + 106)
      doc.text(neto, 175, alturaPartidas + 114)
      let puntoY1 = alturaPartidas + 150 //?Esto indica la altura Y en la que nos encontramos despues de cargar la tabla de partidas
      doc.text("Comentarios", 8, puntoY1-4)
      doc.setDrawColor(213,213,213);
      doc.roundedRect(8, puntoY1, 193, 25, 3, 3, 'S')
      doc.setTextColor(107,107,107);
      doc.text(response.comentario, 10, puntoY1 + 5)

      setFooter(doc, puntoY1 + 46)


}

function setFooter(doc, alturaActual){
    doc.text("Firma recibido", 95, alturaActual)
    doc.line(135, alturaActual + 15, 75, alturaActual+15, "F")
    

};

