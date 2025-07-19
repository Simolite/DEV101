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
    option.value = "All";
    list.appendChild(option);
}

async function getMarks() {
    let url;
    if (document.getElementById('subject').value == 'All'){
        url = `../api/get_marks.php?term=${document.getElementById('term').value}&sub=All`;
    }else{
        let subjectId = {'id':document.getElementById('subject').value};
        url = `../api/get_marks.php?term=${document.getElementById('term').value}&sub=${subjectId}`;
    }

    try {
        let response = await fetch(url ,{headers: {'Accept': 'application/json'}} );
        let data = await response.json();
        return data;
    } catch (error){
        console.error("Error fetching terms:", error?.message || error);
    }
}

async function populateMarks() {
    let marks = await getMarks();
    if (!marks) return ;
    const subjectNames = Object.keys(marks);
    let i = 0;
    let table = document.querySelector('tbody');
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
            table.appendChild(tr);
            i ++;
        });
        
    }


};

populateTerms();

populateSubjects();

document.querySelector("#getmarks").addEventListener('click',async()=>{
    // populateMarks();
    let subjectId = {'id':document.getElementById('subject').value};
    // url = `../api/get_marks.php?term=${document.getElementById('term').value}&sub=${subjectId}`;
    let url = `../api/get_marks.php?term=${document.getElementById('term').value}&sub=${encodeURIComponent(JSON.stringify([{ id: subjectId }]))}`;
    let response = await fetch(url);
    let text = await response.text();
    document.querySelector('td').innerHTML = text;

});

