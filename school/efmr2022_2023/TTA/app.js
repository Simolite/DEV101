class Student{
    constructor(num,name,tele,course,m102,m103,m105,m107){
        let avg = ((m102*2) + (m103*2) + (m105*3) + (m107*3))/10;
        let state;
        if(avg>= 10){
            state='Admis';
        }else{
            state='Ajourne';
        };
        this.avg = avg;
        this.state = state;
        this.num = num;
        this.name = name;
        this.tele = tele||"None";
        this.course = course;
        this.m102 = m102||0;
        this.m103 = m103||0;
        this.m105 = m105||0;
        this.m107 = m107||0;
    }
}
let students = [];
function add(){
    let num = document.querySelector('#num').value.trim();
    let name = document.querySelector('#nom').value.trim();
    let tele = document.querySelector('#tele').value;
    if(!num||!name){
        alert(`Les champs "Numéro d'inscription" et "Nom complet" sont obligatoires à remplir`);
        return false;
    };
    if (num.length != 7||!num.startsWith("Stg")){
        alert(`Le numéro d'inscription doit commencer par "Stg" suivi de 4 chiffres (par exemple : Stg2123)`);
        return false;
    };
    if (tele && tele.length!=10) {
        alert("Le téléphone doit comporter 10 chiffres.")
        return false;
    }
    let course = document.getElementById('filiere').value;
    let m102 = document.getElementById('m102').value;
    let m103 = document.getElementById('m103').value;
    let m105 = document.getElementById('m105').value;
    let m107 = document.getElementById('m107').value;
    students[students.length] = new Student(num,name,tele,course,m102,m103,m105,m107);
    let tbody = document.querySelector('table#out tbody');
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    td1.innerText = students[students.length - 1].num;
    td2.innerText = students[students.length - 1].name;
    td3.innerText = students[students.length - 1].tele;
    td4.innerText = students[students.length - 1].course;
    td5.innerText = students[students.length - 1].avg;
    td6.innerText = students[students.length - 1].state;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tbody.appendChild(tr);
    document.querySelector('p').innerText = `Nombre de stagiaires :${students.length+2}`;
    tbody.scrollIntoView({ behavior: "smooth" });
    return true;
}
document.getElementById('add').addEventListener('click',add);

function admis(){
    let num = 1;
    students.forEach((s)=>{
        if(s.avg >= 10){num ++}
    })
    document.querySelector('p').innerText = `Nombre de stagiaires admis et :${num}`;
}

function noadmis(){
    let num = 1;
    students.forEach((s)=>{
        if(s.avg < 10){num ++}
    })
    document.querySelector('p').innerText = `Nombre de stagiaires no admis et :${num}`;
}

document.querySelector('#admis').addEventListener('click',admis);
document.querySelector('#noadmis').addEventListener('click',noadmis);

document.querySelector('p').innerText = `Nombre de stagiaires :${students.length+2}`;