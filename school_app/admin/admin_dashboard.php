<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if ($_SESSION['role'] !== 'admin') {
    header('Location: login.php');
    exit;
}

$linked_id = $_SESSION['linked_id'];

$conn = new mysqli('localhost', 'root', '', 'school_app');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("SELECT fname FROM admins WHERE id = ?");
$stmt->bind_param("i", $linked_id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    $fname = $row['fname'];
} else {
    $fname = "Unknown";
}

$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
</head>
<body>
    <header>
        <a id="logout" href="../login/logout.php">Logout</a>
        <H1><?php echo 'Hey '.$fname;?></H1>
        <div id="darkmode"><div id="toggel"><i class="fas fa-sun fa-lg"></i></div></div>
    </header>
    <main></main>
    <script src="app.js"></script>
</body>
</html>