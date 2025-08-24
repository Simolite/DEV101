function darkmode(){
    let icon = document.querySelector('#toggel i');
    let toggel = document.getElementById('toggel');
    if(icon.className == 'fas fa-sun fa-lg'){
        icon.className = 'fas fa-moon fa-lg';
        document.body.style.background = '#222';
        toggel.style.transform = "translateX(1.9vw)";
        document.body.style.color = "#fff";
        document.querySelector('i').style.color = "#fff";
        document.getElementById("toggel").style.background = "#000";
    }else {
        icon.className = 'fas fa-sun fa-lg';
        document.body.style.background = '#fff';
        toggel.style.transform = "translateX(0vw)";
        document.body.style.color = "#000";
        document.querySelector('i').style.color = "#000";
        document.getElementById("toggel").style.background = "#fff";
    }
};

document.querySelector("#darkmode").addEventListener('click',()=>{
    darkmode();
});