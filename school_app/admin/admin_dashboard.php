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
    <nav>
        <div id="notifaction" class="selected"><i class="fas fa-bell fa-xl"></i>Notifactions</div>
        <div id="account"><i class="fas fa-user-circle fa-xl"></i>Accounts</div>
        <div id="announcement"><i class="fas fa-bullhorn fa-xl"></i>Announcements</div>
        <div id="attendance"><i class="fas fa-calendar-check fa-xl"></i>Attendances</div>
        <div id="class"><i class="fas fa-school fa-xl"></i>Classes</div>
        <div id="mark"><i class="fas fa-clipboard-check fa-xl"></i>Marks</div>
        <div id="student"><i class="fas fa-user-graduate fa-xl"></i>Students</div>
        <div id="teacher"><i class="fas fa-chalkboard-teacher fa-xl"></i>Teachers</div>
        <div id="term"><i class="fas fa-sticky-note fa-xl"></i>Terms</div>
    </nav>
    <main id="notifaction_section" class="hidden">
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
    <main id="account_section">
        <section>
            <select name="accRole" id="accRole">
                <option value="0" selected disabled>Please select a role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
            </select>
            <select name="account" id="account">
                <option value="0" selected disabled>Please select an account</option>
            </select>
            <button>Get Account</button>
        </section>
        <section>
            <input id="userName" type="text" disabled>
            <input id="password" type="text">
        </section>
        <section>
            <button id="applyBtn">Apply changes</button>
            <button id="cancelBtn">Cancel</button>
        </section>
    </main>
    <main id="announcement_section" class="hidden">

    </main>
    <main id="attendance_section" class="hidden">

    </main>
    <main id="class_section" class="hidden">

    </main>
    <main id="mark_section" class="hidden">

    </main>
    <main id="student_section" class="hidden">

    </main>
    <main id="teacher_section" class="hidden">

    </main>
    <main id="term_section" class="hidden">

    </main>
    <script src="app.js"></script>
</body>
</html>