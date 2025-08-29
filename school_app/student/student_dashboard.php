<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}


if ($_SESSION['role'] !== 'student') {
    header('Location: ../login/login.php');
    exit;
}
$linked_id = $_SESSION['linked_id'];
$conn = new mysqli('localhost', 'root', '', 'school_app');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT fname FROM students WHERE id = '$linked_id'";
$result = $conn->query($sql);
$user = $result->fetch_assoc();
$fname = $user['fname'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Dashboard</title>
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

    <nav>
        <div id="notifaction" class="selected"><i class="fas fa-bell fa-xl"></i>Notifactions</div>
        <div id="attendance"><i class="fas fa-calendar-check fa-xl"></i>Attendance</div>
        <div id="events"><i class="fas fa-calendar-plus fa-xl"></i>Events</div>
        <div id="time_table"><i class="fas fa-calendar-alt fa-xl"></i>Time Table</div>
        <div id="marks"><i class="fas fa-clipboard-check fa-xl"></i>Marks</div>
        <div id="report_card"><i class="fas fa-sticky-note fa-xl"></i>Report Card</div>
    </nav>

    <main class="hidden" id="marks_section">
        <section class='term'>
            <h3>Please select the term : </h3>
            <select name="term" id="term">
                <option value="0" selected disabled>Please select a term</option>
            </select>
        </section>

        <section class="subject">
                <h3>Please select a subject : </h3>
                <select name="subject" id="subject">
                    <option value="0" selected disabled>Please select a subject</option>
                </select>
        </section>

        <section class="buttons">
            <button id="getmarks">Get Marks</button>
            <button id="delmarks">Clear Marks</button>
        </section>


    </main>

    <main id="notifactions_section">
        <table>
            <thead>
                <th>Title</th>
                <th>Notifaction</th>
                <th>Notifaction Date</th>
            </thead>
            <tbody>

            </tbody>
        </table>
    </main>
    <script src="app.js"></script>
</body>
</html>
