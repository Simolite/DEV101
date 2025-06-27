class Cars{
    constructor(immatriculation, marque, couleur, carburant, prixJour){
        this.immatriculation = immatriculation;
        this.marque = marque;
        this.couleur = couleur;
        this.carburant = carburant;
        this.prixJour = prixJour;
    }

};

let voitures = [
    new Cars('48-A-20000','Clio 3','Noir','Diesel',250),
    new Cars('48-A-20001','Clio 4','Rouge','Diesel',300),
    new Cars('48-A-20002','Dacia','Noir','Essence',200)
];

function getAllVoitures(){
    let existingTable = document.querySelector('table');
    if(existingTable){ existingTable.remove(); }

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let tr = document.createElement('tr');

    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let th3 = document.createElement('th');
    let th4 = document.createElement('th');
    let th5 = document.createElement('th');
    let th6 = document.createElement('th');

    th1.innerText = 'Immatriculation';
    th2.innerText = 'Marque';
    th3.innerText = 'Couleur';
    th4.innerText = 'Carburant';
    th5.innerText = 'Prix par jour';
    th6.innerText = 'Action';

    tr.append(th1,th2,th3,th4,th5,th6);
    thead.appendChild(tr);
    voitures.forEach((car, index)=>{
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');
        let btn = document.createElement('button');

        td1.innerText = car.immatriculation;
        td2.innerText = car.marque;
        td3.innerText = car.couleur;
        td4.innerText = car.carburant;
        td5.innerText = car.prixJour;
        btn.innerText = 'Supprimer';
        btn.addEventListener('click',()=>{deleteVoiture(index);});

        td6.appendChild(btn);
        tr.append(td1,td2,td3,td4,td5,td6);
        tbody.appendChild(tr);
    })

    table.append(thead,tbody);
    document.querySelector('#voitures').appendChild(table);
}

function deleteVoiture (index){
    voitures.splice(index, 1);
    getAllVoitures();
}

function getVoitures(){
    let marque = document.querySelector('#marque').value.trim().toLowerCase();
    if(!marque){
        alert('Veuillez entrer une marque');
        return;
    }
    getAllVoitures();
    voitures.forEach((v)=>{
        if(v.marque.toLowerCase() == marque){
            return;
        }
        document.querySelectorAll('tr').forEach((tr)=>{
            if(tr.firstChild.innerText == v.immatriculation){
                tr.remove();
            }
        })
    })
}

document.querySelector('#getAll').addEventListener('click',getAllVoitures);
document.querySelector('#filter').addEventListener('click',getVoitures);

function presente(){
    let nom = document.getElementById('nom').value;
    let prenom = document.getElementById('prenom').value;
    let email = document.getElementById('email').value;
    let com = document.getElementById('com').value;
    if(!nom||!prenom||!email||!com){
        alert('Toutes les données sont obligatoires');
        return 0;
    }
    if(!/^[a-zA-Z]+$/.test(nom) || !/^[a-zA-Z]+$/.test(prenom)){
        alert('Le Nom et Prénom ne doit contenir que les caractères (a-z ou A-Z)');
        return 0 ;
    }
    if(com.length>50){
        alert('Le commentaire ne doit pas passer 50 caractères');
        return 0;
    }
    return 1 ;
}
document.querySelector('#submit').addEventListener('click',(ev)=>{
    ev.preventDefault();
    if(!presente()){
        return;
    }
    
    if(document.querySelector('#display')){
        document.querySelector('#display').remove();
        let display = document.createElement('div');
        display.setAttribute('id','display');
    }else{
        let display = document.createElement('div');
        display.setAttribute('id','display');
    }

    let nom = document.getElementById('nom').value;
    let prenom = document.getElementById('prenom').value;
    let email = document.getElementById('email').value;
    let com = document.getElementById('com').value;

    let nomlabel = 'Nom:';
    let prenomlabel = 'Prenom:';
    let emaillabel = 'Email:';
    let comlabel = 'Commentaire:';

    
    
});