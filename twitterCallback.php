<?php
    // Twitter redirige ici après l'autentification. On récupère les variables et on redirige vers l'index.
    include("Script/sc.config.php");
    $informations = $Twitter->IsConnected();
    
    header('location: index.php');