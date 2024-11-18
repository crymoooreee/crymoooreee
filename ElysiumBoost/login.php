<?php
$config = require_once 'config.php';
require_once 'notification.php';
session_start();

function isLoggedIn()
{
    return isset($_SESSION['user_id']) && $_SESSION['user_id'];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $errors = [];

    $email = isset($_POST['email']) ? trim($_POST['email']) : null;
    if (empty($email)) {
        $errors[] = 'Введите email';
    }

    $password = isset($_POST['password']) ? trim($_POST['password']) : null;
    if (empty($password)) {
        $errors[] = 'Введите пароль';
    }

    if (empty($errors)) {
        try {
            $connection = new mysqli($config['dbHost'], $config['dbUsername'], $config['dbPassword'], $config['dbName']);
            // Пробуем извлечь пользователя из базы с предоставленным email
            $sql = "SELECT id, email, password FROM users WHERE email = ?";
            $result = $connection->execute_query($sql, [$email]);

            // Если пользователь найден, сверяем пароли
            if ($user = $result->fetch_assoc()) {
                // Если пароли совпадают, сохраняем данные пользователя в сессию и редиректим на главную страницу
                if (password_verify($password, $user['password'])) {
                    $_SESSION['user_id'] = $user['id'];
                    $_SESSION['email'] = $user['email'];

                    header('location: /');
                    exit;
                }
                // В случае несовпадения паролей выводим сообщение, что нет пользователя с такой комбинацией
                // Не стоит выводить сообщение о том, что только пароль неверный - это усиливает уязвимость сайта к взлому
                notify('Пользователь с такой комбинацией email и пароля не существует');
            } else {
                // Такое же сообщение выведем, если email неверный
                notify('Пользователь с такой комбинацией email и пароля не существует');
            }
        } catch (mysqli_sql_exception $e) {
            notify('Произошла ошибка при авторизации');
            error_log($e->__toString());
        } finally {
            if (isset($connection)) {
                $connection->close();
            }
        }
    } else {
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
    <title>ELYSIUM BOOST | LOGIN</title>
</head>

<body>
    <?php
        include 'blocks/nav.php';
    ?>
    <div class="container_main">
        <section class="container">
            <h2 class="title">Авторизация</h2>
            <form method="post">
                <div class="form_group">
                    <label for="email">Email</label>
                    <input type="email" name="email" class="form_control" id="email" placeholder="Enter email">
                </div>
                <div class="form_group">
                    <label for="password">Пароль</label>
                    <input type="password" name="password" class="form_control" id="password" placeholder="Password">
                </div>
                <button type="submit" class="btn btn_primary">Войти</button>
                <h1 class="title bottom">Еще нет аккаунта? <a href="registration.php"
                        class="btn bottom">Зарегестрироватся</a> </h1>
            </form>

            <?php notify(); ?>
        </section>
    </div>

</body>

</html>