let screen = document.querySelector('.screen p');
const btn = document.querySelector('button');
const url = 'https://icanhazdadjoke.com/';
btn.addEventListener('click',getjoke);

async function getjoke() {
    try {
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json'
          }
        });

        const data = await response.json();
        screen.innerText = data.joke;
      } catch (error) {
        screen.innerText = 'Failed to load joke. Try again.';
        console.error(error);
      }
}