<?php
// Инициализируем сессию
session_start();
// Функция проверки, авторизован ли пользователь
function isLoggedIn()
{
    return isset($_SESSION['user_id']) && $_SESSION['user_id'];
}

// Обработка формы
$totalCost = 0;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $numberOfGames = intval($_POST['number_of_games']);
    $pricePerGame = 50; // цена за одну игру
    $totalCost = $numberOfGames * $pricePerGame; // общая стоимость
}
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>ELYSIUM BOOST | LOW PRIORITY</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <?php
    include 'blocks/nav.php';
    ?>
    <div class="wrapper">
        <div class="calculate">
            <form class="lp_form" method="post" action="">
                <label for="number_of_games">Введите количество игр:</label>
                <input type="number" id="number_of_games" name="number_of_games" min="1" required>
                <button class="Btn" type="submit">Pay
                    <svg class="svgIcon" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"> </path> </svg>
                </button>
            </form>
            <?php if ($totalCost > 0): ?>
                <h2>Общая стоимость: <?php echo $totalCost; ?> рублей</h2>
            <?php endif; ?>
        </div>
    </div>
    <?php
    include 'blocks/footer.php';
    ?>
    <script src="" async defer></script>
</body>

</html>