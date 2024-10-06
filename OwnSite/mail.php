<?php
$to = "info@cry-more.online"; // email of the recipient of the form data
$tema = "Форма обратной связи"; // subject of the received email

// Check if all fields are filled in the $_POST
if (isset($_POST['email']) && isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['message'])) {
    $message = "Email address: ".$_POST['email']."<br>";
    $message .= "Your Name: ".$_POST['name']."<br>";
    $message .= "Phone Number: ".$_POST['phone']."<br>";
    $message .= "Message: ".$_POST['message']."<br>";

    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

    // Send the email
    if (mail($to, $tema, $message, $headers)) {
        echo '<script>alert("Письмо отправлено успешно!")</script>';
    } else { 
        echo '<script>alert("Ошибка отправки письма!")</script>'; 
    } 
    } 
    else { 
        echo '<script>alert("Не все поля заполнены!")</script>'; 
    } 
    
?>