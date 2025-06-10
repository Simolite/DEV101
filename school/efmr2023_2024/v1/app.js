function jqueryChecking(){
    if ($('#c1').is(':checked')){
        alert('the box is checked(jQuery)');
        return true;
    }else{
        alert('the box is not checked (jQuery)');
        return false;
    };
};

function jsChecking(){
    if (document.querySelector('#c1').checked){
        alert('the box is checked (JS)');
        return true;
    }else {
        alert('the box is not checked(JS)');
        return false;
    }
}

$('#c1').click(jsChecking);
$('#c1').click(jqueryChecking);

function  checkSalaire(){
    const sal = document.getElementById('salaire').value;
    if (sal < 5000){
        alert('salaire non valid!');
        return false;
    };
    return true;
}

function EmptyInput(){
    const nom = document.getElementById('nom').value;
    const fon = document.getElementById('fonction').value;
    const img = document.getElementById('image').value;
    const sal = document.getElementById('salaire').value;
    if(!nom||!fon||!img||!sal){
        alert('enter tout les infos');
        return false;
    };
    return true;
}


function add(){
    if(!EmptyInput()||!checkSalaire()){
        return false;
    }
    const nom = document.getElementById('nom').value;
    const fon = document.getElementById('fonction').value;
    const userImg = document.getElementById('image');
    const sal = document.getElementById('salaire').value;
    let tbody = document.querySelector('tbody');
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let img = document.createElement('img');
    td1.innerText = nom;
    td2.innerText = fon;
    td3.innerText = sal;
    const file = userImg.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    td4.appendChild(img);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tbody.appendChild(tr);
    [td1,td2,td3,td4].forEach((e)=>{
    e.addEventListener('click',()=>{
        
        siblings = Array.from(e.parentNode.children);
        siblings.forEach((el)=>{
            if(el.className=='selected'){el.className = '';return}
            el.className = 'selected';
        })
    })
});
    
}

function remove(){
    document.querySelectorAll('.selected').forEach((e)=>{
        e.parentElement.remove();
    })
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    add();
  });

document.querySelectorAll('td').forEach((e)=>{
    e.addEventListener('click',()=>{
        
        siblings = Array.from(e.parentNode.children);
        siblings.forEach((el)=>{
            if(el.className=='selected'){el.className = '';return}
            el.className = 'selected';
        })
    })
});

document.querySelector('form').addEventListener('reset', function(event) {
    event.preventDefault();
    remove();
  });