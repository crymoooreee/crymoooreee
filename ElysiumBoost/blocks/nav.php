<?php
// Подключение к базе данных
$servername = "localhost"; // Имя сервера
$username = "u2892949_default"; // Имя пользователя
$password = "SNhU09T1MOwqcux0"; // Пароль
$dbname = "u2892949_default"; // Имя базы данных

// Создаем соединение
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверяем соединение
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// Функция для получения количества денег пользователя
function getUserMoney($userId) {
    global $conn; // Используем глобальное соединение с БД
    $stmt = $conn->prepare("SELECT money FROM users WHERE id = ?"); // Подготовленный запрос

    if ($stmt === false) {
        die("Ошибка подготовки запроса: " . $conn->error);
    }

    $stmt->bind_param("i", $userId); // Привязываем параметр
    $stmt->execute(); // Выполняем запрос
    $stmt->bind_result($money); // Привязываем результат к переменной
    $stmt->fetch(); // Получаем данные
    $stmt->close(); // Закрываем подготовленный запрос

    return $money; // Возвращаем количество денег
}

?>
<nav>
    <div class="left_content">
        <a href="index.php" class="nav_btn logo"><span>Elysium</span> Boost</a>
    </div>
    <?php if (isLoggedIn()) { 
        $userId = $_SESSION['user_id']; // Предполагается, что ID пользователя хранится в сессии
        $money = getUserMoney($userId);
    ?>
        <div class="right_content">
            <a href="index.php" class="nav_btn">Главная</a>
            <a href="price.php" class="nav_btn">Цены</a>
            |
            <a href="logout.php" class="nav_btn">Выйти</a>
            <a href="payments.php" class="nav_btn"><?= $money ?>₽</a>
        </div>
    <?php } else { ?>
        <div class="right_content">
            <a href="index.php" class="nav_btn">Главная</a>
            <a href="price.php" class="nav_btn">Цены</a>
            |
            <a href="registration.php" class="nav_btn">Регистрация</a>
            <a href="login.php" class="nav_btn">Авторизация</a>
        </div>
    <?php } ?>
</nav>

<?php
// Закрываем соединение
$conn->close();
?>