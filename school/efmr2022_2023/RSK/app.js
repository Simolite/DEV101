function returnMax(list){
    let max = list[0];
    list.forEache((el)=>{
        if(el > max){
            max = el;
        }
    });
    return max;
}

function charger(){
    let select = document.querySelector('select');
    let i = 0 ;
    books.forEach((book)=>{
        let option = document.createElement('option');
        option.value = i;
        option.innerText = book.titre;
        select.appendChild(option);
        i++;
    });
}

function afficher(){
    if(!document.querySelector('select').value){return};
    if(document.querySelector('ul')){document.querySelector('ul').remove()}
    let book = books[document.querySelector('select').value];
    let ul = document.createElement('ul');
    let li1 = document.createElement('li');
    let li2 = document.createElement('li');
    let li3 = document.createElement('li');
    let li4 = document.createElement('li');
    li1.innerText = `ISBN : ${book.ISBN}`;
    li2.innerText = `titre : ${book.titre}`;
    li3.innerText = `image : ${book.image}`;
    li4.innerText = `prix : ${book.prix}`;
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    document.body.appendChild(ul);
}

function ajouter(){
    if(!document.querySelector('select').value){return};
    if(document.querySelector('ul')){document.querySelector('ul').remove()}
    let book = books[document.querySelector('select').value];
    panier[panier.length] = book;
    let ul = document.createElement('ul');
    let li1 = document.createElement('li');
    let li2 = document.createElement('li');
    li1.innerText = `Nombre des livres : ${panier.length}`;
    let total = 0;
    panier.forEach((b)=>{
        total += b.prix  
    })
    li2.innerText = `Prix total : ${total}DHs`;
    ul.appendChild(li1);
    ul.appendChild(li2);
    document.body.appendChild(ul);
}

function retirer(){
    if(!document.querySelector('select').value){return};
    let book = books[document.querySelector('select').value];
    panier = panier.filter(obj => obj.ISBN != book.ISBN);
    if(document.querySelector('ul')){document.querySelector('ul').remove()}
    let ul = document.createElement('ul');
    let li1 = document.createElement('li');
    let li2 = document.createElement('li');
    li1.innerText = `Nombre des livres : ${panier.length}`;
    let total = 0;
    panier.forEach((b)=>{
        total += b.prix  
    })
    li2.innerText = `Prix total : ${total}DHs`;
    ul.appendChild(li1);
    ul.appendChild(li2);
    document.body.appendChild(ul);
}

let books = [
  { ISBN: "01234", titre: "Langage C", image: "langagec.jpg", prix: 150 },
  { ISBN: "56789", titre: "Programmation Javascript", image: "javascript.jpg", prix: 250 },
  { ISBN: "11778", titre: "Laravel", image: "laravel.jpg", prix: 200 }
];

let panier = [];

document.querySelector('#aff').addEventListener('click',afficher);

document.querySelector('#ajo').addEventListener('click',ajouter);

document.querySelector('#ret').addEventListener('click',retirer);

charger();