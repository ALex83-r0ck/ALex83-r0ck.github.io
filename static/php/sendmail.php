<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    $to = "rothe_alexander@t-online.de";
    $subject = "Neue Nachricht von $name";
    $body = "Name: $name\n";
    $body .= "E-Mail: $email\n";
    $body .= "Nachricht: $message\n";
    
    if (mail($to, $subject, $body)) {
        echo "Nachricht erfolgreich gesendet!";
    } else {
        echo "Fehler beim Senden der Nachricht.";
    }
}
?>