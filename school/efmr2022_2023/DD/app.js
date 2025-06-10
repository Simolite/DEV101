class Voitures{
    constructor(Immatriculation,Marque,Couleur,Carburant,Prix_Jour){
        this.Immatriculation=Immatriculation
        this.Marque=Marque
        this.Couleur=Couleur
        this.Carburant=Carburant
        this.Prix_Jour=Prix_Jour
    }
};
let voitures = [new Voitures('48-A-20000','Clio 3','Noir','Diesel',250),new Voitures('48-A-20001 ','Clio 4','Rouge','Diesel',300),new Voitures('48-A-20002 ','Dacia','Noir','Essence',200)];
function loader(){
    if(document.querySelector('section.old')){document.querySelector('section.old').remove()};
    let container = document.createElement('section');
    container.className = 'old'
    voitures.forEach((v)=>{
        let table = document.createElement('table');
        let tr = document.createElement('tr');
        let th = document.createElement('th');
        let tr1 = document.createElement('tr');
        let tr2 = document.createElement('tr');
        let tr3 = document.createElement('tr');
        let tr4 = document.createElement('tr');
        let tr5 = document.createElement('tr');
        let th1 = document.createElement('th');
        let th2 = document.createElement('th');
        let th3 = document.createElement('th');
        let th4 = document.createElement('th');
        let th5 = document.createElement('th');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        th.innerText = `Voiture ${voitures.indexOf(v)+1}`;
        th1.innerText = 'Immatriculation';
        th2.innerText = 'Marque';
        th3.innerText = 'Couleur';
        th4.innerText = 'Carburant';
        th5.innerText = 'Prix_Jour';
        td1.innerText = v.Immatriculation;
        td2.innerText = v.Marque;
        td3.innerText = v.Couleur;
        td4.innerText = v.Carburant;
        td5.innerText = v.Prix_Jour;
        tr.appendChild(th);
        tr1.appendChild(th1);
        tr1.appendChild(td1);
        tr2.appendChild(th2);
        tr2.appendChild(td2);
        tr3.appendChild(th3);
        tr3.appendChild(td3);
        tr4.appendChild(th4);
        tr4.appendChild(td4);
        tr5.appendChild(th5);
        tr5.appendChild(td5);
        table.appendChild(tr);
        table.appendChild(tr1);
        table.appendChild(tr2);
        table.appendChild(tr3);
        table.appendChild(tr4);
        table.appendChild(tr5);
        container.appendChild(table);
    });
    document.body.appendChild(container);
}

function getAllVoitures(){
    if(document.querySelector('table.new')){document.querySelector('table.new').remove()};
    let table = document.createElement('table');
    table.className='new';
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let tr = document.createElement('tr');
    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let th3 = document.createElement('th');
    let th4 = document.createElement('th');
    let th5 = document.createElement('th');
    th1.innerText = 'Immatriculation';
    th2.innerText = 'Marque';
    th3.innerText = 'Couleur';
    th4.innerText = 'Carburant';
    th5.innerText = 'Prix par jour';
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    thead.appendChild(tr);
    table.appendChild(thead);
    voitures.forEach((v)=>{
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');
        let btn = document.createElement('button');
        td1.innerText = v.Immatriculation;
        td2.innerText = v.Marque;
        td3.innerText = v.Couleur;
        td4.innerText = v.Carburant;
        td5.innerText = v.Prix_Jour;
        btn.innerText = 'Supprimer';
        btn.addEventListener('click',()=>{deleteVoiture(voitures.indexOf(v));});

        td6.appendChild(btn);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tbody.appendChild(tr);
    })
    table.appendChild(tbody);
    document.body.appendChild(table);
}

function deleteVoiture (index){
    voitures.splice(index, 1);
    getAllVoitures();
}
document.querySelector('#getAll').addEventListener('click',getAllVoitures);
document.querySelector('#loader').addEventListener('click',loader);