const darkParticlesConfig = {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
    },
    opacity: { value: 0.5, random: false },
    size: { value: 5, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: { enable: true, speed: 6, direction: "none", out_mode: "out" },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
};

const lightParticlesConfig = JSON.parse(JSON.stringify(darkParticlesConfig));
lightParticlesConfig.particles.color.value = "#000000";
lightParticlesConfig.particles.line_linked.color = "#000000";

particlesJS("particles-js", darkParticlesConfig);

const toggleBtn = document.getElementById("toggle");
const heroHeading = document.querySelector("h1");
let isDark = true;
let movedLeft = true;

function destroyParticles() {
  if (window.pJSDom && window.pJSDom.length > 0) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window.pJSDom = [];
  }
}

toggleBtn.addEventListener("click", () => {
  if (isDark) {
    toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    document.body.style.backgroundColor = "#fff";
    heroHeading.style.color = "#000";
    document.getElementById('fp').style.color = "#000";
    document.querySelector('#toggle i').style.color = '#000';
    document.querySelector('#toggle i').style.backgroundColor = '#fff';
    updateHoverStyle('#000');

    destroyParticles();
    particlesJS("particles-js", lightParticlesConfig);
  } else {
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.style.backgroundColor = "#000";
    heroHeading.style.color = "#fff";
    document.getElementById('fp').style.color = "#fff";
    document.querySelector('#toggle i').style.color = '#fff';
    document.querySelector('#toggle i').style.backgroundColor = '#000';
    updateHoverStyle('#fff');

    destroyParticles();
    particlesJS("particles-js", darkParticlesConfig);
  }
    if (movedLeft) {
    toggleBtn.classList.remove('move-left');
    toggleBtn.classList.add('move-right');
  } else {
    toggleBtn.classList.remove('move-right');
    toggleBtn.classList.add('move-left');
  }
  movedLeft = !movedLeft;
  isDark = !isDark;
});


function updateHoverStyle(color) {
  const styleTag = document.getElementById('dynamic-hover-style') || document.createElement('style');
  styleTag.id = 'dynamic-hover-style';
  styleTag.innerHTML = `
    button:hover {
      box-shadow: 0 0 1vw ${color};
    }
  `;
  if (!document.getElementById('dynamic-hover-style')) {
   document.head.appendChild(styleTag);
  }

}

let projects = [];

class Project {
  constructor(name,url,info="simple info ."){
    this.name = name;
    this.url = url;
    this.info = info;
  }
}





let calculator = new Project("Calculator","calculator","A functional simple calculator .Helped me connect HTML, CSS, and JavaScript together in a functional way.");
let amazon = new Project("Amazon","Amazon%20project","A clone of the Amazon website that helped me dive deeper into the DOM and JavaScript logic, using new concepts like OOP and asynchronous programming.");
let joke = new Project("Random Jokes","joke","Simple web app for getting random jokes .My introduction to using APIs and working with external data.");
let form = new Project("Simple form","simple_form"," A basic form project that taught me how HTML inputs and CSS styling work together.");
let movies = new Project("Movie Search","movies","Simple web app for getting info about movies .Improved my understanding of APIs and dynamic content rendering.");
let PG = new Project("Phone Gadjet","Phone%20gadget","My first website built for a real client a fully functional landing page.");
let rps = new Project("RPS","RPS%20project","Rock Paper Scissors game .Helped me understand JavaScript logic through game development.");
let weatherBeta = new Project("Weather app","weather-beta","Real time weather app .Took a deeper dive into APIs, callbacks, and promises.");
let youtube = new Project("Youtube","youtube%20project","Youtube clone .Strengthened my CSS skills while recreating a familiar UI layout.");
let todo = new Project("Todo App","todo%20project","A simple to-do list app that helped me practice DOM manipulation and event handling.")


projects.push(form,rps,todo,youtube,calculator,amazon,joke,movies,weatherBeta,PG);


projects.forEach((element)=>{
  let main = document.querySelector('main');
  let btn = document.createElement('button');
  let ankor = document.createElement('a');
  let img = document.createElement('img');
  let info = document.createElement('p');
  ankor.href = element.url;
  ankor.innerText = element.name;
  img.src= element.url+"/index.png";
  info.innerText = element.info;
  btn.className='project';
  btn.appendChild(ankor);
  btn.appendChild(img);
  btn.appendChild(info);
  main.appendChild(btn);
});


let tech = [];

class Technologies {
  constructor(name,icon){
    this.name = name;
    this.icon = icon;
  }
}

let html5 = new Technologies("HTML5",`fab fa-html5`);
let css3 = new Technologies("CSS3",`fab fa-css3-alt`);
let bootstrap = new Technologies("Bootstrap",`fab fa-bootstrap`);
let js = new Technologies("JavaScript",`fab fa-js-square`);
let react = new Technologies("React.js",`fab fa-react`);
let nodeJS = new Technologies("Node.js",`fab fa-node-js`);
let php = new Technologies("PHP",`fab fa-php`);
let python = new Technologies("Python",`fab fa-python`);
let sql = new Technologies("SQL",`fas fa-database`);

tech.push(html5,css3,bootstrap,js,react,nodeJS,php,python,sql);
let skills = document.querySelector('#skills');
tech.forEach((element)=>{
  let skill = document.createElement('button');
  let icon = document.createElement('i');
  let text = document.createElement('p');
  text.innerText = element.name;
  icon.className = element.icon+" fa-xl";
  skill.className = "skill";
  skill.appendChild(text);
  skill.appendChild(icon);
  skills.appendChild(skill);
});

let sw = window.innerWidth;
const buttons = skills.children;
const totalButtons = buttons.length;
const buttonsToShow = 3;
const buttonWidth = buttons[0].offsetWidth + 1;
let currentIndex = 0;



function slide() {
  currentIndex += buttonsToShow;
  if (currentIndex >= totalButtons) {
    currentIndex = 0;
  }
  skills.style.transform = `translateX(-${currentIndex * buttonWidth}px)`;
}


if (sw>768){
  skills.style.width = buttonWidth * totalButtons + "px";
  setInterval(slide, 3000);
};