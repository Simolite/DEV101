function darkmode() {
    const body = document.body;
    const icon = document.querySelector('#toggel i');
    const toggel = document.getElementById('toggel');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-moon fa-lg';
        toggel.style.transform = "translateX(1.9vw)";
        body.style.color = "#fff";
    } else {
        icon.className = 'fas fa-sun fa-lg';
        toggel.style.transform = "translateX(0vw)";
        body.style.color = "#000";
    }
}


document.querySelector("#darkmode").addEventListener('click',()=>{
    darkmode();
});

async function getUserInfo() {
    let url = `../api/getUserInfo.php`;
    
    try {
        let response = await fetch(url, { headers: { 'Accept': 'application/json' } });
        userInfo = await response.json();
        return userInfo;     
    } catch (error) {
        console.error("Error fetching Info:", error?.message || error);
    }
}

async function getAnnouncements(){
    await getUserInfo();
    let url = `../api/getAnnouncements.php?audience=all`;
    let data;
    try {
        let response = await fetch(url, { headers: { 'Accept': 'application/json' } });
        data = await response.json();
    } catch (error) {
        console.error("Error fetching Announcements:", error?.message || error);
    };
    let tbody = document.querySelector("#notifaction_section tbody");
    data.forEach(announ =>{
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        td1.innerText = announ.title;
        td2.innerText = announ.body;
        td3.innerText = announ.created_at;
        tr.append(td1,td2,td3);
        tbody.appendChild(tr);
    }) 
}

getAnnouncements();

function toggleSection(id){
    document.querySelector('.selected').classList.remove("selected");
    document.getElementById(id).classList.add("selected");
    let mains = document.querySelectorAll("main");
    let mainsArray = Array.from(mains);
    mainsArray.forEach(elem =>{
        elem.classList.add('hidden');
    });
    document.getElementById(id+"_section").classList.remove('hidden');
}

document.querySelector("#notifaction").addEventListener('click',()=>{
    toggleSection('notifaction');
});

document.querySelector("#account").addEventListener('click',()=>{
    toggleSection('account');
});

document.querySelector("#announcement").addEventListener('click',()=>{
    toggleSection('announcement');
});

document.querySelector("#attendance").addEventListener('click',()=>{
    toggleSection('attendance');
});

document.querySelector("#class").addEventListener('click',()=>{
    toggleSection('class');
});

document.querySelector("#mark").addEventListener('click',()=>{
    toggleSection('mark');
});

document.querySelector("#student").addEventListener('click',()=>{
    toggleSection('student');
});

document.querySelector("#teacher").addEventListener('click',()=>{
    toggleSection('teacher');
});

document.querySelector("#term").addEventListener('click',()=>{
    toggleSection('term');
});


async function getAccounts(){
    let role = document.querySelector("#accRole").value;    
    let accounts;
    let url = `../api/getAccount.php?role=${encodeURIComponent(role)}`;
    try {
        let response = await fetch(url, { headers: { 'Accept': 'application/json' } });       
        accounts = await response.json();
    } catch (error) {
        console.error("Error fetching Account:", error?.message || error);
    }
    let list = document.querySelector("select#account");
    accounts.forEach(account=>{
        let option = document.createElement("option");
        option.innerText = account.username;
        list.append(option);
    })
}

document.querySelector("#accRole").addEventListener("change",()=>{
    getAccounts();
});