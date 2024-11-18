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
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>ELYSIUM BOOST | HOME</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <?php
        include 'blocks/nav.php';
    ?>
    <div class="wrapper">
        <div class="inner">
            <h1 class="inner_title">Привет!</h1>
            <p class="inner_text">
                Добро пожаловать в <span class="dota">ELYSIUM BOOST!</span><br>
                Мы специализируемся на повышении<br>
                рейтинга аккаунтов в таких играх, как<br>
                <span class="inner_games">
                    <span class="dota">DOTA 2</span> и <span class="cs">CS 2</span>
                </span>
            </p>
        </div>
    </div>

    <div class="wrapper service">
        <div class="service">
            <div class="service_cards">
                <div class="service_content">
                    <h1 class="service_title">Услуги</h1>
                    <h1 class="service_text">Мы давно работаем в этой сфере и реализовали огромное количество<br> Ваших
                        желаний! Профессиональная помощь в играх!</h1>
                </div>
                <div class="card">
                    <div class="content">
                        <div class="back">
                            <div class="back-content">
                                <strong class="badge card_title">Dota 2</strong>
                                <img class="card_img" src="img/dota.jpeg">
                            </div>
                        </div>
                        <div class="front">

                            <div class="img">
                                <div class="circle">
                                </div>
                                <div class="circle" id="right">
                                </div>
                                <div class="circle" id="bottom">
                                </div>
                            </div>

                            <img class="card_img" src="img/dota2.jpg">
                            <div class="front-content">
                                <small class="badge">Dota 2</small>
                                <div class="description">
                                    <div class="title">
                                    </div>
                                    <p class="card-footer">
                                        Отмыв ЛП &nbsp;&nbsp; | &nbsp;&nbsp; Буст ММР<br>Калибровка
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="content">
                        <div class="back">
                            <div class="back-content">
                                <strong class="badge card_title">CS 2</strong>
                                <img class="card_img" src="img/cs.jpg">
                            </div>
                        </div>
                        <div class="front">

                            <div class="img">
                                <div class="circle">
                                </div>
                                <div class="circle" id="right">
                                </div>
                                <div class="circle" id="bottom">
                                </div>
                            </div>

                            <img class="card_img" src="img/cs2.jpg">
                            <div class="front-content">
                                <small class="badge">CS 2</small>
                                <div class="description">
                                    <p class="card-footer">
                                        Буст ММ &nbsp;&nbsp;&nbsp; | &nbsp; Буст Premier<br>Калибровка
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="wrapper preim">
        <div class="preim">
            <div class="preim_content">
                <h1 class="preim_title">ПРЕИМУЩЕСТВА</h1>
                <h1 class="preim_text">
                    Все наши сотрудники прошли проверку, мы не доверяем ваши
                    <br> аккаунты непроверенным людям. Мы всегда используем "Семейный
                    <br> доступ" и аналогичные безопасные функции
                </h1>
            </div>
            <div class="preim_bottom">
                <div class="preim_card">
                    <img class="preim_img" src="img/garant.png">
                    <h1 class="preim_card_text">Работаем только<br>через семейный доступ</h1>
                </div>
                <div class="preim_card">
                    <img class="preim_img" src="img/price.png">
                    <h1 class="preim_card_text">Самая низкая цена</h1>
                </div>
                <div class="preim_card">
                    <img class="preim_img" src="img/rocket.png">
                    <h1 class="preim_card_text">Быстрое выполнение</h1>
                </div>
                <div class="preim_card">
                    <img class="preim_img" src="img/best.png">
                    <h1 class="preim_card_text">У всех бустеров<br>больше 6.000 ММР</h1>
                </div>
            </div>
        </div>
    </div>

    <?php
        include 'blocks/footer.php';
    ?>

    <script src="script.js" async defer></script>
</body>

</html>