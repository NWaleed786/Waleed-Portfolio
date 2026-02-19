<?php
// Works only on a PHP host (not GitHub Pages).
header('Content-Type: application/json; charset=utf-8');

function clean($v) {
  $v = trim($v ?? '');
  $v = str_replace(["\r","\n"], ' ', $v);
  return $v;
}

$name = clean($_POST['name'] ?? '');
$email = clean($_POST['email'] ?? '');
$subject = clean($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $subject === '' || $message === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Champs manquants.']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Email invalide.']);
  exit;
}

$to = 'NasrullaWaleed786@gmail.com';
$body = "Nom: $name\nEmail: $email\nSujet: $subject\n\n$message\n";
$headers = "From: $name <$email>\r\nReply-To: $email\r\n";

$sent = @mail($to, "[Portfolio] $subject", $body, $headers);

if ($sent) {
  echo json_encode(['ok' => true]);
} else {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Envoi impossible (mail()).']);
}
?>