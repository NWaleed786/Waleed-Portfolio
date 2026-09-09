<?php
$host = "localhost";
$dbname = "chambord";
$user = "Waleed";
$pass = "Tarar786.";  // le mot de passe que tu viens de définir

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>