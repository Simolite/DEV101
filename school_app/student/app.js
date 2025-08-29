async function getTerms(){
    let url = '../api/get_terms.php';
    try {
        let response = await fetch(url ,{headers: {'Accept': 'application/json'}} );
        let data = await response.json();
        return data;
    } catch (error){
        console.error("Error fetching terms:", error?.message || error);
    }
};

async function populateTerms() {
    terms = await getTerms();
    if (!terms) return;
    let list = document.getElementById('term');
    terms.forEach(term => {
        let option = document.createElement('option');
        option.innerText = term.name;
        option.value = term.id;
        list.appendChild(option);
    });
};

async function getSubjects(){
    let url = '../api/get_subjects.php';
    try{
        let response = await fetch(url, {headers: {'Accept': 'application/json'}});
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching subjects:", error?.message || error);
    }
};

async function populateSubjects() {
    let subjects = await getSubjects();
    if (!subjects) return;
    let list = document.getElementById('subject');
    subjects.forEach(subject => {
        let option = document.createElement('option');
        option.innerText = subject.name;
        option.value = subject.id;
        list.appendChild(option);
    });
    let option = document.createElement('option');
    option.innerText = "All subjects";
    option.value = "all";
    list.appendChild(option);
}

async function getMarks() {
    let term = document.getElementById('term').value;
    let subjectSelect = document.getElementById('subject');
    let subjectId = subjectSelect.value;
    let subjectName = subjectSelect.options[subjectSelect.selectedIndex].text;
    
    let subjects;
    if (subjectId === 'all') {
        subjects = 'all';
    } else {
        subjects = encodeURIComponent(JSON.stringify([{ id: subjectId, name: subjectName }]));
    }

    let url = `../api/get_marks.php?term=${term}&sub=${subjects}`;
    
    try {
        let response = await fetch(url, { headers: { 'Accept': 'application/json' } });
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching marks:", error?.message || error);
    }
}


async function populateMarks() {
    let marks = await getMarks();
    if (marks.length == 0) return ;
    const subjectNames = Object.keys(marks);
    let i = 0;
    let tbody;
    if (document.querySelector('tbody')){
        tbody = document.querySelector('tbody');
    } else {
        let table = document.createElement('table');
        tbody = document.createElement('tbody');
        let thead = document.createElement('thead');
        let th1 = document.createElement('th');
        let th2 = document.createElement('th');
        th1.innerText = 'Subject';
        th2.innerText = 'Mark';
        thead.append(th1,th2);
        table.append(thead,tbody);
        document.querySelector('.card').appendChild(table);
    }
    for (const subject in marks) {
        const subjectMarks = marks[subject];
        subjectMarks.forEach(mark => {
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let h3 = document.createElement('h3');
            td1.innerText = subjectNames[i];
            h3.innerText = mark.mark;
            td2.appendChild(h3);
            tr.append(td1,td2);
            tbody.appendChild(tr);
            i ++;
        });
        
    }


};

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

function resetMarks(){
    if(document.querySelector('table')){
        document.querySelector('table').remove();
    };
};

populateTerms();

populateSubjects();

document.querySelector("#getmarks").addEventListener('click',async()=>{
    populateMarks();
});

document.querySelector("#delmarks").addEventListener('click',()=>{
    resetMarks();
});

document.querySelector("#darkmode").addEventListener('click',()=>{
    darkmode();
});