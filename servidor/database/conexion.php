<?php
$usuario = "root";
$pass = "root";
try {
    $con = new PDO('mysql:host=localhost;dbname=cbbienes_raices;charset=utf8mb4', $usuario, $pass); //MAMP
   // $con = new PDO('mysql:host=localhost;dbname=erp', $usuario, $pass); //XAMPP
   
} catch (PDOException $e) {
    print "¡Error!: " . $e->getMessage() . "<br/>";
    die();
}
?>