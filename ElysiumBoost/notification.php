<?php
function notify(?string $message = null)
{
    // Если передаем сообщение, то устанавливаем его в сессию
    if ($message) {
        $_SESSION['notification'] = $message;
    } else {
        // При вызове функции без параметра отобразим сообщение на странице, если в сессии есть это сообщение
        if (!empty($_SESSION['notification'])) { ?>
            <div class="alert alert-danger mt-3">
                <?php echo $_SESSION['notification']; ?>
            </div>
        <?php }
        // Затем просто удалим нотификацию из сессии
        unset($_SESSION['notification']);
    }
}