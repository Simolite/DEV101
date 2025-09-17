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

$sql = "SELECT * FROM students WHERE id = '$linked_id'";
$result = $conn->query($sql);
$user = $result->fetch_assoc();

$fname = $user['fname'];

$sql = "SELECT url FROM time_table WHERE teacher_id = '$linked_id'";
$result = $conn->query($sql);
$time_table = $result->fetch_assoc();
$url = $time_table['url'];

$parent_id = $user['parent_id'];
$sql = "SELECT * FROM parents WHERE id = '$parent_id'";
$result = $conn->query($sql);
$parent = $result->fetch_assoc();

$sex = $user['sex'];
$user_id = $user['id'];

$sql = "SELECT * FROM classes WHERE id = '$user_id'";
$result = $conn->query($sql);
$class = $result->fetch_assoc();
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $user['lname'] ?> - مدرسة الهجرة</title>
    <script src="https://cdn.tailwindcss.com"></script>
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
                    <span class="text-2xl">🎓</span>
                </div>
                <div>
                    <h1 class="text-2xl font-bold">مدرسة الهجرة</h1>
                    <p class="text-blue-100">لوحة الطالب</p>
                </div>
            </div>
            <button onclick="logout()" class="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all">
                تسجيل الخروج
            </button>
        </div>
    </header>

    <div class="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Sidebar: Student Info -->
        <div class="lg:col-span-1">
            <div class="bg-white rounded-xl card-shadow p-6 text-center">
                <div class="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-500 flex items-center justify-center text-4xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <span><?php echo $user['fname'][0].'.'.$user['lname'][0] ?></span>
                </div>
                <h2 class="text-2xl font-bold text-gray-800"><?php echo $user['fname'].' '.$user['lname'] ?></h2>
                <p class="text-blue-600 font-semibold"><?php echo $class['name'] ?></p>
                <div class="space-y-2 mt-6 text-right text-sm divide-y divide-gray-100">
                    <div class="flex justify-between"><span>رقم الطالب:</span><span><?php echo $user['id'] ?></span></div>
                    <div class="flex justify-between"><span>البريد:</span><span><?php echo $user['email'] ?></span></div>
                    <div class="flex justify-between"><span>الجنس:</span><span><?php echo $user['sex'] ?></span></div>
                    <div class="flex justify-between"><span>تاريخ الازدياد:</span><span><?php echo $user['birth_date'] ?></span></div>
                    <div class="flex justify-between"><span>ولي الأمر:</span><span><?php echo $parent['fname'].' '.$parent['lname'] ?></span></div>
                    <div class="flex justify-between"><span>الهاتف:</span><span><?php echo $parent['phone'] ?></span></div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
            <!-- Navigation Tabs -->
            <div class="bg-white rounded-xl card-shadow">
                <div class="flex border-b border-gray-200">
                    <button id="marks" class="selected px-6 py-4 font-semibold">الدرجات</button>
                    <button id="attendance" class="px-6 py-4 font-semibold text-gray-600 hover:text-blue-600">الحضور</button>
                    <button id="notifaction" class="px-6 py-4 font-semibold text-gray-600 hover:text-blue-600">الإشعارات</button>
                    <button id="report" class="px-6 py-4 font-semibold text-gray-600 hover:text-blue-600">التقارير</button>
                </div>
            </div>

            <!-- Marks Section -->
            <main id="marks_section" class="bg-white rounded-xl card-shadow p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-6">الدرجات</h3>
                <div class="flex space-x-4 space-x-reverse mb-6">
                    <select id="term" class="border p-2 rounded"></select>
                    <select id="subject" class="border p-2 rounded"></select>
                    <button id="getmarks" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">عرض</button>
                    <button id="delmarks" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">مسح</button>
                </div>
            </main>

            <!-- Attendance Section -->
            <main id="attendance_section" class="bg-white rounded-xl card-shadow p-6 hidden space-y-6">
                <h3 class="text-xl font-bold text-gray-800">الحضور</h3>
                <p>عدد الغيابات: <span id="absnum">0</span></p>
                <p>عدد الأيام: <span id="absdays">0</span></p>
                <table class="w-full mt-4 border">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">المادة</th><th class="p-2">التاريخ</th></tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </main>

            <!-- Notifications Section -->
            <main id="notifactions_section" class="bg-white rounded-xl card-shadow p-6 hidden">
                <h3 class="text-xl font-bold text-gray-800 mb-6">الإشعارات</h3>
                <table class="w-full border">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">العنوان</th><th class="p-2">المحتوى</th><th class="p-2">التاريخ</th></tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </main>

            <!-- Report Section -->
            <main id="report_section" class="bg-white rounded-xl card-shadow p-6 hidden">
                <h3 class="text-xl font-bold text-gray-800 mb-6">التقارير</h3>
                <table class="w-full border">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="p-2">الفصل</th>
                            <th class="p-2">البداية</th>
                            <th class="p-2">النهاية</th>
                            <th class="p-2">المعدل</th>
                            <th class="p-2">الترتيب</th>
                            <th class="p-2">ملاحظات</th>
                            <th class="p-2">الرابط</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </main>
        </div>
    </div>

    <!-- Timetable -->
    <div class="container mx-auto px-4 mt-8">
        <div class="bg-white rounded-xl card-shadow p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-6">استعمال الزمن</h3>
            <div class="overflow-hidden rounded-lg border border-gray-200 shadow">
                <img src="<?php echo $url ?>" alt="استعمال الزمن" class="w-full h-auto">
            </div>
        </div>
    </div>

    <!-- Send Message Section -->
    <div class="container mx-auto px-4 mt-8">
        <div class="bg-white rounded-xl card-shadow p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-6">إرسال رسالة</h3>
            <form id="messageForm" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">المرسل إليه</label>
                        <select id="recipient" class="w-full p-3 border border-gray-300 rounded-lg">
                            <option value="">اختر المرسل إليه</option>
                            <option value="admin">الإدارة</option>
                            <option value="quran-teacher">أستاذ القرآن الكريم</option>
                            <option value="arabic-teacher">أستاذ اللغة العربية</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">نوع الرسالة</label>
                        <select id="messageType" class="w-full p-3 border border-gray-300 rounded-lg">
                            <option value="">اختر نوع الرسالة</option>
                            <option value="inquiry">استفسار</option>
                            <option value="complaint">شكوى</option>
                            <option value="suggestion">اقتراح</option>
                            <option value="absence">إعتذار عن غياب</option>
                            <option value="meeting">طلب موعد</option>
                            <option value="other">أخرى</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">موضوع الرسالة</label>
                    <input type="text" id="subject" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="اكتب موضوع الرسالة هنا...">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">محتوى الرسالة</label>
                    <textarea id="messageContent" rows="5" class="w-full p-3 border border-gray-300 rounded-lg resize-none" placeholder="اكتب رسالتك هنا..."></textarea>
                </div>
                <div class="flex items-center justify-between">
                    <button type="reset" class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600">مسح</button>
                    <button type="submit" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700">إرسال الرسالة</button>
                </div>
            </form>
            <div id="messageStatus" class="mt-4 hidden"></div>
        </div>
    </div>

    <script src="app.js"></script>
    <script>
        function logout() {
            if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                window.location.href = "../login/logout.php";
            }
        }

        document.getElementById("messageForm").addEventListener("submit", function(e) {
            e.preventDefault();
            const recipient = document.getElementById("recipient").value;
            const type = document.getElementById("messageType").value;
            const subject = document.getElementById("subject").value;
            const content = document.getElementById("messageContent").value;
            const statusDiv = document.getElementById("messageStatus");

            if (!recipient || !type || !subject || !content) {
                statusDiv.textContent = "⚠️ يرجى ملء جميع الحقول";
                statusDiv.className = "mt-4 p-3 bg-red-100 text-red-800 rounded transition-all duration-300";
                statusDiv.classList.remove("hidden");
                return;
            }

            statusDiv.textContent = "⏳ جاري إرسال الرسالة...";
            statusDiv.className = "mt-4 p-3 bg-blue-100 text-blue-800 rounded transition-all duration-300";
            statusDiv.classList.remove("hidden");

            setTimeout(() => {
                statusDiv.textContent = "✅ تم إرسال الرسالة بنجاح!";
                statusDiv.className = "mt-4 p-3 bg-green-100 text-green-800 rounded transition-all duration-300";
            }, 2000);
        });
    </script>
</body>
</html>
