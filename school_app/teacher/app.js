function darkmode() {
    const body = document.body;
    const icon = document.querySelector('#toggel i');
    const toggel = document.getElementById('toggel');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-moon fa-lg';
        toggel.style.transform = "translateX(1.9vw)";
        body.style.color = "#fff";
    } else {
        icon.className = 'fas fa-sun fa-lg';
        toggel.style.transform = "translateX(0vw)";
        body.style.color = "#000";
    }
}


document.querySelector("#darkmode").addEventListener('click',()=>{
    darkmode();
});



async function getClasses(dest) {

    let url = `../api/getTeacherClasses.php`;
    let data;
    
    try {
        let response = await fetch(url, { headers: { 'Accept': 'application/json' } });
        data = await response.json();
    } catch (error) {
        console.error("Error fetching classes:", error?.message || error);
    }
    data.forEach(Tclass => {
        let option = document.createElement('option');
        option.value = Tclass.id;
        option.innerText = Tclass.name;
        document.querySelector("#"+dest).appendChild(option);
    });

}

async function getSubjets(dest) {

    let url = `../api/getTeacherSubjets.php`;
    let data;
    
    try {
        let response = await fetch(url, { headers: { 'Accept': 'application/json' } });
        data = await response.json();
    } catch (error) {
        console.error("Error fetching subjects:", error?.message || error);
    }
    data.forEach(sub => {
        let option = document.createElement('option');
        option.value = sub.id;
        option.innerText = sub.name;
        document.querySelector("#"+dest).appendChild(option);
    });

    
}

async function getStudents(dest) {

    let class_id = document.querySelector('#'+dest).value;

    let url = `../api/getClassStudents.php?class_id=${class_id}`;
    let data;
    
    try {
        let response = await fetch(url, { headers: { 'Accept': 'application/json' } });
        data = await response.json();
    } catch (error) {
        console.error("Error fetching students:", error?.message || error);
    }
    if(dest == 'Attclass'){
        return data;
    }
    data.forEach(student => {
        let option = document.createElement('option');
        option.value = student.id;
        option.innerText = `${student.fname} ${student.lname}`;
        document.querySelector("#student").appendChild(option);
    });    
}

async function getTerms(){
    let url = '../api/get_terms.php';
    let data;
    try {
        let response = await fetch(url ,{headers: {'Accept': 'application/json'}} );
        data = await response.json();
    } catch (error){
        console.error("Error fetching terms:", error?.message || error);
    }
    data.forEach(term => {
        let option = document.createElement('option');
        option.value = term.id;
        option.innerText = term.name;
        document.querySelector("#term").appendChild(option);
    });
};

getClasses('Markclass');
getClasses('Attclass');


document.querySelector("#Markclass").addEventListener('change',()=>{
    let lists = document.getElementById('Markinput');
    Array.from(lists.children).forEach(list => {
        if(list.id != 'Markclass'){
            Array.from(list.children).forEach(option => {
                if (option.value != "0") {
                    option.remove();
                }
            });
        }

    })
    getSubjets("Marksubject");
    getStudents("Markclass");
    getTerms();
});


document.querySelector("#Attclass").addEventListener('change',()=>{
    let lists = document.getElementById('Attinput');
    Array.from(lists.children).forEach(list => {
        if(list.id != 'Attclass'){
            Array.from(list.children).forEach(option => {
                if (option.value != "0") {
                    option.remove();
                }
            });
        }

    })
    getSubjets("Attsub");
});

async function attendanceList(){
    let students = await getStudents("Attclass");
    if(document.querySelector("#attendance_section tbody")){
        document.querySelector("#attendance_section tbody").remove();
    }
    let tbody = document.createElement("tbody");
    students.forEach(student=>{
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let chkbx = document.createElement("input");
        chkbx.type = "checkbox";
        td1.innerText = student.fname + " " +student.lname;
        chkbx.value = student.id;
        chkbx.classList.add('studentBox');
        td2.appendChild(chkbx);
        tr.append(td1,td2);
        tbody.appendChild(tr);

    })
    document.querySelector("#attendance_section table").appendChild(tbody);
}

document.getElementById('getAttList').addEventListener('click',()=>{
    attendanceList();
});

