<?php

require_once 'db/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    $date = date('Y-m-d H:i:s');

    $stmt = $pdo->prepare("INSERT INTO feedback (name, email, message, date) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $message, $date]);
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Обратная связь</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <div class="logo-container">
            <h1>Finance up</h1>
        </div>
        <nav>
            <a href="index.html">Главная</a>
            <a href="revenue.html">Доходы</a>
            <a href="expenses.html">Расходы</a>
            <a href="feedback.php">Обратная связь</a>
			<a href="tips.html">Советы</a>
        </nav>
    </header>

    <div class="container">
        <div class="feedback-form">
            <h2>Оставьте отзыв</h2>
            <form method="POST">
                <input type="text" name="name" placeholder="Ваше имя" required>
                <input type="email" name="email" placeholder="Ваш email" required>
                <textarea name="message" placeholder="Ваше сообщение" required></textarea>
                <button type="submit">Отправить</button>
            </form>
        </div>

        <div class="feedback-list">
            <h2>Последние отзывы</h2>
            <?php
            $stmt = $pdo->query("SELECT * FROM feedback ORDER BY date DESC LIMIT 10");
            while ($row = $stmt->fetch()):
            ?>
            <div class="feedback-item">
                <h3><?= htmlspecialchars($row['name']) ?></h3>
                <p class="date"><?= date('d.m.Y H:i', strtotime($row['date'])) ?></p>
                <p><?= nl2br(htmlspecialchars($row['message'])) ?></p>
            </div>
            <?php endwhile; ?>
        </div>
    </div>

    <footer>
        <p>© 2025 Финансовый учёт | Контакты: 8-932-254-65-06</p>
    </footer>
</body>
</html>