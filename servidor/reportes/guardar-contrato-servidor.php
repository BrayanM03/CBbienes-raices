<?php

if(isset($_POST)){



    //file_put_contents('../../static/docs/C'. $_POST["cliente"]. '/CONTRATO.pdf', $pdfBinario);
    //Write data back to pdf file
    /* $pdf = fopen ('../../static/docs/C'. $_POST["cliente"]. '/CONTRATO.pdf','w');
    fwrite ($pdf,$pdfBinario);
    //close output file
    fclose ($pdf); */
    move_uploaded_file(
    $_FILES['pdf']['tmp_name'], 
    '../../static/docs/C'. $_POST["cliente"]. '/CONTRATO.pdf'
);
}

?>