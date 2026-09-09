<?php
require_once("connexion.php");

if (!isset($_GET['id'])) {
    header("Location: listeSalaries.php");
    exit();
}

$id = $_GET['id'];

$stmt = $conn->prepare("SELECT * FROM salaries WHERE id=?");
$stmt->execute([$id]);
$s = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$s) {
    header("Location: listeSalaries.php");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $stmt = $conn->prepare("UPDATE salaries 
                            SET nom=?, prenom=?, date_naissance=?, date_embauche=?, salaire=?, service=? 
                            WHERE id=?");

    $stmt->execute([
        $_POST['nom'],
        $_POST['prenom'],
        $_POST['date_naissance'],
        $_POST['date_embauche'],
        $_POST['salaire'],
        $_POST['service'],
        $id
    ]);

    header("Location: listeSalaries.php");
    exit();
}

require_once("header.html");
?>

<form method="POST" action="">
    <label>Nom:</label>
    <input type="text" name="nom" value="<?= htmlspecialchars($s['nom']) ?>" required><br>

    <label>Prénom:</label>
    <input type="text" name="prenom" value="<?= htmlspecialchars($s['prenom']) ?>" required><br>

    <label>Date de naissance:</label>
    <input type="date" name="date_naissance" value="<?= htmlspecialchars($s['date_naissance']) ?>" required><br>

    <label>Date d'embauche:</label>
    <input type="date" name="date_embauche" value="<?= htmlspecialchars($s['date_embauche']) ?>" required><br>

    <label>Salaire:</label>
    <input type="number" step="0.01" name="salaire" value="<?= htmlspecialchars($s['salaire']) ?>" required><br>

    <label>Service:</label>
    <input type="text" name="service" value="<?= htmlspecialchars($s['service']) ?>" required><br>

    <button type="submit">Modifier</button>
</form>