function addMark() {
    let student_id = document.querySelector("#student").value;
    let subject_id = document.querySelector("#Marksubject").value;
    let mark = document.querySelector("#mark").value;
    let term = document.querySelector("#term").value;
    let date = document.querySelector("#Markdate").value;

    let body = `student_id=${encodeURIComponent(student_id)}&` +
               `subject_id=${encodeURIComponent(subject_id)}&` +
               `mark=${encodeURIComponent(mark)}&` +
               `term=${encodeURIComponent(term)}&` +
               `date=${encodeURIComponent(date)}`;

    fetch('../api/addMark.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        if (data.error) {
            alert("Error: " + data.error);
        } else {
            alert("Mark added successfully!");
        }
    })
    .catch(err => console.error("Fetch error:", err));
}


document.querySelector('#Marksubmit').addEventListener('click', () => {
    addMark();
});


function toggleSection(activeBtn,showId){
    document.querySelector('.selected').classList.remove("selected");
    document.getElementById(activeBtn).classList.add("selected");
    let mains = document.querySelectorAll("main");
    let mainsArray = Array.from(mains);
    mainsArray.forEach(elem =>{
        elem.classList.add('hidden');
    });
    document.getElementById(showId).classList.remove('hidden');
}

document.querySelector("#marks").addEventListener('click',()=>{
    toggleSection('marks','marks_section');
});

document.querySelector("#notifaction").addEventListener('click',()=>{
    toggleSection('notifaction','notifactions_section');
});



let userInfo;

async function getUserInfo() {
    let url = `../api/getUserInfo.php`;
    
    try {
        let response = await fetch(url, { headers: { 'Accept': 'application/json' } });
        userInfo = await response.json();
        return userInfo;     
    } catch (error) {
        console.error("Error fetching Info:", error?.message || error);
    }
}

async function getAnnouncements(){
    await getUserInfo();
    let url = `../api/getAnnouncements.php?audience=all`;
    let data;
    try {
        let response = await fetch(url, { headers: { 'Accept': 'application/json' } });
        data = await response.json();
    } catch (error) {
        console.error("Error fetching Announcements:", error?.message || error);
    };
    let tbody = document.querySelector("#notifactions_section tbody");
    data.forEach(announ =>{
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        td1.innerText = announ.title;
        td2.innerText = announ.body;
        td3.innerText = announ.created_at;
        tr.append(td1,td2,td3);
        tbody.appendChild(tr);
    }) 
}

getAnnouncements();

function toggleSection(activeBtn,showId){
    document.querySelector('.selected').classList.remove("selected");
    document.getElementById(activeBtn).classList.add("selected");
    let mains = document.querySelectorAll("main");
    let mainsArray = Array.from(mains);
    mainsArray.forEach(elem =>{
        elem.classList.add('hidden');
    });
    document.getElementById(showId).classList.remove('hidden');
}

document.querySelector("#marks").addEventListener('click',()=>{
    toggleSection('marks','marks_section');
});

document.querySelector("#notifaction").addEventListener('click',()=>{
    toggleSection('notifaction','notifactions_section');
});
document.querySelector("#attendance").addEventListener('click',()=>{
    toggleSection('attendance','attendance_section');
});
document.querySelector("#time").addEventListener('click',()=>{
    toggleSection('time','time_section');
});



function addAtt(){
    let Students = document.querySelectorAll('.studentBox');
    let absentIds = Array.from(Students).filter(cb => cb.checked).map(cb => cb.value);
    let presentIds = Array.from(Students).filter(cb => !cb.checked).map(cb => cb.value);
    let subjectId = document.querySelector("#Attsub").value;
    let date = document.querySelector("#Attdate").value;

    absentIds.forEach(absent=>{
        let body = `student_id=${encodeURIComponent(absent)}&` +
                `subject_id=${encodeURIComponent(subjectId)}&` +
                `date=${encodeURIComponent(date)}&` +
                `stat=absent`;

        fetch('../api/addAtt.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error: " + data.error);
            }
        })
        .catch(err => console.error("Fetch error:", err));   
    });

    presentIds.forEach(present=>{
        let body = `student_id=${encodeURIComponent(present)}&` +
                `subject_id=${encodeURIComponent(subjectId)}&` +
                `date=${encodeURIComponent(date)}&` +
                `stat=present`;

        fetch('../api/addAtt.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        })
        .then(response => response.json())
        .then(data => { 
            if (data.error) {
                console.error("Error: " + data.error);
            }
        })
        .catch(err => console.error("Fetch error:", err));   
    });
}


document.querySelector("#submitAtt").addEventListener('click',()=>{
    addAtt();
});
