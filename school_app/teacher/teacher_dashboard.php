<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
};

if($_SESSION['role'] !== 'teacher') {
    header('Location: login.php');
};
$linked_id = $_SESSION['linked_id'];
$conn = new mysqli('localhost', 'root', '', 'school_app');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT fname FROM teachers WHERE id = '$linked_id'";
$result = $conn->query($sql);
$user = $result->fetch_assoc();
$fname = $user['fname'];
$sql = "SELECT url FROM time_table WHERE teacher_id = '$linked_id'";
$result = $conn->query($sql);
$time_table = $result->fetch_assoc();
$url = $time_table['url'];



?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teacher Dashboard</title>
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
        <div id="marks"><i class="fas fa-clipboard-check fa-xl"></i>Marks</div>
        <div id="time"><i class="fas fa-calendar-alt fa-xl"></i>Time Table</div>
    </nav>
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
    <main id="marks_section" class="hidden">
        <section id="Markinput">
            <select name="Markclass" id="Markclass">
                <option value="0" selected disabled>Please select a class</option>
            </select>
            <select name="Marksubject" id="Marksubject">
                <option value="0" selected disabled>Please select a subject</option>
            </select>
            <select name="student" id="student">
                <option value="0" selected disabled>Please select a student</option>
            </select>
            <select name="term" id="term">
                <option value="0" selected disabled>Please select a term</option>
            </select>
        </section>
        <section>
            <input id="mark" type="number">
            <input id="Markdate" type="date">
            <button id="Marksubmit">Submit</button>
        </section>
    </main>
    <main id="attendance_section" class="hidden">
        <section id="Attinput">
            <select name="Attclass" id="Attclass">
                <option value="0" selected disabled>Please select a class</option>
            </select>
            <select name="Attsub" id="Attsub">
                <option value="0" selected disabled>Please select a subject</option>
            </select>
            <button id="getAttList">Get Attendance List</button>

        </section>
        <section>
            <table>
                <thead>
                    <th>Student Name</th>
                    <th>Absent</th>
                </thead>
            </table>
        </section>
        <section>
            <input id="Attdate" type="date">
            <button id="submitAtt">Submit</button>
        </section>
    </main>
    <main id="time_section" class="hidden">
        <img src="<?php echo $url;?>" alt="TimeTable">
    </main>
    <script src="app.js"></script>
</body>
</html>