<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json');

if (!in_array($_SESSION['role'], ['student', 'teacher', 'admin'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

require_once 'functions.php';

$conn = new mysqli('localhost', 'root', '', 'school_app');
if ($conn->connect_error) {
    echo json_encode(['error' => 'DB connection failed']);
    exit;
}

if (!isset($_GET['term']) || !is_numeric($_GET['term'])) {
    echo json_encode(['error' => 'Invalid or missing term']);
    exit;
}


if ($_SESSION['role'] === 'student'){
    $student_id = $_SESSION['linked_id'];
}else {
    $student_id = $_GET['student_id'];
}


$term = intval($_GET['term']);
if ($_GET['sub'] == 'All'){
    $subjects = getStudentSubjects($conn, $student_id);
}else {
    $subjects = json_decode($_GET['sub'], true);
};
$marks = getAllStudentMarks($conn, $student_id,$subjects,$term);
echo json_encode($marks);
?>
