class Player{
    constructor(code,nom,prenom,num,equipe){
        this.code=code;
        this.nom=nom;
        this.prenom=prenom;
        this.num=num;
        this.equipe=equipe;
    }
}
let players=[new Player(1,'Messi','Lio',10,'fcb'),new Player(2,'Criss','Ronaldo',7,'rm'),new Player(3,'neymar','tonik',9,'raja')];
document.querySelector('form').style.display = 'none';
document.querySelector('#add').addEventListener('click',()=>{
    document.querySelector('form').style.display = 'flex';
});
document.querySelector('#cancel').addEventListener('click',()=>{
    document.querySelector('form').style.display = 'none';
});
document.querySelector('#submit').addEventListener('click',(ev)=>{
    ev.preventDefault();
    add();
})

function isalpha(text){
    return /^[A-Za-z\s]+$/.test(text);
}

function add(){
    let code = document.querySelector('#code').value
    if (!code){
        alert('Code joueur est Obligatoire');
        return;
    }
    players.forEach((p)=>{
        if(p.code == code){
            alert('Code joueur est unique !!')
            return;
        }
    });
    let nom = document.querySelector('#nom').value;
    if (!nom){
        alert('Le nom de joueur est Obligatoire');
        return;
    };
    if (!isalpha(nom)){
        alert('Le nom de joueur est alphabetique');
        return;
    };
    let prenom = document.querySelector('#prenom').value;
    if (!prenom){
        alert('Le prenom de joueur est Obligatoire');
        return;
    };
    if (!isalpha(prenom)){
        alert('Le prenom de joueur est alphabetique');
        return;
    };
    let equipe = document.querySelector("#equipe").value;
    if(!equipe){
        alert("L'equipe de joueur est Obligatoire");
        return;       
    }
    let num = document.querySelector('#num').value
    if (!num){
        alert('Numero joueur est Obligatoire');
        return;
    }
    players.forEach((p)=>{
        if(p.num == num){
            alert('Numero joueur est unique !!')
            return;
        }
    });
    players[players.length]= new Player(code,nom,prenom,num,equipe);
    console.log(players[players.length-1]);
    loader();
}

function loader(){
    if (document.querySelector('tbody')){document.querySelector('tbody').remove()}
    let tbody = document.createElement('tbody');
    players.forEach((p)=>{
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        td1.innerText = p.code;
        td2.innerText = p.nom;
        td3.innerText = p.prenom;
        td4.innerText = p.num;
        td5.innerText = p.equipe;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tbody.appendChild(tr);
    })
    document.querySelector('table').appendChild(tbody);
    document.querySelectorAll('td').forEach((el)=>{
        el.addEventListener('click',()=>{
            siblings = Array.from(el.parentNode.children);
            siblings.forEach((cell)=>{
                cell.className = 'selected';
            })
            tobedeleted[tobedeleted.length]=siblings[0].innerText
        })
    })
};
function dell() {
    players = players.filter(obj => !tobedeleted.includes(String(obj.code)));
    tobedeleted = [];
    loader();
}
document.querySelector('#dell').addEventListener('click',dell);
let tobedeleted = [];
loader();
async function getlist(){
    let url ='https://jsonplaceholder.typicode.com/posts'
    try{
    let response = await fetch(url);
    let data = await response.json();
    let ul = document.querySelector('ul');
    ul.innerHTML = '';
    data.forEach((match)=>{
        let li = document.createElement('li');
        let p = document.createElement('p');
        p.innerText = `ID: ${match.id} / Title: ${match.title} / Body: ${match.body}`;
        li.appendChild(p);
        ul.appendChild(li);
    });}catch(error){
        console.error('Failed to fetch data:', error);
    }
}
getlist();