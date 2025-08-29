function darkmode(){
    let icon = document.querySelector('#toggel i');
    let toggel = document.getElementById('toggel');
    if(icon.className == 'fas fa-sun fa-lg'){
        icon.className = 'fas fa-moon fa-lg';
        document.body.style.background = '#222';
        toggel.style.transform = "translateX(1.9vw)";
        document.body.style.color = "#fff";
        document.querySelector('i').style.color = "#fff";
        document.getElementById("toggel").style.background = "#000";
    }else {
        icon.className = 'fas fa-sun fa-lg';
        document.body.style.background = '#fff';
        toggel.style.transform = "translateX(0vw)";
        document.body.style.color = "#000";
        document.querySelector('i').style.color = "#000";
        document.getElementById("toggel").style.background = "#fff";
    }
};

document.querySelector("#darkmode").addEventListener('click',()=>{
    darkmode();
});



async function getClasses() {

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
        document.querySelector("#class").appendChild(option);
    });

}

async function getSubjets() {

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
        document.querySelector("#subject").appendChild(option);
    });

    
}

async function getStudents() {

    let class_id = document.querySelector('#class').value;

    let url = `../api/getClassStudents.php?class_id=${class_id}`;
    let data;
    
    try {
        let response = await fetch(url, { headers: { 'Accept': 'application/json' } });
        data = await response.json();
    } catch (error) {
        console.error("Error fetching students:", error?.message || error);
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

getClasses();


document.querySelector("#class").addEventListener('change',()=>{
    let lists = document.getElementById('input');
    Array.from(lists.children).forEach(list => {
        if(list.id != 'class'){
            Array.from(list.children).forEach(option => {
                if (option.value != "0") {
                    option.remove();
                }
            });
        }

    })
    getSubjets();
    getStudents();
    getTerms();
});

function addMark() {
    let student_id = document.querySelector("#student").value;
    let subject_id = document.querySelector("#subject").value;
    let mark = document.querySelector("#mark").value;
    let term = document.querySelector("#term").value;
    let date = document.querySelector("#date").value;

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


document.querySelector('#submit').addEventListener('click', () => {
    addMark();
});
