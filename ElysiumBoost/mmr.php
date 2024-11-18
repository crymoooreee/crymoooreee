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
    <title>ELYSIUM BOOST | MMR BOOST</title>
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
            <form class="mmr_form" method="POST" action="">
                <label for="mmr">Введите текущий MMR:</label>
                <input type="number" id="mmr" name="mmr" required>

                <label for="target_mmr">Введите целевой MMR:</label>
                <input type="number" id="target_mmr" name="target_mmr" required>

                <button class="Btn" type="submit">Pay
                    <svg class="svgIcon" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"> </path> </svg>
                </button>
            </form>

            <?php
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $current_mmr = intval($_POST['mmr']);
                $target_mmr = intval($_POST['target_mmr']);

                // Стоимость за каждые 150 MMR
                $cost_per_150_mmr = 100;
                $mmr_difference = $target_mmr - $current_mmr;

                if ($mmr_difference > 0) {
                    // Рассчитываем стоимость
                    $total_cost = ceil($mmr_difference / 150) * $cost_per_150_mmr;

                    // Проверяем, если итоговый MMR больше 3500
                    if ($target_mmr > 3500) {
                        $total_cost *= 3; // Увеличиваем стоимость в 3 раза
                    }

                    echo "<p class='mmr_result'>Стоимость буста с {$current_mmr} до {$target_mmr} MMR составляет: {$total_cost} рублей.</p>";
                } else {
                    echo "<p class='mmr_error'>Целевой MMR должен быть больше текущего MMR.</p>";
                }
            }
            ?>
        </div>
    </div>
    <?php
    include 'blocks/footer.php';
    ?>
    <script src="" async defer></script>
</body>

</html>