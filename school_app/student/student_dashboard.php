<?php
session_start();

if ($_SESSION['role'] !== 'student') {
    header('Location: ../login/login.php');
    exit;
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
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
        <H1>Hey Tom</H1>
        <div id="darkmode"><div id="toggel"><i class="fas fa-sun fa-lg"></i></div></div>
    </header>

    <main>
        <section class='term'>
            <h3>Please select the term : </h3>
            <select name="term" id="term">
                <option value="0" selected disabled>Please select a term</option>
                <option value="1">Term 1</option>
                <option value="2">Term 2</option>
                <option value="3">Term 3</option>
            </select>
        </section>

        <section class="subject">
                <h3>Please select a subject : </h3>
                <select name="subject" id="subject">
                    <option value="0" selected disabled>Please select a subject</option>
                    <option value="1">Subect 1</option>
                    <option value="2">Subect 2</option>
                    <option value="3">Subect 3</option>
                    <option value="4">All subjects</option>
                </select>
        </section>

        <button id="getmarks">Get Marks</button>

        <div class="card">
            <table>
                <thead>
                    <th>Subject</th>
                    <th>Mark</th>
                </thead>
                <tbody>
                    <td>Math</td>
                    <td>85%</td>
                </tbody>
            </table>
        </div>
        
    </main>

    <script src="app.js"></script>
</body>
</html>
