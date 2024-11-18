<?php
session_start();

// Удалим все данные сессии
$_SESSION = [];

// Удалим сессию
session_destroy();

// После выхода из системы перейдем на главную страницу
header('Location: index.php');
exit;