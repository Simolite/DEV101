class Produit{
    constructor(code,titre,description,prix,categorie){
        this.code = code;
        this.titre = titre;
        this.description = description;
        this.prix = prix;
        this.categorie = categorie;
    }
}

let produits = [new Produit(1,"ArganOil","huil d'argan",199,"Sante"),new Produit(2,"Nike Zoom","chaussure pour homme",599,"Sport"),new Produit(3,"MyFlocons","Flocons d'avoine 500g",23,"Alimentation")];

function display(param){
    let form = document.querySelector('form');
    if(!param){
        form.style.display='none';
        return ;
    }
    form.style.display='flex';
}

function add(){
    let code = document.querySelector('#code').value;
    produits.forEach((p)=>{
        if(p.code == code){
            alert('le code de produit est unique');
            return;
        }
    });
    let titre = document.getElementById('titre').value.trim();
    if (!/^[A-Za-z\s]+$/.test(titre)){
        alert('le titre de produit est alphabetique');
        return;
    }
    let description = document.getElementById('description').value;
    let prix = document.getElementById('prix').value;
    produits.forEach((p)=>{
        if(p.prix == prix){
            alert('le prix de produit est unique');
            return;
        }
    let categorie = document.getElementById('categorie').value;
    });
    produits[produits.length]= new Produit(code,titre,description,prix,categorie);
    load();
}

function load(){
    document.querySelector('tbody').remove();
    let tbody = document.createElement('tbody');
    tbody.innerHTML = '';
    produits.forEach((p)=>{
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        td1.innerText = p.code;
        td2.innerText = p.titre;
        td3.innerText = p.description;
        td4.innerText = p.prix;
        td5.innerText = p.categorie;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tbody.appendChild(tr);
    });
    document.querySelector('table').appendChild(tbody);
    document.querySelectorAll('td').forEach((td)=>{
        td.addEventListener('click',()=>{
            siblings = Array.from(td.parentNode.children);
            siblings.forEach((sib)=>{
                if(sib.className == 'selected'){sib.className = '';return}
                sib.className = 'selected';
            })

        })
    })
}

function dell(){
    document.querySelectorAll('.selected').forEach((el)=>{
        el.remove();
    })
}

async function getlist(){
    let respond = await fetch(url);
    let data = await respond.json();
    data.forEach((el)=>{
        let li = createElement('li');
        li.innerText = el.titre
        document.querySelector('ul').appendChild(li);
    })
}

document.querySelector("#submit").addEventListener('click',(ev)=>{
    ev.preventDefault();
    add();
});

document.querySelector("#annuler").addEventListener('click',(ev)=>{
    ev.preventDefault();
    display();
});

document.querySelector('#dell').addEventListener('click',(ev)=>{
    ev.preventDefault();
    dell();
})

document.querySelector('form').style.display = 'none';

let url = 'https://api.com';
load();
getlist();