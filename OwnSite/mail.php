<?php
$to = "info@crymoooreee.ru"; // email получателя
$tema = "Форма обратной связи"; // тема письма

// Данные для Telegram
$telegramBotToken = '7337837381:AAEgye_rHiLXWYoUBb2TiBR4MoNmvrjhSkE'; // Замените на ваш токен бота
$chatId = '1106138831'; // Замените на ваш ID чата

// Функция отправки сообщения в Telegram
function sendTelegramMessage($chatId, $message, $token) {
    $url = "https://api.telegram.org/bot{$token}/sendMessage";
    $data = [
        'chat_id' => $chatId,
        'text' => $message,
        'parse_mode' => 'HTML'
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $result = curl_exec($ch);
    curl_close($ch);
    
    return $result;
}

// Проверка заполнения всех полей
if (isset($_POST['email']) && isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['message'])) {
    // Формируем сообщение для email
    $message = "Email address: ".$_POST['email']. "<br>";
    $message .= "Your Name: ".$_POST['name']. "<br>";
    $message .= "Phone Number: ".$_POST['phone']. "<br>";
    $message .= "Message: ".$_POST['message']. "<br>";

    // Формируем сообщение для Telegram
    $telegramMessage = "📨 Новое сообщение с сайта!\n\n";
    $telegramMessage .= "📧 Email: ".$_POST['email']."\n";
    $telegramMessage .= "👤 Имя: ".$_POST['name']."\n";
    $telegramMessage .= "📱 Телефон: ".$_POST['phone']."\n";
    $telegramMessage .= "💬 Сообщение: ".$_POST['message']."\n";

    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

    // Отправляем email
    if (mail($to, $tema, $message, $headers)) {
        // Если email отправлен успешно, отправляем сообщение в Telegram
        sendTelegramMessage($chatId, $telegramMessage, $telegramBotToken);
        echo '<script>alert("Сообщение успешно отправлено!")</script>';
    } else {
        echo '<script>alert("Ошибка отправки сообщения!")</script>';
    }
    
    // Перенаправляем обратно на главную страницу
    echo '<script>window.location.href = "/";</script>';
}
?>