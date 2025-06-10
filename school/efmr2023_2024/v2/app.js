function changerSrcjQuery(){
    $('#im1').attr('src','second.jpg');
};
$('#im1').click(changerSrcjQuery);
function changerSrcJS(){
    let img = document.getElementById('im1');
    img.src = "second.jpg";
};
let img = document.getElementById('im1');
img.addEventListener('click',changerSrcJS);


function checkAge(){
    let age = document.getElementById('age').value;
    if(age <= 6 || age >=16){
        alert ('age non valid !! 6 <= age <= 16 ');
        return true;
    };
    return false;
};

function EmptyInput(){
    let nom = document.getElementById('age').value;
    let prenom = document.getElementById('prenom').value;
    let age = document.getElementById('age').value;
    let photo = document.getElementById('image').value;
    if(!nom||!prenom||!age||!photo){
        alert('all the input is required');
        return true;
    }
    return false;
};

function add(){
    if(EmptyInput()||checkAge()){return}
    let nom = document.getElementById('nom').value;
    let prenom = document.getElementById('prenom').value;
    let age = document.getElementById('age').value;
    let photo = document.getElementById('image');
    let tbody = document.querySelector('tbody');
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let img = document.createElement('img');
    let file = photo.files[0];
    let reader = new FileReader();
    reader.onload = function(e) {
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    td1.innerText = nom;
    td2.innerText = prenom;
    td3.innerText = age;
    td4.appendChild(img);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tbody.appendChild(tr);
    [td1,td2,td3,td4].forEach((e)=>{
        e.addEventListener('click',()=>{
            if(e.className=='selected'){e.className ='';return}
            e.className ='selected';
        })
    });
};

document.querySelectorAll('td').forEach((e)=>{

    e.addEventListener('click',()=>{
        let siblings = Array.from(e.parentNode.children);
        siblings.forEach((el)=>{
            if(el.className=='selected'){el.className ='';return}
            el.className ='selected';
        })
    });
});

function remove(){
    document.querySelectorAll('.selected').forEach((e)=>{
        e.remove();
    })
};

document.getElementById('submit').addEventListener('click',(ev)=>{
    ev.preventDefault();
    add();
});
document.getElementById('reset').addEventListener('click',(ev)=>{
    ev.preventDefault();
    remove();
});