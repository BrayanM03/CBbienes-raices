<?php

include '../database/conexion.php';


//require '../../vistas/vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\SpreadSheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Color;

//require '../../vendor/autoload.php';

 require_once '../../vendor/phpoffice/phpspreadsheet/samples/Bootstrap.php'; 
date_default_timezone_set("America/Matamoros");
session_start(); 

$nombre_del_usuario = $_SESSION["nombre"] . " ". $_SESSION["apellido"];
$año = date("Y");
$fecha=date("Y-m-d");
$count = 0; 
    

        //Creamos objeto de hoja de excel
        $spreadsheet = new SpreadSheet();
        $spreadsheet->getProperties()->setCreator($nombre_del_usuario)->setTitle("Primer excel");

        //ITERACIONES
      
            
            //Esablecemos y obtenemos la primera hoja activa -- 

            $spreadsheet->createSheet();
            
            $spreadsheet->setActiveSheetIndex(0);
            $hoja_activa = $spreadsheet->getActiveSheet();
            $hoja_activa->setTitle("Reporte de vencidos " . $fecha);

            //$categoria = 'computadorascat';

            $arreglo =traerDetalles($con, $fecha);
          
         
            
            $cantidad_resultado = count($arreglo);

             //Establecemos cabezera del reporte
           //Combinar y centrar
           $hoja_activa->mergeCells("A1:B1");
           $hoja_activa->mergeCells("C1:H1");
           $hoja_activa->setCellValue('C1', 'Reporte de creditos vencidos este mes ' . $fecha);
           $hoja_activa->getStyle('C1')->getFont()->setBold(true);
           $hoja_activa->getStyle('C1')->getFont()->setSize(16);
           $hoja_activa->getRowDimension('1')->setRowHeight(50);
           $hoja_activa->getStyle('A1')->getAlignment()->setHorizontal('center');
           $hoja_activa->getStyle('A1')->getAlignment()->setVertical('center');
           $hoja_activa->getStyle('C1')->getAlignment()->setHorizontal('center');
           $hoja_activa->getStyle('C1')->getAlignment()->setVertical('center');

               //Establecer logos
           $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
           $drawing->setName('LogoPSC');
           $drawing->setDescription('Logo');
           $drawing->setPath('../../static/img/logo.jpg'); // put your path and image here
           $drawing->setCoordinates('A1');
           $drawing->setOffsetX(20);
           $drawing->setWidth(80);
           $drawing->setHeight(63);
           $drawing->setWorksheet($hoja_activa);
        
        

           //Validamos si se encontraron registros en la tabla, se valida 
           if ($cantidad_resultado == 0) {

            /*  $drawing->getShadow()->setVisible(true);
           $drawing->getShadow()->setDirection(45); */
           $hoja_activa->setAutoFilter('A2:G2');
          // $autofilter = $hoja_activa->getAutofilter();
           

          $hoja_activa->mergeCells("A2:H2");
          $hoja_activa->getStyle('A2:H2')->getAlignment()->setHorizontal('center');
          $hoja_activa->getStyle('A2:H2')->getAlignment()->setVertical('center');
          $hoja_activa->setCellValue('A2', 'Reporte de terrenos vendidos este mes de los cuales la fecha de vencimiento a vencido');

          $hoja_activa->getColumnDimension('A')->setWidth(5);
          $hoja_activa->setCellValue('A3', '#');
          $hoja_activa->getColumnDimension('B')->setWidth(25);
          $hoja_activa->setCellValue('B3', 'Cliente');
          $hoja_activa->getColumnDimension('C')->setWidth(25);
          $hoja_activa->setCellValue('C3', 'Numero');
          $hoja_activa->getColumnDimension('D')->setWidth(10);
          $hoja_activa->setCellValue('D3', 'Proyecto');
       //   $columnFilter = $autofilter->getColumn('D');
          $hoja_activa->getColumnDimension('E')->setWidth(10);
          $hoja_activa->setCellValue('E3', 'Manzana');
          $hoja_activa->getColumnDimension('F')->setWidth(10);
          $hoja_activa->setCellValue('F3', 'Lote');
          $hoja_activa->getColumnDimension('G')->setWidth(25);
          $hoja_activa->setCellValue('G3', 'Fecha vencimiento');     
          $hoja_activa->getColumnDimension('H')->setWidth(15);
          $hoja_activa->setCellValue('H3', 'Pagado');
          $hoja_activa->getStyle('A3:H3')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setRGB('007bcc');
          $hoja_activa->getStyle('A3:H3')->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_WHITE);
          $hoja_activa->getStyle('A3:H3')->getFont()->setBold(true);
          $hoja_activa->getRowDimension('3')->setRowHeight(20);

            $hoja_activa->mergeCells("A4:H4");
            $hoja_activa->setCellValue('A4', 'Sin terrenos vencidos por el momento');
           
            
           
            $index = 2;
            /* $count++; */ 
           
        
       }else{

          

        

          /*  $drawing->getShadow()->setVisible(true);
           $drawing->getShadow()->setDirection(45); */
           $hoja_activa->setAutoFilter('A2:G2');
          // $autofilter = $hoja_activa->getAutofilter();
           

          $hoja_activa->mergeCells("A2:H2");
          $hoja_activa->getStyle('A2:H2')->getAlignment()->setHorizontal('center');
          $hoja_activa->getStyle('A2:H2')->getAlignment()->setVertical('center');
          $hoja_activa->setCellValue('A2', 'Ingresos');

          $hoja_activa->getColumnDimension('A')->setWidth(5);
          $hoja_activa->setCellValue('A3', '#');
          $hoja_activa->getColumnDimension('B')->setWidth(25);
          $hoja_activa->setCellValue('B3', 'Cliente');
          $hoja_activa->getColumnDimension('C')->setWidth(25);
          $hoja_activa->setCellValue('C3', 'Numero');
          $hoja_activa->getColumnDimension('D')->setWidth(10);
          $hoja_activa->setCellValue('D3', 'Proyecto');
       //   $columnFilter = $autofilter->getColumn('D');
          $hoja_activa->getColumnDimension('E')->setWidth(10);
          $hoja_activa->setCellValue('E3', 'Manzana');
          $hoja_activa->getColumnDimension('F')->setWidth(10);
          $hoja_activa->setCellValue('F3', 'Lote');
          $hoja_activa->getColumnDimension('G')->setWidth(25);
          $hoja_activa->setCellValue('G3', 'Fecha vencimiento');     
          $hoja_activa->getColumnDimension('H')->setWidth(15);
          $hoja_activa->setCellValue('H3', 'Abonado');
          $hoja_activa->getStyle('A3:H3')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setRGB('007bcc');
          $hoja_activa->getStyle('A3:H3')->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_WHITE);
          $hoja_activa->getStyle('A3:H3')->getFont()->setBold(true);
          $hoja_activa->getRowDimension('3')->setRowHeight(20);
         
           $fila = 3;

           //Estilos de las filas intercaladas
           /* $evenRow = [
               'fill'=>[
                   'fillType' => Fill::FILL_SOLID,
                   'startColor' => [
                       'rgb' => 'f4fbff'
                   ]
                   ] 
           ];

           $oddRow = [
               'fill'=>[
                   'fillType' => Fill::FILL_SOLID,
                   'startColor' => [
                       'rgb' => '90d3ff'
                   ]
                   ]
           ]; */
           $total_ingresos_efectivo = 0;
           
           //Recorremos el arreglo
           while ($row = array_shift($arreglo)) {
               # trabajos con los datos
          
               $id= $row["id"];
               $orden_id= $row["orden_id"];
              
               $proyecto= $row["proyecto"];
               $manzana= $row["manzana"];
               $lote= $row["lote"];
               $fecha_vencimiento = $row["fecha_vencimiento"];
               $abonado = $row["pagado"];
               $datos_de_ordenes = traerDatosOrdenes($con, $orden_id);

               $total_ordenes = count($datos_de_ordenes);
               /* print_r("total_ordenes " . $total_ordenes); */
               if($total_ordenes > 0){
               
                    while ($row2 = array_shift($datos_de_ordenes)) {
                        $cliente_etiqueta = $row2['cliente_etiqueta'];
                        $telefono = $row2["telefono"];

                        $index = $fila + 1;
                        $indicador = $fila - 1;
                        $hoja_activa->setCellValue('A' . $index, $id);
                        $hoja_activa->setCellValue('B' . $index, $cliente_etiqueta);
                        $hoja_activa->setCellValue('C' . $index, $telefono);
                        $hoja_activa->setCellValue('D' . $index, $proyecto);
                        $hoja_activa->setCellValue('E' . $index, $manzana);
                        $hoja_activa->setCellValue('F' . $index, $lote);
                        $hoja_activa->setCellValue('G' . $index, $fecha_vencimiento);
                        $hoja_activa->setCellValue('H' . $index, $abonado);
                        $hoja_activa->getStyle('A' .$index. ':H' .$index)->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN)->setColor(new Color('6495ed'));
                        $fila++;
                    }
               }else{

               }
                
               $index++;

               /* if ($index % 2 == 0) {
                   $hoja_activa->getStyle('A' .$index. ':J' .$index)->applyFromArray($evenRow);
               }else{
                   $hoja_activa->getStyle('A' .$index. ':J' .$index)->applyFromArray($oddRow);    
               } */

              
           }

           
       }
          
           $count++;
        

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="Reporte de '.$fecha .'.xlsx"');
        header('Cache-Control: max-age=0');

        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
        
        $writer->save('php://output');

    
        //Funcion que traera los datos de la base de datos
        function traerDetalles($con, $fecha){
           
            $consulta = "SELECT COUNT(*) FROM detalle_orden WHERE fecha_vencimiento <= ? AND estatus != 'Pagado'";
            $res = $con->prepare($consulta);
            $res->execute([$fecha]);
            $total = $res->fetchColumn();

            if($total > 0){
                $consulta = "SELECT * FROM detalle_orden WHERE fecha_vencimiento <= ? AND estatus != 'Pagado'";
                $res = $con->prepare($consulta);
                $res->execute([$fecha]);

                  while ($row = $res->fetch()) {
                        $data[] = $row;

                    }
                return $data;
            }else{
                return array();
            }
            
        }

        function traerDatosOrdenes($con, $orden_id){
            $consulta = "SELECT COUNT(*) FROM ordenes WHERE id = ?";
            $res = $con->prepare($consulta);
            $res->execute([$orden_id]);
            $total = $res->fetchColumn();

            if($total > 0){
                $consulta = "SELECT * FROM ordenes WHERE id = ?";
                $res = $con->prepare($consulta);
                $res->execute([$orden_id]);

                  while ($row = $res->fetch()) {
                        $data[] = $row;

                    }
                return $data;
            }else{
                return array();
            } 
        }


       
        //Funcion que emulara el get_result-----------------*
        function Arreglo_Get_Result( $Statement ) {
            $RESULT = array();
            $Statement->store_result();
            for ( $i = 0; $i < $Statement->num_rows; $i++ ) {
                $Metadata = $Statement->result_metadata();
                $PARAMS = array();
                while ( $Field = $Metadata->fetch_field() ) {
                    $PARAMS[] = &$RESULT[ $i ][ $Field->name ];
                }
                call_user_func_array( array( $Statement, 'bind_result' ), $PARAMS );
                $Statement->fetch();
            }
            return $RESULT;
        }

   ?>