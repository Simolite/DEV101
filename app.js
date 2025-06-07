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

class Project {
  constructor(name,url){
    this.name = name;
    this.url = url;
  }
}
let dn = "https://arrachmohammed.dev/"
dn='';
let projects = [];
let calculator = new Project("Calculator",dn+"calculator");
let amazon = new Project("Amazon",dn+"Amazon%20project/amazon.html");
let joke = new Project("Random Joke",dn+"joke");
let movies = new Project("Movie info",dn+"movies");
let PG = new Project("Phone Gadjet",dn+"Phone%20gadget");
let rps = new Project("RPS",dn+"RPS%20project");
let weatherBeta = new Project("Weather app",dn+"weather-beta");
let youtube = new Project("Youtube",dn+"youtube%20project");
projects.push(calculator,amazon,joke,movies,PG,rps,weatherBeta,youtube);
projects.forEach((element)=>{
  let main = document.querySelector('main');
  let btn = document.createElement('button');
  let ankor = document.createElement('a');
  let info = document.createElement('p');
  // info.innerText = "this info about the website";
  ankor.href = element.url;
  ankor.innerText = element.name;
  ankor.appendChild(info);
  btn.appendChild(ankor);
  main.appendChild(btn);
});
