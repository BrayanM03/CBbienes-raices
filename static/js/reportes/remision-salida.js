
 function verRemision(id_remision){
  
    //Creando objecto JSPDF
    const doc = new jsPDF();
    pageHeight= doc.internal.pageSize.height;


    //Llamada Ajax que traer datos del reporte
    $.ajax({
        type: "POST",
        url: "../servidor/reportes/traer-datos-de-orden.php",
        data: {id_orden: id_remision, tabla: "salidas", indicador: "id", tabla_detalle: "detalle_salida", tipo: "salida", indicador_detalle: "salida_id"},
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
    doc.text("Salida de material", 167, 10);
    doc.text("S"+res.folio, 180, 18);
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

doc.setDrawColor(0,170,228); // draw blue lines
doc.line(8, 35, 200, 35); //Line
doc.setDrawColor(10,10,10); // draw black lines
doc.line(8, 36, 200, 36); //Line

//Diseño de formulario de datoa de cliente - maquetacion
doc.setDrawColor(220,220,220); // draw gray lines
doc.rect(8,37,192,15)
doc.line(8, 44, 200, 44); //Line
doc.line(135, 37, 135, 52); // vertical line

/*
?Estas lineas son adicionales, en caso de necesitar mas filas?
doc.rect(8,52,192,15)
doc.line(8, 60, 200, 60); //Line
doc.line(135, 52, 135, 67); // vertical line */

doc.setDrawColor(10,10,10); // draw black lines
doc.setFontType("normal"); // set font
doc.setFontSize(9);

doc.setFontType("bold"); // set font
doc.text("Usuario: ", 10, 42);
doc.text("Fecha: ", 137, 42);
doc.setFontType("normal"); // set font
doc.text(res.usuario, 28, 42)
doc.text(res.fecha, 150, 42)

doc.setFontType("bold"); // set font
doc.text("Cliente: ", 10, 50);
doc.text("Hora: ", 137, 50);
doc.setFontType("normal"); // set font
doc.text(res.datos_cliente, 28, 50)
doc.text(res.hora, 150, 50);

}

function setContentBody(doc, response){

    let bodyTable = response.detalle_orden;

    doc.autoTable(({
        theme: 'grid',
        /* columnStyles: { 0: { halign: 'left', fillColor: [255, 255, 255] } }, */
        /* headStyles: { 0: { halign: 'left', fillColor: [211, 211, 211] } }, */
        headStyles: { fillColor: [211, 211, 211], textColor: [54, 69, 79]},
        body: bodyTable,
        styles: { cellPadding: 1.5, fontSize: 9, halign: 'center'},
        columnStyles: { descripcion: { halign: 'center' } },
        columns: [
          { header: 'Codigo', dataKey: 'codigo' },
          { header: 'Cantidad', dataKey: 'cantidad' },
          { header: 'Descripcion', dataKey: 'descripcion'},
        ],
        startY:60,
        margin: { left: 8 },
        tableWidth: 193
      }))

      let alturaPartidas = 8.5 * (bodyTable.length)
      let puntoY1 = alturaPartidas + 80 //?Esto indica la altura Y en la que nos encontramos despues de cargar la tabla de partidas
      doc.text("Comentarios", 8, puntoY1-4)
      doc.setDrawColor(213,213,213);
      doc.roundedRect(8, puntoY1, 193, 25, 3, 3, 'S')
      doc.setTextColor(107,107,107);
      doc.text(response.comentario, 10, puntoY1 + 5)

      setFooter(doc, puntoY1 + 40)


}

function setFooter(doc, alturaActual){
    doc.text("Firma recibido", 95, alturaActual)
    doc.line(135, alturaActual + 15, 75, alturaActual+15, "F")
    

};

