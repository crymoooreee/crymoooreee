<?php
// Сохраняем данные конфигурации в переменную
$config = require_once 'config.php';
// Подключаем нотификации
require_once 'notification.php';
// Инициализируем сессию
session_start();

function isLoggedIn()
{
    return isset($_SESSION['user_id']) && $_SESSION['user_id'];
}
// Если это POST-запрос, то есть мы нажали на кнопку "Регистрация", выполняем процесс регистрации
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // В этот массив будем собирать возможные ошибки
    $errors = [];

    // Валидируем email
    $email = isset($_POST['email']) ? trim($_POST['email']) : null;
    if (empty($email)) {
        $errors[] = 'Введите email';
    }
    if (!filter_var($email, FILTER_SANITIZE_EMAIL)) {
        $errors[] = 'Неверный email';
    }

    // Валидируем пароль
    $password = isset($_POST['password']) ? trim($_POST['password']) : null;
    if (empty($password)) {
        $errors[] = 'Введите пароль';
    }
    if (strlen(trim($password)) < 6 || strlen(trim($password)) > 50) {
        $errors[] = 'Пароль должен содержать не менее 6 и не более 50 символов';
    }

    // Проверяем, правильно ли пользователь подтвердил пароль
    $passwordRepeat = isset($_POST['password_repeat']) ? trim($_POST['password_repeat']) : null;
    if ($password !== $passwordRepeat) {
        $errors[] = 'Пароль подвержден неверно';
    }

    // Если ошибок нет, продолжаем
    if (empty($errors)) {
        try {
            // Подключаемся к базе данных
            $connection = new mysqli($config['dbHost'], $config['dbUsername'], $config['dbPassword'], $config['dbName']);

            // Делаем запрос в базу, проверяя, существует ли уже зарегистрированный пользователь с таким email
            $sql = "SELECT id FROM users WHERE email = ?";
            $result = $connection->execute_query($sql, [$email]);
            // Если такой пользователь есть, выводим сообщение
            if ($result->fetch_assoc()) {
                notify('Пользователь с таким email уже существует');
            } else { // Иначе создаем запись в базе данных с новым пользователем
                $sql = "INSERT INTO users (email, password) VALUES (?, ?)";
                $passwordHash = password_hash($password, PASSWORD_DEFAULT);
                $connection->execute_query($sql, [$email, $passwordHash]);

                // После создания нового пользователя редиректим на страницу авторизации
                header('location: login.php');
                exit;
            }
        } catch (mysqli_sql_exception $e) {
            // Если произошла какая-либо ошибка при регистрации, выводим ее
            notify('Произошла ошибка при регистрации');
            // Можно сделать запись в лог об ошибке
            error_log($e->__toString());
        } finally { // При любом исходе процесса регистрации закрываем подключение к базе данных
            if (isset($connection)) {
                $connection->close();
            }
        }
    } else { // В случае наличия ошибок выводим их на страницу
        notify(implode('<br>', $errors));
    }
}
?>

<!doctype html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/RegAndLog.css">
    <title>ELYSIUM BOOST | REGISTRATION</title>
</head>

<body>
    <?php
        include 'blocks/nav.php';
    ?>
    <div class="container_main">
        <section class="container">
            <h2 class="title">Регистрация</h2>
            <form method="post">
                <div class="form_group">
                    <label for="email">Email</label>
                    <input type="email" name="email" class="form_control" id="email" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="password">Пароль</label>
                    <input type="password" name="password" class="form_control" id="password" placeholder="Password">
                </div>
                <div class="form-group">
                    <label for="password-repeat">Повторите пароль</label>
                    <input type="password" name="password_repeat" class="form_control" id="password-repeat"
                        placeholder="Repeat password">
                </div>
                <button type="submit" class="btn btn_primary">Регистрация</button>
                <h1 class="title bottom">Уже есть аккаунт? <a href="login.php" class="btn bottom">Войти</a> </h1>
            </form>

            <?php notify(); ?>
        </section>
    </div>
</body>

</html>