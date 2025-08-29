<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!in_array($_SESSION['role'], ['student', 'teacher', 'admin'])){
    header('Location: login.php');
}


function getTerms($conn){
    $stmt = "SELECT * FROM terms";
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

function getTeacherSubjects($conn,$teacher_id){
    $subs = [];
    $sql = "SELECT id , name FROM subject_teacher st INNER JOIN subjects s ON st.subject_id = id WHERE st.teacher_id = $teacher_id";
    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()) {
        $subs[]= $row;
    }
    return $subs;
}

function getTeacherClasses($conn,$teacher_id){
    $classes = [];
    $sql = "SELECT id, name FROM class_teacher ct INNER JOIN classes c ON ct.class_id = id WHERE ct.teacher_id = $teacher_id";
    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()) {
        $classes[]= $row;
    }
    return $classes;
}

function getClassStudents($conn,$class_id){
    $students = [];
    $sql = "SELECT * FROM students WHERE class_id = $class_id";
    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()){
        $students[] = $row;
    }
    return $students;
}

function addMark($conn,$student_id,$subject_id,$mark,$term_id,$date){
    $sql = "INSERT INTO marks (student_id, subject_id, mark, exam_date, term_id) VALUES ($student_id, $subject_id, $mark, '$date', $term_id)";
    $conn->query($sql);
}


?>