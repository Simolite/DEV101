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

function getAnnouncements($conn,$audience,$class_id=0){
    $announcements = [];
    if($class_id==0){
        $sql = "SELECT * FROM announcements WHERE audience = '$audience'";
    }else{
        $sql = "SELECT * FROM announcements WHERE audience = '$audience' OR class_id = $class_id";
    }
    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()){
        $announcements[] = $row;
    } 
    return $announcements;
}

function getUserInfo($conn,$id){
    $student = [];
    $sql = "SELECT * FROM students WHERE id = '$id'";
    $result = $conn->query($sql);
    $student = $result->fetch_assoc();
    return $student;
}

function addAtt($conn,$student_id,$subject_id,$stat,$date){
    $sql = "INSERT INTO attendance (student_id, subject_id, status, date) VALUES ($student_id, $subject_id, '$stat', '$date')";
    $conn->query($sql);
}

function getAttendanceInfo($conn,$student_id){
    $att = [];
    $sql = "SELECT s.name AS subject_name, a.date AS date FROM attendance a JOIN subjects s ON a.subject_id = s.id WHERE a.student_id = $student_id AND a.status = 'absent' ORDER BY a.date DESC;";
    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()){
        $att[] = $row;
    } 
    return $att;

}

function getReports($conn,$student_id){
    $reports = [];
    $sql = "SELECT t.name AS term_name,t.start_date,t.end_date,r.average_score,r.rank,r.comments,r.url FROM report_cards r JOIN terms t ON r.term_id = t.id WHERE r.student_id = $student_id;";
    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()){
        $reports[] = $row;
    } 
    return $reports;
}

function getAccount($conn, $role, $user_id) {
    if ($user_id == 0) {
        $accounts = [];
        $sql = "SELECT * FROM users WHERE role = '$role'";
        $result = $conn->query($sql);
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $accounts[] = $row;
            }
        }
        return $accounts;
    } else {
        $sql = "SELECT * FROM users WHERE role = '$role' AND linked_id = $user_id";
        $result = $conn->query($sql);
        $accounts = [];
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $accounts[] = $row;
            }
        }
        return $accounts;
    }
}

function getStudentTeachers($conn, $student_id){
    $sql = "
        SELECT DISTINCT t.id, t.fname, t.lname
        FROM teachers t
        JOIN subjects s ON t.id = s.teacher_id
        JOIN student_subject ss ON s.id = ss.subject_id
        WHERE ss.student_id = $student_id
    ";

    $teachers = [];
    $result = $conn->query($sql);

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $teachers[] = $row;
        }
    }

    return $teachers;
}



?>