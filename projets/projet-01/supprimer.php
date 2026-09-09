<?php
require_once("connexion.php");

if(isset($_GET['id'])) {
    $stmt = $conn->prepare("DELETE FROM salaries WHERE id=?");
    $stmt->execute([$_GET['id']]);
}

header("Location: listeSalaries.php");
exit();
?>