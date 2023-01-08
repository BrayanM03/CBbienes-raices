function verTicketAbono(abono_id){
  // Landscape export, 2×4 inches
  const doc = new jsPDF();
    
  
  fetch('../servidor/abonos/traer-ticket-abono.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"abono_id":abono_id})
    })
    .then(response => response.json())
    .then((data) =>{
  
  
     console.log(data);

     logo = data_logo_montealto.replace(/[\s"\\]/gm, "");
     logo_cb = data_logo_cb.replace(/[\s"\\]/gm, "");

doc.addImage(logo_cb, "JPEG", 75, 10, 50, 17);
doc.setFontType("normal");
doc.setFontSize(10);
doc.text( `C. España 71, Buena Vista, 87497  
Heroica Matamoros, Tamps.`,106,29, 'center');


  doc.setFont("helvetica"); // set font
  doc.setFontType("bold");
  doc.setFontSize(11);
  doc.text( "TICKET DE ABONO",82, 43);
  doc.setFontSize(9);
  doc.text("Folio " +  data.datos.datos_abono.id,89, 47);
  doc.setFontType("bold")


  cliente_mayus = data.datos.cliente.toUpperCase();
  pagado = data.datos.pagado
  saldo = data.datos.saldo           
  proyecto = data.datos.proyecto 
  manzana = data.datos.manzana
  lote = data.datos.lote  
  fecha = data.datos.datos_abono.fecha
  total = data.datos.datos_abono.total
  tipo = data.datos.datos_abono.tipo

  DatosGenerales = [{"cliente": cliente_mayus,"fecha": fecha, "total": total, "tipo": tipo}]
  bodyContract = [{data: DatosGenerales}]
  //Tabla autotable
  doc.autoTable(({
    headStyles: { fillColor: [211, 211, 211], textColor: [54, 69, 79], halign: 'justify'},
    startY:53,
    body: DatosGenerales,
    styles: { cellPadding: 4, fontSize: 11 },
    margin: { left: 8, top: 8},
    tableWidth: 190,
    columns: [
      { header: 'Cliente', dataKey: 'cliente' },
      { header: 'Fecha', dataKey: 'fecha' },
      { header: 'Abono', dataKey: 'total'},
      { header: 'Tipo', dataKey: 'tipo'},
    ],
  }))

  doc.setFontSize(11)
  doc.text("Precio total $" +  data.datos.precio,129, 94);
  doc.text("Pagado $" +  data.datos.pagado,129, 100);
  doc.text("Saldo pendiente $" +  data.datos.saldo,129, 106);

  doc.text("Proyecto " +  data.datos.proyecto,70, 94);
  doc.text("Manzana " +  data.datos.manzana,70, 100);
  doc.text("Lote " +  data.datos.lote,70, 106);



  var string = doc.output('datauristring');
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
  
   