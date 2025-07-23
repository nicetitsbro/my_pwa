<?php
require_once 'db/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    $date = date('Y-m-d H:i:s'); 
    
    try {
        $stmt = $pdo->prepare("INSERT INTO feedback (name, email, message, date) VALUES (?, ?, ?, ?)");
        $stmt->execute([$name, $email, $message, $date]);
        
        header("Location: feedback.php?success=1");
        exit();
    } catch (PDOException $e) {
        $error = "Ошибка при сохранении отзыва: " . $e->getMessage();
    }
}
?>
CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    date DATETIME NOT NULL
);