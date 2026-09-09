<?php
require_once("connexion.php");

function getSalaries() {
    global $conn;
    $stmt = $conn->query("SELECT * FROM salaries ORDER BY id");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getNombreSalaries() {
    global $conn;
    return $conn->query("SELECT COUNT(*) FROM salaries")->fetchColumn();
}

function getSalaireMoyen() {
    global $conn;
    return round($conn->query("SELECT AVG(salaire) FROM salaries")->fetchColumn(),2);
}

function getSalaireMax() {
    global $conn;
    return $conn->query("SELECT MAX(salaire) FROM salaries")->fetchColumn();
}

function getSalaireMin() {
    global $conn;
    return $conn->query("SELECT MIN(salaire) FROM salaries")->fetchColumn();
}

function getNombreParService() {
    global $conn;
    $stmt = $conn->query("SELECT service, COUNT(*) as total FROM salaries GROUP BY service");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>