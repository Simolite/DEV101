<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if ($_SESSION['role'] !== 'teacher') {
    header('Location: login.php');
    exit;
}

$linked_id = $_SESSION['linked_id'];
$conn = new mysqli('localhost', 'root', '', 'school_app');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM teachers WHERE id = '$linked_id'";
$result = $conn->query($sql);
$user = $result->fetch_assoc();
$fname = $user['fname'];
$lname = $user['lname'];
$email = $user['email'];
$sql = "SELECT * FROM classes  JOIN class_teacher  ON classes.id = class_teacher.class_id JOIN teachers ON teachers.id = class_teacher.teacher_id WHERE teachers.id = $linked_id;";
$result = $conn->query($sql);
$classes = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $classes[] = $row;
    }
}
$teacherStudents = [];
foreach ($classes as $Tclass) {
    $Tid = $Tclass['id'];
    $sql = "SELECT * FROM students WHERE class_id = $Tid;";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $teacherStudents[] = $row;
        }
    }
}

$sql = "SELECT url FROM time_table WHERE teacher_id = '$linked_id'";
$result = $conn->query($sql);
$time_table = $result->fetch_assoc();
$url = $time_table['url'];

$sql = "SELECT * FROM subjects JOIN subject_teacher ON subjects.id = subject_teacher.subject_id WHERE subject_teacher.teacher_id = $linked_id;";
$result = $conn->query($sql);
$subjects = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $subjects[] = $row;
    }
};
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لوحة الأستاذ - <?php echo $fname.' '.$lname; ?></title>
    <link rel="stylesheet" href="style.css">
    <script src="tailwindcss.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap');
        body { font-family: 'Cairo', sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .card-shadow { box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
        .selected { background: linear-gradient(45deg, #667eea, #764ba2); color: white; border-radius: 0.5rem 0.5rem 0 0; }
    </style>
</head>
<body class="bg-gray-50">

    <!-- Header -->
    <header class="gradient-bg text-white py-6 shadow-lg">
        <div class="container mx-auto px-4 flex items-center justify-between">
            <div class="flex items-center space-x-4 space-x-reverse">
                <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <span class="text-2xl">👨‍🏫</span>
                </div>
                <div>
                    <h1 class="text-2xl font-bold">مدرسة الهجرة</h1>
                    <p class="text-blue-100">لوحة الأستاذ</p>
                </div>
            </div>
            <a href="../login/logout.php" class="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all">
                تسجيل الخروج
            </a>
        </div>
    </header>

    <div class="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- Sidebar: Teacher Info -->
        <div class="lg:col-span-1">
            <div class="bg-white rounded-xl card-shadow p-6 text-center">
                <div class="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-600 flex items-center justify-center text-4xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <span><?php echo $fname[0].'.'.$lname[0] ?></span>
                </div>
                <h2 class="text-2xl font-bold text-gray-800"><?php echo $fname.' '.$lname ?></h2>
                <p class="text-blue-600 font-semibold">أستاذ(ة)  <?php
                foreach ($subjects as $sub){
                    echo $sub['name'].' ';
                };
                ?></p>
                <div class="space-y-2 mt-6 text-right text-sm divide-y divide-gray-100">
                    <div class="flex justify-between"><span>البريد :</span><span><?php echo $email?></span></div>
                    <div class="flex justify-between"><span>عدد الأقسام :</span><span><?php echo count($classes);?></span></div>
                    <div class="flex justify-between"><span>عدد التلاميذ :</span><span><?php echo count($teacherStudents);?></span></div>
                    <div class="flex justify-between"><span>عدد المواد :</span><span><?php echo count($subjects);?></span></div>

                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">

            <!-- Navigation Tabs -->
            <div class="bg-white rounded-xl card-shadow">
                <div class="flex border-b border-gray-200">
                    <button id="notifaction" class="selected px-6 py-4 font-semibold">الإشعارات</button>
                    <button id="attendance" class="px-6 py-4 font-semibold text-gray-600 hover:text-blue-600">الحضور</button>
                    <button id="marks" class="px-6 py-4 font-semibold text-gray-600 hover:text-blue-600">الدرجات</button>
                    <button id="time" class="px-6 py-4 font-semibold text-gray-600 hover:text-blue-600">الجدول</button>
                </div>
            </div>

            <!-- Notifications -->
            <main id="notifactions_section" class="bg-white rounded-xl card-shadow p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-6">الإشعارات</h3>
                <table class="w-full border">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">العنوان</th><th class="p-2">الإشعار</th><th class="p-2">التاريخ</th></tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </main>

            <!-- Marks -->
            <main id="marks_section" class="bg-white rounded-xl card-shadow p-6 hidden">
                <h3 class="text-xl font-bold text-gray-800 mb-6">إدخال الدرجات</h3>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <select id="Markclass" class="border p-2 rounded">
                        <option value="0" selected disabled>اختر القسم</option>
                    </select>
                    <select id="Marksubject" class="border p-2 rounded">
                        <option value="0" selected disabled>اختر المادة</option>
                    </select>
                    <select id="student" class="border p-2 rounded">
                        <option value="0" selected disabled>اختر الطالب</option>
                    </select>
                    <select id="term" class="border p-2 rounded">
                        <option value="0" selected disabled>اختر الدورة</option>
                    </select>
                </div>
                <div class="flex items-center space-x-4 space-x-reverse">
                    <input id="mark" type="number" class="border p-2 rounded" placeholder="الدرجة">
                    <input id="Markdate" type="date" class="border p-2 rounded">
                    <button id="Marksubmit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">حفظ</button>
                </div>
            </main>

            <!-- Attendance -->
            <main id="attendance_section" class="bg-white rounded-xl card-shadow p-6 hidden">
                <h3 class="text-xl font-bold text-gray-800 mb-6">الحضور</h3>
                <div class="flex space-x-4 space-x-reverse mb-4">
                    <select id="Attclass" class="border p-2 rounded">
                        <option value="0" selected disabled>اختر القسم</option>
                    </select>
                    <select id="Attsub" class="border p-2 rounded">
                        <option value="0" selected disabled>اختر المادة</option>
                    </select>
                    <button id="getAttList" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">عرض اللائحة</button>
                </div>
                <table class="w-full border mb-4">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">اسم الطالب</th><th class="p-2">غياب</th></tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <div class="flex items-center space-x-4 space-x-reverse">
                    <input id="Attdate" type="date" class="border p-2 rounded">
                    <button id="submitAtt" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">حفظ</button>
                </div>
            </main>

            <!-- Timetable -->
            <main id="time_section" class="bg-white rounded-xl card-shadow p-6 hidden">
                <h3 class="text-xl font-bold text-gray-800 mb-6">الجدول الزمني</h3>
                <div class="overflow-hidden rounded-lg border border-gray-200 shadow">
                    <img id="time_table_img" src="<?php echo $url; ?>" alt="TimeTable" class="w-full h-auto">
                </div>
            </main>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>
