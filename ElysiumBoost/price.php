<?php
// Инициализируем сессию
session_start();
// Функция проверки, авторизован ли пользователь
function isLoggedIn()
{
    return isset($_SESSION['user_id']) && $_SESSION['user_id'];
}
?>

<!DOCTYPE html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>ELYSIUM BOOST | PRICE</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css">
</head>

    <?php
        include 'blocks/nav.php';
    ?>
    
    <div class="wrapper price_container">
            <h1 class="price_maintitle">Dota 2</h1>
            <div class="container_price">
                <a class="price_item" href="mmr.php">
                    <div class="price_btn">
                        <h1 class="price_title">Буст MMR</h1>
                        <h1 class="price_subtitle">Подробнее</h1>
                    </div>
                </a>
                <a class="price_item" href="calibrovkadota.php">
                    <div class="price_btn">
                        <h1 class="price_title">Калибровка</h1>
                        <h1 class="price_subtitle">Подробнее</h1>
                    </div>
                </a>
                <a class="price_item" href="lp.php">
                    <div class="price_btn">
                        <h1 class="price_title">Отмыв ЛП</h1>
                        <h1 class="price_subtitle">Подробнее</h1>
                    </div>
                </a>
            </div>
        </div>
        <div class="wrapper">
            <h1 class="price_maintitle">CS 2</h1>
            <div class="container_price">
                <a class="price_item" href="premier.php">
                    <div class="price_btn">
                        <h1 class="price_title">Буст премьер</h1>
                        <h1 class="price_subtitle">Подробнее</h1>
                    </div>
                </a>
                <a class="price_item" href="calibrovkacs.php">
                    <div class="price_btn">
                        <h1 class="price_title">Калибровка</h1>
                        <h1 class="price_subtitle">Подробнее</h1>
                    </div>
                </a>
                <a class="price_item" href="rank.php">
                    <div class="price_btn">
                        <h1 class="price_title">Буст званий</h1>
                        <h1 class="price_subtitle">Подробнее</h1>
                    </div>
                </a>
            </div>
        </div>
        <?php
            include 'blocks/footer.php';
        ?>
    <script src="script.js" async defer></script>
</body>

</html>