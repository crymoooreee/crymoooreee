<?php
$to = "info@cry-more.online"; // емайл получателя данных из формы 
$tema = "Форма обратной связи"; // тема полученного емайла 

// Проверка наличия данных в $_POST
if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['message'])) {
    $message = "Имя отправителя: ".$_POST['name']."<br>";
    $message .= "Почта: ".$_POST['email']."<br>";
    $message .= "Номер телефона: ".$_POST['phone']."<br>";
    $message .= "Сообщение: ".$_POST['message']."<br>";

    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

    // Отправка письма
    if (mail($to, $tema, $message, $headers)) {
        echo '<script>alert("Письмо отправлено успешно!")</script>';
    } else {
        echo '<script>alert("Ошибка отправки письма!")</script>';

    }
} else {
    echo '<script>alert("Не все поля заполнены!")</script>';
}
?>