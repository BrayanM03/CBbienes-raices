<?php

session_start();
unset($_SESSION["id"]); 
unset($_SESSION["nombre"]);
session_destroy();
header("Location: ../../static/login.php");
exit;

?>