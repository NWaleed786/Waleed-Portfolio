<?php
require_once("connexion.php");

if($_SERVER["REQUEST_METHOD"] == "POST") {

    $stmt = $conn->prepare("INSERT INTO salaries(nom,prenom,date_naissance,date_embauche,salaire,service)
                            VALUES(?,?,?,?,?,?)");

    $stmt->execute([
        $_POST['nom'],
        $_POST['prenom'],
        $_POST['date_naissance'],
        $_POST['date_embauche'],
        $_POST['salaire'],
        $_POST['service']
    ]);

    header("Location: listeSalaries.php");
    exit();
}

require_once("header.html");
?>

<div class="container my-5">
<h2>Ajouter salarié</h2>

<form method="post">
    <input type="text" name="nom" class="form-control mb-2" required>
    <input type="text" name="prenom" class="form-control mb-2" required>
    <input type="date" name="date_naissance" class="form-control mb-2" required>
    <input type="date" name="date_embauche" class="form-control mb-2" required>
    <input type="number" name="salaire" class="form-control mb-2" required>
    <input type="text" name="service" class="form-control mb-2" required>
    <button class="btn btn-success">Enregistrer</button>
</form>
</div>

<?php require_once("footer.html"); ?>