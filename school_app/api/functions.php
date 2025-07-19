<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!in_array($_SESSION['role'], ['student', 'teacher', 'admin'])){
    header('Location: login.php');
}


function getTerms($conn){
    $stmt = "SELECT * FROM `terms`";
    $result = $conn->query($stmt);
    $terms = [];
    while ($row = $result->fetch_assoc()) {
        $terms[] = $row;
    }
    return $terms;   
}

function getStudentSubjects($conn, $student_id){
    $stmt = "SELECT id, name FROM subjects WHERE id IN (SELECT subject_id FROM class_subject WHERE class_id = (SELECT class_id FROM students WHERE id = $student_id))";
    $result = $conn->query($stmt);
    $subjects = [];
    while ($row = $result->fetch_assoc()) {
        $subjects[] = $row;
    }
    return $subjects;
}

function getStudentMarks($conn, $student_id,$subjects,$term){
    $marks = [];
    foreach($subjects as $subject){
        $subject_id = $subject['id'];
        $sql = "SELECT * FROM marks WHERE student_id = $student_id AND subject_id = $subject_id AND `term_id` = $term ";
        $result = $conn->query($sql);
        while ($row = $result->fetch_assoc()) {
            $marks[$subject['name']][] = $row;
        }
    }
    return $marks;
}

?>