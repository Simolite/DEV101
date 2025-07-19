<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if($_SESSION['role'] !== 'teacher') {
    header('Location: login.php');
}  
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teacher Dashboard</title>
</head>
<body>
    <h1>Welcome to the Teacher Dashboard</h1>
</body>
</html>